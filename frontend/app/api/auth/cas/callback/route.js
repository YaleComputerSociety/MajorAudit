// frontend/app/api/auth/cas/callback/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import crypto from 'crypto';
import { getSupabaseAdminServerClient } from '@/database/server';
import { fetchYaliesInfoByNetId } from './yalies';

export const dynamic = 'force-dynamic'; // Ensure the route is always dynamic

/*
 * Validates a CAS ticket against Yale's CAS server
 */
async function validateCasTicket(ticket, serviceUrl) 
{
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
    return { netID };
  }
  
  return null;
}

/**
 * Checks if a user exists in the database
 */
async function checkExistingUser(adminClient, netID) 
{
  const { data: existingUser, error: userError } = await adminClient
    .from('users')
    .select('id, net_id')
    .eq('net_id', netID)
    .single();
  
  return { existingUser, error: userError };
}

/*
 * Handles existing user authentication
 */
async function handleExistingUser(adminClient, existingUser, netID, password, email) 
{
  // Check if auth user exists with same ID
  const { data: authData } = await adminClient.auth.admin.getUserById(existingUser.id);
  
  if (authData?.user) {
    // Auth user exists, update password
    const { error: updateError } = await adminClient.auth.admin.updateUserById(
      existingUser.id,
      { password }
    );
    
    return { userId: existingUser.id, error: updateError };
  } else {
    // Auth user doesn't exist, create new auth user with specified ID
    const { data: newAuthUser, error: createAuthError } = await adminClient.auth.admin.createUser({
      email: email,
      password,
      email_confirm: true,
      user_metadata: { netid: netID },
      app_metadata: { provider: 'cas' },
      user_id: existingUser.id
    });
    
    return { 
      userId: newAuthUser?.user?.id || null, 
      error: createAuthError 
    };
  }
}

/*
 * Creates a new user in the authentication system and database
 * and creates three default FYP records for them
 */
async function createNewUser(adminClient, netID, password, yaliesInfo) 
{
  // Create new auth user
  const { data: newAuthUser, error: createAuthError } = await adminClient.auth.admin.createUser({
    email: yaliesInfo.email,
    password,
    email_confirm: true,
    user_metadata: { netid: netID },
    app_metadata: { provider: 'cas' }
  });
  
  if (createAuthError) {
    return { userId: null, error: createAuthError };
  }
  
  const userId = newAuthUser.user.id;
  
  let name = '';
  if (yaliesInfo) {
    name = yaliesInfo.first_name;
    
    // Add major if available
    if (yaliesInfo.major) {
      name += ` - ${yaliesInfo.major}`;
    }
  }
  
  // Create user record
  const { error: insertError } = await adminClient
    .from('users')
    .insert({
      id: userId,
      net_id: netID,
      name: name || null
    });

  if (insertError) {
    return { userId, error: insertError };
  }

	// Generate term_arrangement based on graduation year
  let termArrangement = null;
  
  if (yaliesInfo && yaliesInfo.year) {
    const gradYear = parseInt(yaliesInfo.year);
    
    // Calculate academic terms for each year (fall and spring)
    // Format: YYYYMM where MM is 01 for spring, 03 for fall
    const seniorFall = `${gradYear - 1}03`;
    const seniorSpring = `${gradYear}01`;
    const juniorFall = `${gradYear - 2}03`;
    const juniorSpring = `${gradYear - 1}01`;
    const sophomoreFall = `${gradYear - 3}03`;
    const sophomoreSpring = `${gradYear - 2}01`;
    const firstYearFall = `${gradYear - 4}03`;
    const firstYearSpring = `${gradYear - 3}01`;
    
    // Create term arrangement object
    const arrangement = {
      first_year: ["0", firstYearFall, firstYearSpring],
      sophomore: ["0", sophomoreFall, sophomoreSpring],
      junior: ["0", juniorFall, juniorSpring],
      senior: ["0", seniorFall, seniorSpring]
    };
    
    // Convert to JSON string
    termArrangement = JSON.stringify(arrangement);
  }
  
  // Create three default FYPs for the user
  const fypNames = ["#1", "#2", "#3"];
  const fypInserts = fypNames.map(name => ({
    user_id: userId,
    name,
    language_placement: null,
    term_arrangement: termArrangement
  }));
  
  const { error: fypError } = await adminClient
    .from('fyp')
    .insert(fypInserts);
  
  return { userId, error: fypError };
}

/**
 * Main handler for GET requests
 */
export async function GET(request) 
{
  const url = new URL(request.url);
  const ticket = url.searchParams.get('ticket');
  
  if (!ticket) {
    return NextResponse.redirect(new URL('/login?error=No+Ticket+Provided', request.url));
  }
  
  try {
    const serviceUrl = url.origin + '/api/auth/cas/callback';
    const validatedUser = await validateCasTicket(ticket, serviceUrl);
    
    if (!validatedUser) {
      console.error('CAS Auth Failed');
      return NextResponse.redirect(new URL('/login?error=CAS+Authentication+Failed', request.url));
    }
    
    // Extract netID from validated user
    const { netID } = validatedUser;
    
    // Create admin client for user management
    const adminClient = await getSupabaseAdminServerClient();

    // Fetch user info from Yalies API
    const yaliesInfo = await fetchYaliesInfoByNetId(netID);

    // Throw error if Yalies info is missing or incomplete
    if (!yaliesInfo || !yaliesInfo.email) {
      console.error('Yalies API failed to return valid user data');
      return NextResponse.redirect(new URL('/login?error=Yalies+API+Error', request.url));
    }
    
    // Use yaliesInfo email with no fallback since we've validated it exists
    const email = yaliesInfo.email;
    
    // Check if user exists
    const { existingUser, error: userError } = await checkExistingUser(adminClient, netID);
    
    if (userError && userError.code !== 'PGRST116') {
      console.error('Error Checking User:', userError);
      return NextResponse.redirect(new URL('/login?error=Database+Error', request.url));
    }
    
    // Generate a secure random password
    const password = crypto.randomBytes(16).toString('hex');
    
    // Declare userId variable before using it
    let userId;
    let error;
    
    if (existingUser) {
      // Handle existing user
      const result = await handleExistingUser(adminClient, existingUser, netID, password, email);
      userId = result.userId;
      error = result.error;
    } else {
      // Create new user
      const result = await createNewUser(adminClient, netID, password, yaliesInfo);
      userId = result.userId;
      error = result.error;
    }
    
    if (error) {
      console.error('Error in user management:', error);
      return NextResponse.redirect(new URL('/login?error=User+Management+Failed', request.url));
    }
    
    // Simple approach: redirect to a client-side auth page with email and password
    const redirectUrl = new URL('/auth-handler', url.origin);
    redirectUrl.searchParams.set('email', email);
    redirectUrl.searchParams.set('password', password);
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('CAS validation error:', error);
    return NextResponse.redirect(new URL('/login?error=Authentication+Failed', request.url));
  }
}