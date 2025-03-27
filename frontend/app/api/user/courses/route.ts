
// app/api/user/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/database/client';

/**
 * GET /api/user/courses
 * Retrieves the current user's course selections
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
    
    // First get the user's FYP ID
    const { data: fypData, error: fypError } = await supabase
      .from('fyp')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (fypError) {
      if (fypError.code === 'PGRST116') { // Not found
        return NextResponse.json({ courses: [] });
      }
      return NextResponse.json(
        { error: 'Failed to fetch FYP data' },
        { status: 500 }
      );
    }
    
    // Get student courses
    const { data: coursesData, error: coursesError } = await supabase
      .from('student_courses')
      .select(`
        id,
        term,
        status,
        result,
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
      .eq('fyp_id', fypData.id);
    
    if (coursesError) {
      return NextResponse.json(
        { error: 'Failed to fetch student courses' },
        { status: 500 }
      );
    }

    // Transform the data into the expected format
    const studentCourses = coursesData ? coursesData.map(sc => ({
      id: sc.id,
      term: sc.term,
      status: sc.status,
      result: sc.result,
      course: sc.courses
    })) : [];
    
    return NextResponse.json({ courses: studentCourses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course data' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/courses
 * Adds a new course to the user's plan
 */
export async function POST(request: NextRequest) {
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
    if (!requestData.courseId || !requestData.term) {
      return NextResponse.json(
        { error: 'Course ID and term are required' },
        { status: 400 }
      );
    }
    
    // First get the user's FYP ID (or create one if it doesn't exist)
    let fypId: number;
    const { data: fypData, error: fypError } = await supabase
      .from('fyp')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (fypError) {
      if (fypError.code === 'PGRST116') { // Not found
        // Create a new FYP record
        const { data: newFYP, error: createError } = await supabase
          .from('fyp')
          .insert({
            user_id: userId,
            language_placement: '',
            term_arrangement: ''
          })
          .select('id')
          .single();
        
        if (createError || !newFYP) {
          return NextResponse.json(
            { error: 'Failed to create FYP record' },
            { status: 500 }
          );
        }
        
        fypId = newFYP.id;
      } else {
        // Other error
        return NextResponse.json(
          { error: 'Failed to fetch or create FYP record' },
          { status: 500 }
        );
      }
    } else {
      fypId = fypData.id;
    }
    
    // Add the course to student_courses
    const { data: newCourse, error: courseError } = await supabase
      .from('student_courses')
      .insert({
        fyp_id: fypId,
        course_id: requestData.courseId,
        term: requestData.term,
        status: requestData.status || 'planned',
        result: requestData.result || 'NA'
      })
      .select('id')
      .single();
    
    if (courseError || !newCourse) {
      return NextResponse.json(
        { error: 'Failed to add course to plan' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Course added successfully',
      courseId: newCourse.id
    });
  } catch (error) {
    console.error('Error adding course:', error);
    return NextResponse.json(
      { error: 'Failed to add course' },
      { status: 500 }
    );
  }
}
