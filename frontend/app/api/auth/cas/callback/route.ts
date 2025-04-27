// app/api/auth/cas/callback/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import crypto from 'crypto';
import { getSupabaseAdminServerClient } from '@/database/server';
import { fetchYaliesInfoByNetId, YaliesRecord } from './yalies';
import { Database } from '@/types/supabase_newer';
import { SupabaseClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

async function validateCasTicket(ticket: string, serviceUrl: string): Promise<{ netID: string } | null> {
  const validateUrl = `https://secure.its.yale.edu/cas/serviceValidate?ticket=${ticket}&service=${encodeURIComponent(serviceUrl)}`;
  const response = await axios.get(validateUrl);
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  const result = parser.parse(response.data);
  const authSuccess = result?.['cas:serviceResponse']?.['cas:authenticationSuccess'];
  const netID = authSuccess?.['cas:user'];
  return netID ? { netID } : null;
}

async function checkExistingUser(adminClient: SupabaseClient<Database>, netID: string) {
  const { data: existingUser, error } = await adminClient
    .from('users')
    .select('id, net_id')
    .eq('net_id', netID)
    .single();
  return { existingUser, error };
}

async function handleExistingUser(adminClient: SupabaseClient<Database>, user: { id: string; net_id: string }, netID: string, password: string, email: string) {
  const { data: authData } = await adminClient.auth.admin.getUserById(user.id);
  if (authData?.user) {
    const { error } = await adminClient.auth.admin.updateUserById(user.id, { password });
    return { userId: user.id, error };
  } else {
    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { netid: netID },
      app_metadata: { provider: 'cas' },
    });
    return { userId: data?.user?.id || null, error };
  }
}

async function createNewUser(adminClient: SupabaseClient<Database>, netID: string, password: string, yalies: YaliesRecord) {
  const { data, error: createError } = await adminClient.auth.admin.createUser({
    email: yalies.email,
    password,
    email_confirm: true,
    user_metadata: { netid: netID },
    app_metadata: { provider: 'cas' }
  });
  if (createError) return { userId: null, error: createError };

  const userId = data.user.id;
  const name = yalies.first_name + (yalies.major ? ` - ${yalies.major}` : '');

  const { error: insertError } = await adminClient.from('users').insert({
    id: userId,
    net_id: netID,
    name: name || null
  });
  if (insertError) return { userId, error: insertError };

  const gradYear = parseInt(yalies.year);
  const terms = (y: number) => [`${y}03`, `${y + 1}01`];
  const arrangement = {
    first_year: ['0', ...terms(gradYear - 4)],
    sophomore: ['0', ...terms(gradYear - 3)],
    junior: ['0', ...terms(gradYear - 2)],
    senior: ['0', ...terms(gradYear - 1)]
  };

  const fypInserts = ['#1', '#2', '#3'].map(name => ({
    user_id: userId,
    name,
    language_placement: null,
    term_arrangement: JSON.stringify(arrangement)
  }));

  const { error: fypError } = await adminClient.from('fyp').insert(fypInserts);
  return { userId, error: fypError };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ticket = url.searchParams.get('ticket');

  if (!ticket) return NextResponse.redirect(new URL('/login?error=No+Ticket+Provided', request.url));

  try {
    const serviceUrl = `${url.origin}/api/auth/cas/callback`;
    const validated = await validateCasTicket(ticket, serviceUrl);
    if (!validated) return NextResponse.redirect(new URL('/login?error=CAS+Authentication+Failed', request.url));

    const netID = validated.netID;
    const adminClient = await getSupabaseAdminServerClient();
    const yaliesInfo = await fetchYaliesInfoByNetId(netID);

    if (!yaliesInfo?.email) {
      console.error('Yalies lookup failed:', yaliesInfo);
      return NextResponse.redirect(new URL('/login?error=Yalies+API+Error', request.url));
    }

    const email = yaliesInfo.email;
    const { existingUser, error: lookupError } = await checkExistingUser(adminClient, netID);

    if (lookupError && lookupError.code !== 'PGRST116') {
      console.error('User lookup error:', lookupError);
      return NextResponse.redirect(new URL('/login?error=Database+Error', request.url));
    }

    const password = crypto.randomBytes(16).toString('hex');
    const result = existingUser
      ? await handleExistingUser(adminClient, existingUser, netID, password, email)
      : await createNewUser(adminClient, netID, password, yaliesInfo);

    if (result.error) {
      console.error('User provisioning error:', result.error);
      return NextResponse.redirect(new URL('/login?error=User+Provisioning+Failed', request.url));
    }

    const redirectUrl = new URL('/auth', url.origin);
    redirectUrl.searchParams.set('email', email);
    redirectUrl.searchParams.set('password', password);
    redirectUrl.searchParams.set('redirectTo', '/courses');

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('Unhandled CAS callback error:', err);
    return NextResponse.redirect(new URL('/login?error=Authentication+Failed', request.url));
  }
}