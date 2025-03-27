
// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/database/client';
import { fetchUserProfile, updateUserProfile } from './user-service';

/**
 * GET /api/user
 * Retrieves the current authenticated user's profile
 */
export async function GET(){
  try {
    // Get the user session from cookies
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const userData = await fetchUserProfile(userId);
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user
 * Updates the current authenticated user's profile
 */
export async function PUT(request: NextRequest) {
  try {
    // Get the user session from cookies
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const requestData = await request.json();
    
    // Validate required fields
    if (!requestData.name && !requestData.netID) {
      return NextResponse.json(
        { error: 'No data provided for update' },
        { status: 400 }
      );
    }
    
    const result = await updateUserProfile(userId, {
      name: requestData.name,
      netID: requestData.netID
    });
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to update user profile' },
        { status: 500 }
      );
    }
    
    // Fetch the updated user data
    const updatedUser = await fetchUserProfile(userId);
    
    return NextResponse.json({ 
      message: 'User profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    );
  }
}
