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
      // Mock user for development if needed
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
    
    // Fetch user and FYP data in parallel
    const [userResponse, fypResponse] = await Promise.all([
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
    const fypData = fypResponse.error ? null : fypResponse.data?.[0];
    
    // Early return if no FYP
    if (!fypData) {
      const fyp = fypData ? transformToFYP(fypData, []) : null;
      const user = transformToUser(userData, fyp);
      
      return NextResponse.json({ 
        user 
      }, {
        headers: {
          'Cache-Control': 'private, max-age=30'
        }
      });
    }
    
    // Always fetch student courses with relations
    const fypId = fypData.id;
    
    // Fetch all student courses with relations in a single query
    const { data: studentCoursesWithRelations, error: relationsError } = await supabase
      .from('student_courses')
      .select(`
        *,
        course_offering:course_offerings(
          *,
          course:courses(*)
        )
      `)
      .eq('fyp_id', fypId);
    
    if (relationsError) {
      // Return user with empty courses on error
      const fyp = transformToFYP(fypData, []);
      const user = transformToUser(userData, fyp);
      
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
    if (!studentCoursesWithRelations || studentCoursesWithRelations.length === 0) {
      const fyp = transformToFYP(fypData, []);
      const user = transformToUser(userData, fyp);
      
      return NextResponse.json({ 
        user 
      }, {
        headers: {
          'Cache-Control': 'private, max-age=30'
        }
      });
    }
    
    // Extract course IDs for fetching codes
    const courseIds = studentCoursesWithRelations
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
    
    // Transform the courses data
    try {
      const studentCourses = studentCoursesWithRelations.map(sc => {
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
      
      // Build complete user with FYP and courses
      const fyp = transformToFYP(fypData, studentCourses);
      const user = transformToUser(userData, fyp);
      
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