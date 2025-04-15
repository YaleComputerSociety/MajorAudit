
// frontend/app/api/student-courses/student-courses.ts

import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase_newer';

// Generic type for any Supabase client (server or client-side)
type GenericSupabaseClient = SupabaseClient<Database>;

// Interface for student course addition parameters
interface AddStudentCourseParams {
  userId: string;
  courseOfferingId: number;
  term: string;
  status: string;
  result: string;
  supabaseClient: GenericSupabaseClient;
}

/* Validates if a course offering exists for the given code and term */
export async function validateCourseExists(
  code: string, 
  term: string, 
  supabaseClient: GenericSupabaseClient
) {
  
  // First get the course_id from course_codes table
  const { data: courseCodeData, error: codeError } = await supabaseClient
    .from('course_codes')
    .select('course_id, code')
    .eq('code', code.toUpperCase()); 
  
  if (codeError || !courseCodeData || courseCodeData.length === 0) {
    console.error('Course code not found:', code, codeError);
    return null;
  }
  
  if (courseCodeData.length > 1) {
    console.log(`Found ${courseCodeData.length} entries for code ${code}:`, courseCodeData);
  }
  
  const courseId = courseCodeData[0].course_id;
  
  // Then find a course offering with that course_id for the given term
  const { data: courseOffering, error: offeringError } = await supabaseClient
    .from('course_offerings')
    .select('id, course_id, term, professors, flags')
    .eq('course_id', courseId)
    .eq('term', term)
    .maybeSingle(); 
  
  if (offeringError) {
    console.error('Error finding course offering:', offeringError);
    return null;
  }
  
  if (!courseOffering) {
    console.log(`No offering found for course ${code} (ID: ${courseId}) in term ${term}`);
    return null;
  }
  
  return courseOffering;
}

/* Gets the FYP ID for a user */
async function getUserFypId(
  userId: string, 
  supabaseClient: GenericSupabaseClient
) {
  
  const { data: fyp, error } = await supabaseClient
    .from('fyp')
    .select('id')
    .eq('user_id', userId)
    .single();
  
  if (error || !fyp) {
    throw new Error(`Failed to get FYP for user: ${error?.message || 'FYP not found'}`);
  }
  
  return fyp.id;
}

/* Adds a new student course */
export async function addStudentCourse(params: AddStudentCourseParams) {
  const { userId, courseOfferingId, term, status, result, supabaseClient } = params;
  
  // Get the user's FYP ID
  const fypId = await getUserFypId(userId, supabaseClient);
  
  // Create the student course record
  const { data, error } = await supabaseClient
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

/* Gets all student courses for a user */
export async function getStudentCourses(
  userId: string, 
  supabaseClient: GenericSupabaseClient
) {
  const fypId = await getUserFypId(userId, supabaseClient);
  
  // Get all student courses with related course offering data
  const { data, error } = await supabaseClient
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
    
    const { data: codesData, error: codesError } = await supabaseClient
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

/* Removes a student course by ID */
export async function removeStudentCourse(
  userId: string, 
  studentCourseId: number,
  supabaseClient: GenericSupabaseClient
) {
  // First verify the student course belongs to this user's FYP
  const fypId = await getUserFypId(userId, supabaseClient);
  
  // Check if the course belongs to the user's FYP
  const { data: courseToDelete, error: verifyError } = await supabaseClient
    .from('student_courses')
    .select('id')
    .eq('id', studentCourseId)
    .eq('fyp_id', fypId)
    .maybeSingle();
  
  if (verifyError) {
    throw new Error(`Error verifying course ownership: ${verifyError.message}`);
  }
  
  if (!courseToDelete) {
    throw new Error('Course not found or you do not have permission to delete it');
  }
  
  // Delete the student course
  const { error: deleteError } = await supabaseClient
    .from('student_courses')
    .delete()
    .eq('id', studentCourseId)
    .eq('fyp_id', fypId); // Double check again for additional security
  
  if (deleteError) {
    throw new Error(`Failed to delete student course: ${deleteError.message}`);
  }
  
  return { success: true, message: 'Course removed successfully' };
}
