
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;
  
  if (!accessToken || !refreshToken) {
    return NextResponse.json({ 
      loggedIn: false
    });
  }
  
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
  
  // Set session manually using the cookies
  const { data: { session }, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken
  });
  
  if (error || !session) {
    return NextResponse.json({ 
      loggedIn: false
    });
  }
  
  // Get user data from users table
  const { data: userData } = await supabase
    .from('users')
    .select('net_id, name')
    .eq('id', session.user.id)
    .single();
  
  return NextResponse.json({
    loggedIn: true,
    user: {
      id: session.user.id,
      netid: userData?.net_id || session.user.user_metadata?.netid,
      name: userData?.name
    }
  });
}
