// frontend/app/api.user-profile/route.ts

import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/database/server';
import { 
  transformToUser, 
  transformToFYP, 
  transformToStudentCourse 
} from './user-transformers';
import { Tables } from '@/types/supabase_newer';

export async function GET() 
{
  try {
    // Authenticate user once
    const supabase = await getSupabaseServerClient();
    const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      return NextResponse.json(
        { error: 'Authentication error: ' + userError.message },
        { status: 401 }
      );
    }
    
    if (!authUser) {      
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = authUser.id;
    
    // Fetch user and all FYPs in parallel
    const [userResponse, fypsResponse] = await Promise.all([
      supabase.from('users').select('*').eq('id', userId).single(),
      supabase.from('fyp').select('*').eq('user_id', userId)
    ]);
    
    // Handle user data errors
    if (userResponse.error) {
      return NextResponse.json(
        { error: userResponse.error.message },
        { status: 404 }
      );
    }
    
    if (!userResponse.data) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const userData = userResponse.data;
    const fypsData = fypsResponse.error ? [] : fypsResponse.data || [];
    
    // Early return if no FYPs
    if (fypsData.length === 0) {
      const user = transformToUser(userData, []);
      
      return NextResponse.json({ 
        user 
      }, {
        headers: {
          'Cache-Control': 'private, max-age=30'
        }
      });
    }
    
    // Get all FYP IDs to fetch related courses
    const fypIds = fypsData.map(fyp => fyp.id);
    
    // Fetch all student courses for all FYPs in a single query
    const { data: allStudentCoursesWithRelations, error: relationsError } = await supabase
      .from('student_courses')
      .select(`
        *,
        course_offering:course_offerings(
          *,
          course:courses(*)
        )
      `)
      .in('fyp_id', fypIds);
    
    if (relationsError) {
      // Return user with empty courses on error
      const transformedFyps = fypsData.map(fypData => transformToFYP(fypData, []));
      const user = transformToUser(userData, transformedFyps);
      
      return NextResponse.json({ 
        user,
        error: `Student courses fetch error: ${relationsError.message}`
      }, {
        headers: {
          'Cache-Control': 'private, max-age=30'
        }
      });
    }
    
    // If no student courses found
    if (!allStudentCoursesWithRelations || allStudentCoursesWithRelations.length === 0) {
      const transformedFyps = fypsData.map(fypData => transformToFYP(fypData, []));
      const user = transformToUser(userData, transformedFyps);
      
      return NextResponse.json({ 
        user 
      }, {
        headers: {
          'Cache-Control': 'private, max-age=30'
        }
      });
    }
    
    // Extract course IDs for fetching codes
    const courseIds = allStudentCoursesWithRelations
      .filter(sc => sc.course_offering?.course?.id)
      .map(sc => sc.course_offering!.course!.id);
    
    // Get all course codes in one batch
    let allCourseCodes: Tables<'course_codes'>[] = [];
    if (courseIds.length > 0) {
      const { data: courseCodes, error: codesError } = await supabase
        .from('course_codes')
        .select('*')
        .in('course_id', courseIds);
      
      if (!codesError && courseCodes) {
        allCourseCodes = courseCodes;
      }
    }
    
    // Create a lookup map for efficient code access
    const codesByCourseId: Record<number, Tables<'course_codes'>[]> = {};
    allCourseCodes.forEach(code => {
      if (!codesByCourseId[code.course_id]) {
        codesByCourseId[code.course_id] = [];
      }
      codesByCourseId[code.course_id].push(code);
    });
    
    // Group student courses by FYP ID
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const studentCoursesByFypId: Record<number, any[]> = {};
    allStudentCoursesWithRelations.forEach(sc => {
      if (!studentCoursesByFypId[sc.fyp_id]) {
        studentCoursesByFypId[sc.fyp_id] = [];
      }
      studentCoursesByFypId[sc.fyp_id].push(sc);
    });
    
    // Transform each FYP with its associated courses
    try {
      const transformedFyps = fypsData.map(fypData => {
        const fypId = fypData.id;
        const courses = studentCoursesByFypId[fypId] || [];
        
        const studentCourses = courses.map(sc => {
          if (!sc.course_offering_id || !sc.course_offering || !sc.course_offering.course) {
            return transformToStudentCourse(sc, null, null, []);
          }
          
          const courseId = sc.course_offering.course.id;
          const courseCodes = codesByCourseId[courseId] || [];
          
          return transformToStudentCourse(
            sc,
            sc.course_offering as Tables<'course_offerings'>,
            sc.course_offering.course as Tables<'courses'>,
            courseCodes
          );
        });
        
        return transformToFYP(fypData, studentCourses);
      });
      
      // Build user with all FYPs
      const user = transformToUser(userData, transformedFyps);
      
      return NextResponse.json({ 
        user 
      }, {
        headers: {
          'Cache-Control': 'private, max-age=30'
        }
      });
    } catch (transformError) {
      return NextResponse.json(
        { error: 'Error transforming data: ' + (transformError instanceof Error ? transformError.message : String(transformError)) }, 
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
