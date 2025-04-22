// frontend/app/api/student-courses/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/database/server';
import { 
  validateCourseExists, 
  addStudentCourse, 
  getStudentCourses, 
  removeStudentCourse,
} from './student-courses';

export async function GET(req: NextRequest) 
{
  try {
    const supabaseServerClient = await getSupabaseServerClient();

    const { data: { user: authUser }, error: userError } = await supabaseServerClient.auth.getUser();
    
    if (userError || !authUser) {
      return NextResponse.json(
        { error: 'Authentication error: ' + (userError?.message || 'User not found') },
        { status: 401 }
      );
    }

    // Get the FYP ID from the URL
    const url = new URL(req.url);
    const fypId = url.searchParams.get('fyp_id');
    
    if (!fypId) {
      return NextResponse.json(
        { error: 'FYP ID is required' },
        { status: 400 }
      );
    }
    
    const studentCourses = await getStudentCourses(parseInt(fypId), supabaseServerClient);
    
    return NextResponse.json({ data: studentCourses });
  } catch (error) {
    console.error('Error fetching student courses:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch student courses';
    
    // Handle specific error cases
    if (errorMessage.includes('not found') || errorMessage.includes('permission')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) 
{
  try {
    const supabaseServerClient = await getSupabaseServerClient();

    const { data: { user: authUser }, error: userError } = await supabaseServerClient.auth.getUser();
    
    if (userError || !authUser) {
      return NextResponse.json(
        { error: 'Authentication error: ' + (userError?.message || 'User not found') },
        { status: 401 }
      );
    }

    const { term_from, code, result, term_to, fyp_id } = await req.json();

    if (!term_from || !code || !result || !term_to || !fyp_id) {
      return NextResponse.json(
        { error: 'Missing required fields, including FYP ID' }, 
        { status: 400 }
      );
    }

    const courseOffering = await validateCourseExists(code, term_from, supabaseServerClient);
    if (!courseOffering) {
      return NextResponse.json(
        { error: 'Course not found for the specified term' }, 
        { status: 404 }
      );
    }

    const status = term_from === term_to ? "DA" : "MA";

    const newStudentCourse = await addStudentCourse({
      fypId: fyp_id,
      courseOfferingId: courseOffering.id,
      term: term_to,
      status,
      result,
      supabaseClient: supabaseServerClient
    });

    return NextResponse.json({ 
      data: newStudentCourse,
      message: 'Course added successfully' 
    });
  } catch (error) {
    console.error('Error adding student course:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to add student course';
    
    // Handle specific error cases
    if (errorMessage.includes('not found') || errorMessage.includes('permission')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabaseServerClient = await getSupabaseServerClient();
    
    // Authenticate the user
    const { data: { user: authUser }, error: userError } = await supabaseServerClient.auth.getUser();
    
    if (userError || !authUser) {
      return NextResponse.json(
        { error: 'Authentication error: ' + (userError?.message || 'User not found') },
        { status: 401 }
      );
    }
    
    // Get the studentCourseId and fypId from the URL
    const url = new URL(req.url);
    const studentCourseId = url.searchParams.get('id');
    const fypId = url.searchParams.get('fyp_id');
    
    if (!studentCourseId || !fypId) {
      return NextResponse.json(
        { error: 'Course ID and FYP ID are required' },
        { status: 400 }
      );
    }
    
    // Delete the student course
    await removeStudentCourse(parseInt(fypId), parseInt(studentCourseId), supabaseServerClient);
    
    return NextResponse.json({
      success: true,
      message: 'Course removed successfully'
    });
  } catch (error) {
    console.error('Error removing student course:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to remove student course';
    
    // Handle specific error cases with appropriate status codes
    if (errorMessage.includes('not found') || errorMessage.includes('permission')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}