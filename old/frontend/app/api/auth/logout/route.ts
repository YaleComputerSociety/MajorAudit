// frontend/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies(); // ✅ await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;

  if (accessToken && refreshToken) {
    try {

    } catch (error) {
      console.error('Error during Supabase server interaction:', error);
    }
  }

  const response = NextResponse.redirect('https://secure.its.yale.edu/cas/logout');
  
  response.cookies.delete('sb-access-token');
  response.cookies.delete('sb-refresh-token');
  
  return response;
}
