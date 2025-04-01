
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdminServerClient } from '@/database/server';

export async function GET() 
{
  const cookieStore = cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;
  
  if(accessToken && refreshToken){
    try{
      const supabaseAdmin = await getSupabaseAdminServerClient();
      await supabaseAdmin.auth.admin.signOut({
        scope: 'global'
      });
    }catch(error){
      console.error('Error during sign out:', error);
    }
  }
  const response = NextResponse.redirect('https://secure.its.yale.edu/cas/logout');
  
  response.cookies.delete('sb-access-token');
  response.cookies.delete('sb-refresh-token');
  
  return response;
}
