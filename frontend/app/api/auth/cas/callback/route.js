// callback/route.js

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import crypto from 'crypto';

export const dynamic = 'force-dynamic'; // Ensure the route is always dynamic

export async function GET(request) 
{
  const url = new URL(request.url);
  const ticket = url.searchParams.get('ticket');
  
  if (!ticket) {
    return NextResponse.redirect(new URL('/login?error=No+ticket+provided', request.url));
  }
  
  try {
    const serviceUrl = url.origin + '/api/auth/cas/callback';
    const validateUrl = `https://secure.its.yale.edu/cas/serviceValidate?ticket=${ticket}&service=${encodeURIComponent(serviceUrl)}`;
    
    const response = await axios.get(validateUrl);
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    });
    const result = parser.parse(response.data);
    
    if (result['cas:serviceResponse'] && result['cas:serviceResponse']['cas:authenticationSuccess']) {
      const authSuccess = result['cas:serviceResponse']['cas:authenticationSuccess'];
      const netID = authSuccess['cas:user'];
      
      // Create admin client for user management
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      
      // Check if user exists in users table by net_id
      const { data: existingUser, error: userError } = await adminClient
        .from('users')
        .select('id, net_id')
        .eq('net_id', netID)
        .single();
      
      if (userError && userError.code !== 'PGRST116') {
        console.error('Error checking user:', userError);
        return NextResponse.redirect(new URL('/login?error=Database+error', request.url));
      }
      
      // Generate a secure random password
      const password = crypto.randomBytes(16).toString('hex');
      
      let userId;
      
      if (existingUser) {
        // User exists, check if auth user exists with same ID
        const { data: authData } = await adminClient.auth.admin.getUserById(existingUser.id);
        
        if (authData?.user) {
          // Auth user exists, update password
          const { error: updateError } = await adminClient.auth.admin.updateUserById(
            existingUser.id,
            { password }
          );
          
          if (updateError) {
            console.error('Error updating user password:', updateError);
            return NextResponse.redirect(new URL('/login?error=Password+update+failed', request.url));
          }
          
          userId = existingUser.id;
        } else {
          // Auth user doesn't exist, create new auth user with specified ID
          const { data: newAuthUser, error: createAuthError } = await adminClient.auth.admin.createUser({
            email: `${netID}@yale.edu`,
            password,
            email_confirm: true,
            user_metadata: { netid: netID },
            app_metadata: { provider: 'cas' },
            user_id: existingUser.id
          });
          
          if (createAuthError) {
            console.error('Error creating auth user:', createAuthError);
            return NextResponse.redirect(new URL('/login?error=User+creation+failed', request.url));
          }
          
          userId = newAuthUser.user.id;
        }
      } else {
        // User doesn't exist, create new auth user
        const { data: newAuthUser, error: createAuthError } = await adminClient.auth.admin.createUser({
            email: `${netID}@yale.edu`,
            password,
            email_confirm: true,
            user_metadata: { netid: netID },
            app_metadata: { provider: 'cas' }
        });
        
        if (createAuthError) {
          console.error('Error creating auth user:', createAuthError);
          return NextResponse.redirect(new URL('/login?error=User+creation+failed', request.url));
        }
        
        userId = newAuthUser.user.id;
        
        // Create user record
        const { error: insertError } = await adminClient
          .from('users')
          .insert({
            id: userId,
            net_id: netID
          });
        
        if (insertError) {
          console.error('Error creating user record:', insertError);
          return NextResponse.redirect(new URL('/login?error=User+record+creation+failed', request.url));
        }
      }
      
      // Simple approach: redirect to a client-side auth page with email and password
      const redirectUrl = new URL('/auth-handler', url.origin);
      redirectUrl.searchParams.set('email', `${netID}@yale.edu`);
      redirectUrl.searchParams.set('password', password);
      
      return NextResponse.redirect(redirectUrl);
    } else {
      console.error('CAS authentication failed');
      return NextResponse.redirect(new URL('/login?error=CAS+authentication+failed', request.url));
    }
  } catch (error) {
    console.error('CAS validation error:', error);
    return NextResponse.redirect(new URL('/login?error=Authentication+failed', request.url));
  }
}