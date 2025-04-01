// app/api/user/courses/route.ts

import { NextResponse } from 'next/server'
import { transformToStudentCourse } from '../user-transformers'
import { Tables } from '@/types/supabase_newer'

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  try {
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
    
    const { data: allFypData, error: fypError } = await supabase
      .from('fyp')
      .select('id')
      .eq('user_id', userId);
    
    if (fypError) {
      return NextResponse.json(
        { error: `FYP fetch error: ${fypError.message}` }, 
        { status: 500 }
      );
    }
    
    if (!allFypData || allFypData.length === 0) {
      return NextResponse.json({ studentCourses: [] });
    }
    
    // If multiple FYP records exist, use the first one
    const fypId = allFypData[0].id;
    
    // Fetch all student courses with course offerings and courses in a single query
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
      return NextResponse.json(
        { error: relationsError.message }, 
        { status: 500 }
      );
    }
    
    // Handle the case where no student courses are found
    if (!studentCoursesWithRelations || studentCoursesWithRelations.length === 0) {
      return NextResponse.json({ studentCourses: [] });
    }
    
    // Extract all unique course IDs to fetch their codes in a single query
    const courseIds = studentCoursesWithRelations
      .filter(sc => sc.course_offering?.course?.id)
      .map(sc => sc.course_offering!.course!.id);
    
    // Get all course codes in one batch if we have course IDs
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
    
    // Transform the data
    try {
      const studentCourses = studentCoursesWithRelations.map(sc => {
        if (!sc.course_offering_id || !sc.course_offering || !sc.course_offering.course) {
          return transformToStudentCourse(sc, null, null, []);
        }
        
        const courseId = sc.course_offering.course.id;
        const courseCodes = codesByCourseId[courseId] || [];
        
        // Type assertion to handle nested data from the join
        return transformToStudentCourse(
          sc,
          sc.course_offering as Tables<'course_offerings'>,
          sc.course_offering.course as Tables<'courses'>,
          courseCodes
        );
      });
      
      return NextResponse.json({ studentCourses });
    } catch (transformError) {
      return NextResponse.json(
        { error: 'Error transforming student courses: ' + (transformError instanceof Error ? transformError.message : String(transformError)) }, 
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