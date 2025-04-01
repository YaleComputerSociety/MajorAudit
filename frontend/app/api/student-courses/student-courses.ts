
// frontend/app/api/student-courses/student-courses.ts

import supabase from '@/database/client';

// Interface for student course addition parameters
interface AddStudentCourseParams {
  userId: string;
  courseOfferingId: number;
  term: string;
  status: string;
  result: string;
}

/**
 * Validates if a course offering exists for the given code and term
 */
export async function validateCourseExists(code: string, term: string) {
  
  // First get the course_id from course_codes table
  const { data: courseCode, error: codeError } = await supabase
    .from('course_codes')
    .select('course_id')
    .eq('code', code.toUpperCase()) // Ensure consistent casing
    .single();
  
  if (codeError || !courseCode) {
    console.error('Course code not found:', codeError);
    return null;
  }
  
  // Then find a course offering with that course_id for the given term
  const { data: courseOffering, error: offeringError } = await supabase
    .from('course_offerings')
    .select('id, course_id, term, professors, flags')
    .eq('course_id', courseCode.course_id)
    .eq('term', term)
    .single();
  
  if (offeringError || !courseOffering) {
    console.error('Course offering not found:', offeringError);
    return null;
  }
  
  return courseOffering;
}

/**
 * Gets the FYP ID for a user
 */
async function getUserFypId(userId: string) {
  
  const { data: fyp, error } = await supabase
    .from('fyp')
    .select('id')
    .eq('user_id', userId)
    .single();
  
  if (error || !fyp) {
    throw new Error(`Failed to get FYP for user: ${error?.message || 'FYP not found'}`);
  }
  
  return fyp.id;
}

/**
 * Adds a new student course
 */
export async function addStudentCourse(params: AddStudentCourseParams) {
  const { userId, courseOfferingId, term, status, result } = params;
  
  // Get the user's FYP ID
  const fypId = await getUserFypId(userId);
  
  // Create the student course record
  const { data, error } = await supabase
    .from('student_courses')
    .insert({
      fyp_id: fypId,
      course_offering_id: courseOfferingId,
      term,
      status,
      result
    })
    .select('*')
    .single();
  
  if (error) {
    throw new Error(`Failed to add student course: ${error.message}`);
  }
  
  return data;
}

/**
 * Removes a student course
 */
// export async function removeStudentCourse(studentCourseId: number, userId: string) {
  
//   // First verify this course belongs to the user's FYP for security
//   const fypId = await getUserFypId(userId);
  
//   const { error: verifyError, count } = await supabase
//     .from('student_courses')
//     .select('*', { count: 'exact', head: true })
//     .eq('id', studentCourseId)
//     .eq('fyp_id', fypId);
  
//   if (verifyError || count === 0) {
//     throw new Error('Unauthorized or course not found');
//   }
  
//   // Now delete the course
//   const { error } = await supabase
//     .from('student_courses')
//     .delete()
//     .eq('id', studentCourseId);
  
//   if (error) {
//     throw new Error(`Failed to remove student course: ${error.message}`);
//   }
  
//   return true;
// }

/**
 * Gets all student courses for a user
 */
export async function getStudentCourses(userId: string) {
  const fypId = await getUserFypId(userId);
  
  // Get all student courses with related course offering data
  const { data, error } = await supabase
    .from('student_courses')
    .select(`
      id, 
      term, 
      status, 
      result,
      course_offering:course_offerings(
        id,
        term,
        professors,
        flags,
        course:courses(
          id,
          title,
          description,
          requirements,
          credits,
          distributions,
          is_colsem,
          is_fysem
        )
      )
    `)
    .eq('fyp_id', fypId);
  
  if (error) {
    throw new Error(`Failed to get student courses: ${error.message}`);
  }
  
  // Transform the data to match your frontend model
  const transformedData = data
    .filter(item => item.course_offering !== null && item.course_offering.course !== null)
    .map(item => {
      const courseOffering = item.course_offering!;
      const abstractCourse = courseOffering.course!;
      
      return {
        id: item.id,
        status: item.status,
        result: item.result,
        term: item.term,
        courseOffering: {
          id: courseOffering.id,
          term: courseOffering.term,
          professors: courseOffering.professors || [],
          flags: courseOffering.flags || [],
          codes: [] as string[], // This will be filled in later
          abstractCourse: {
            id: abstractCourse.id,
            title: abstractCourse.title,
            description: abstractCourse.description || '',
            requirements: abstractCourse.requirements || '',
            credits: abstractCourse.credits || 0,
            distributions: abstractCourse.distributions || [],
            is_colsem: abstractCourse.is_colsem || false,
            is_fysem: abstractCourse.is_fysem || false,
            codes: [] as string[], // This will be filled in later
          }
        }
      };
    });
  
  // Now get all the course codes for these courses
  if (transformedData.length > 0) {
    const courseIds = [...new Set(
      data
        .filter(item => item.course_offering !== null && item.course_offering.course !== null)
        .map(item => item.course_offering!.course!.id)
    )];
    
    const { data: codesData, error: codesError } = await supabase
      .from('course_codes')
      .select('code, course_id')
      .in('course_id', courseIds);
    
    if (!codesError && codesData) {
      // Create a mapping of course_id to codes
      const courseCodesMap: Record<number, string[]> = {};
      codesData.forEach(codeItem => {
        if (!courseCodesMap[codeItem.course_id]) {
          courseCodesMap[codeItem.course_id] = [];
        }
        courseCodesMap[codeItem.course_id].push(codeItem.code);
      });
      
      // Update the transformed data with course codes
      transformedData.forEach(item => {
        const originalItem = data.find(d => d.id === item.id);
        if (originalItem?.course_offering?.course) {
          const courseId = originalItem.course_offering.course.id;
          if (courseCodesMap[courseId]) {
            item.courseOffering.codes = courseCodesMap[courseId];
            item.courseOffering.abstractCourse.codes = courseCodesMap[courseId];
          }
        }
      });
    }
  }
  
  return transformedData;
}
