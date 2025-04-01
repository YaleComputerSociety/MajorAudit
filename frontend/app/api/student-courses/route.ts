
// frontend/app/api/student-courses/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/database/server';
import { validateCourseExists, addStudentCourse, getStudentCourses } from './student-courses';

export async function GET() 
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

    const userId = authUser.id;
    const studentCourses = await getStudentCourses(userId);
    
    return NextResponse.json({ data: studentCourses });
  } catch (error) {
    console.error('Error fetching student courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student courses' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabaseServerClient = await getSupabaseServerClient();

    const { data: { user: authUser }, error: userError } = await supabaseServerClient.auth.getUser();
    
    if (userError || !authUser) {
      return NextResponse.json(
        { error: 'Authentication error: ' + (userError?.message || 'User not found') },
        { status: 401 }
      );
    }

    const userId = authUser.id;
    const { term_from, code, result, term_to } = await req.json();

    if (!term_from || !code || !result || !term_to) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    const courseOffering = await validateCourseExists(code, term_from);
    if (!courseOffering) {
      return NextResponse.json(
        { error: 'Course not found for the specified term' }, 
        { status: 404 }
      );
    }

    const status = term_from === term_to ? "DA" : "MA";

    const newStudentCourse = await addStudentCourse({
      userId,
      courseOfferingId: courseOffering.id,
      term: term_to,
      status,
      result
    });

    return NextResponse.json({ 
      data: newStudentCourse,
      message: 'Course added successfully' 
    });
  } catch (error) {
    console.error('Error adding student course:', error);
    return NextResponse.json(
      { error: 'Failed to add student course' }, 
      { status: 500 }
    );
  }
}
