
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;
  
  if (accessToken && refreshToken) {
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false
        }
      }
    );
    
    // Invalidate the session
    await supabase.auth.admin.signOut({
      scope: 'global'
    });
  }
  
  // Create response with redirect to CAS logout
  const response = NextResponse.redirect('https://secure.its.yale.edu/cas/logout');
  
  // Clear the cookies
  response.cookies.delete('sb-access-token');
  response.cookies.delete('sb-refresh-token');
  
  return response;
}
