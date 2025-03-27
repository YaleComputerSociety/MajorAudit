
// app/api/user/fyp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/database/client';
import { updateFYP } from '../user-service';

/**
 * GET /api/user/fyp
 * Retrieves the current user's FYP (Four-Year Plan) data
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
    
    // Fetch FYP data
    const { data: fypData, error: fypError } = await supabase
      .from('fyp')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (fypError && fypError.code !== 'PGRST116') { // Not found is ok
      return NextResponse.json(
        { error: 'Failed to fetch FYP data' },
        { status: 500 }
      );
    }
    
    if (!fypData) {
      return NextResponse.json({ fyp: null });
    }
    
    // Get student courses if FYP data exists
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
    
    // Format the FYP data according to our frontend model
    const formattedFYP = {
      id: fypData.id,
      languagePlacement: fypData.language_placement || '',
      studentTermArrangement: fypData.term_arrangement || '',
      decl_list: [], // This would require another query to get declarations
      studentCourses: studentCourses
    };
    
    return NextResponse.json({ fyp: formattedFYP });
  } catch (error) {
    console.error('Error fetching FYP:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FYP data' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user/fyp
 * Updates the current user's FYP data
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
    
    const result = await updateFYP(userId, {
      languagePlacement: requestData.languagePlacement,
      studentTermArrangement: requestData.studentTermArrangement
    });
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to update FYP data' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      message: 'FYP updated successfully',
      fypId: result.fypId
    });
  } catch (error) {
    console.error('Error updating FYP:', error);
    return NextResponse.json(
      { error: 'Failed to update FYP data' },
      { status: 500 }
    );
  }
}
