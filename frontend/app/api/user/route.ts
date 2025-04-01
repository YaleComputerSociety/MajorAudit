// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { transformToUser, transformToFYP } from './user-transformers';

export async function GET() {
  try {
    // Create a server client using the newer SSR package
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => cookieStore.get(name)?.value,
        },
      }
    );
    
    // Get the authenticated user (more secure than just getting the session)
    const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      return NextResponse.json(
        { error: 'Authentication error: ' + userError.message },
        { status: 401 }
      );
    }
    
    if (!authUser) {
      // If no authenticated user, check if this is development mode
      if (process.env.NODE_ENV === 'development' && process.env.MOCK_USER_DATA === 'true') {
        return NextResponse.json({
          user: {
            name: 'Test User',
            netID: 'test123',
            FYP: {
              languagePlacement: 'English',
              studentTermArrangement: 'Fall-Spring',
              studentCourses: []
            }
          }
        });
      }
      
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = authUser.id;
    
    // Fetch the user data from your database
    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userDataError) {
      return NextResponse.json(
        { error: userDataError.message },
        { status: 404 }
      );
    }
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Fetch FYP
    const { data: fypData, error: fypError } = await supabase
      .from('fyp')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (fypError && fypError.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is ok
      // FYP might not exist yet for this user, so just return the user
      return NextResponse.json({
        user: transformToUser(userData, null)
      });
    }
    
    // Return the user with empty FYP structure if no FYP data
    const fyp = fypData ? transformToFYP(fypData, []) : null;
    const user = transformToUser(userData, fyp);
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}