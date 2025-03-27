
// app/api/user/courses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/database/client';

/**
 * GET /api/user/courses/[id]
 * Retrieves a specific student course by ID
 */
export async function GET(
	request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
	void [request];
  try {
    // Get the user session from cookies
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
		const { id } = await params;
    const courseId  = id;
    
    // First verify the user has access to this course
    const { data: fypData, error: fypError } = await supabase
      .from('fyp')
      .select('id')
      .eq('user_id', session.user.id);
    
    if (fypError) {
      return NextResponse.json(
        { error: 'Failed to verify user access' },
        { status: 500 }
      );
    }
    
    if (!fypData || fypData.length === 0) {
      return NextResponse.json(
        { error: 'No FYP record found for user' },
        { status: 404 }
      );
    }
    
    // Get the FYP IDs the user has access to
    const fypIds = fypData.map(f => f.id);
    
    // Get the student course
    const { data: courseData, error: courseError } = await supabase
      .from('student_courses')
      .select(`
        id,
        term,
        status,
        result,
        fyp_id,
        course_id,
        courses:course_id (
          id,
          title,
          credits,
          codes,
          term,
          distributions,
          flags,
          professors,
          requirements,
          description
        )
      `)
      .eq('id', parseInt(courseId, 10))
      .in('fyp_id', fypIds)
      .single();
    
    if (courseError) {
      if (courseError.code === 'PGRST116') { // Not found
        return NextResponse.json(
          { error: 'Course not found or not accessible' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch course' },
        { status: 500 }
      );
    }
    
    // Format the course data
    const formattedCourse = {
      id: courseData.id,
      term: courseData.term,
      status: courseData.status,
      result: courseData.result,
      course: courseData.courses
    };
    
    return NextResponse.json({ course: formattedCourse });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course data' },
      { status: 500 }
    );
  }
}

