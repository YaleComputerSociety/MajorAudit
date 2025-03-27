
import supabase from '@/database/client';
import { Tables } from '@/types/supabase_new';
import { User, FYP, StudentCourse, Course } from '@/types/type-user';
import { safeArray, safeString, safeBoolean } from '@/types/db-helpers';

/**
 * Transforms DB course data to frontend Course type
 */
function transformCourse(course: Tables<"courses">): Course {
  return {
    id: course.id,
    title: course.title,
    description: safeString(course.description),
    requirements: safeString(course.requirements),
    professors: safeArray(course.professors),
    distributions: safeArray(course.distributions),
    flags: safeArray(course.flags),
    credits: course.credits,
    term: course.term,
    is_colsem: safeBoolean(course.is_colsem),
    is_fysem: safeBoolean(course.is_fysem),
    codes: safeArray(course.codes),
    seasons: safeArray(course.seasons)
  };
}

/**
 * Fetches a user's profile data from Supabase
 * @param userId The user's ID from Supabase authentication
 * @returns The user profile data or null if not found
 */
export async function fetchUserProfile(userId: string): Promise<User | null> {
  // First, get the basic user data
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (userError || !userData) {
    console.error('Error fetching user data:', userError);
    return null;
  }

  // Then, get the FYP data
  const { data: fypData, error: fypError } = await supabase
    .from('fyp')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (fypError) {
    console.error('Error fetching FYP data:', fypError);
    // We'll continue without FYP data since user might not have any yet
  }

  // Get student courses if FYP data exists
  let studentCourses: StudentCourse[] = [];
  if (fypData) {
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
          description,
					is_colsem,
					is_fysem,
					seasons
        )
      `)
      .eq('fyp_id', fypData.id);

    if (coursesError) {
      console.error('Error fetching student courses:', coursesError);
    } else if (coursesData) {
      // Transform the data using the transformCourse function
      studentCourses = coursesData.map(sc => ({
        id: sc.id,
        term: sc.term,
        status: sc.status,
        result: sc.result,
        course: sc.courses ? transformCourse(sc.courses) : {
					id: '',
					codes: [],
					title: '',
					description: '',
					requirements: '',
					professors: [],
					distributions: [],
					flags: [],
					credits: 0,
					term: '',
					is_colsem: false,
					is_fysem: false,
					seasons: []
				}
      }));
    }
  }

  // Initialize FYP with empty objects if missing
  const fyp: FYP = {
    studentCourses: studentCourses,
    languagePlacement: fypData?.language_placement || '',
    studentTermArrangement: fypData?.term_arrangement || ''
  };

  // Construct and return the complete user object
  const user: User = {
    name: userData.name || '',
    netID: userData.net_id,
    FYP: fyp
  };

  return user;
}

/**
 * Fetches the declared concentrations for a user
 * @param fypId The user's FYP ID
 * @returns Array of student concentrations
 */
export async function fetchStudentConcentrations(){
  // This function would fetch the student's declared concentrations
  // You'll need to adapt this based on your exact schema
  // This is a placeholder based on your data structure
  
  // Return an empty array for now
  return [];
}

/**
 * Updates user profile information
 * @param userId The user's ID
 * @param userData The user data to update
 * @returns Success or error
 */
export async function updateUserProfile(userId: string, userData: Partial<User>) {
  const { error } = await supabase
    .from('users')
    .update({
      name: userData.name,
      net_id: userData.netID
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }

  return { success: true };
}

/**
 * Updates FYP information for a user
 * @param userId The user's ID
 * @param fypData The FYP data to update
 * @returns Success or error
 */
export async function updateFYP(userId: string, fypData: Partial<FYP>) {
  // First check if FYP exists
  const { data: existingFYP, error: checkError } = await supabase
    .from('fyp')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found"
    console.error('Error checking FYP existence:', checkError);
    return { success: false, error: checkError };
  }

  let fypId: number;

  if (!existingFYP) {
    // Create new FYP record
    const { data: newFYP, error: createError } = await supabase
      .from('fyp')
      .insert({
        user_id: userId,
        language_placement: fypData.languagePlacement || '',
        term_arrangement: fypData.studentTermArrangement || '',
        name: null // Assuming this field exists but isn't needed
      })
      .select('id')
      .single();

    if (createError || !newFYP) {
      console.error('Error creating FYP:', createError);
      return { success: false, error: createError };
    }

    fypId = newFYP.id;
  } else {
    // Update existing FYP record
    fypId = existingFYP.id;
    const { error: updateError } = await supabase
      .from('fyp')
      .update({
        language_placement: fypData.languagePlacement,
        term_arrangement: fypData.studentTermArrangement
      })
      .eq('id', fypId);

    if (updateError) {
      console.error('Error updating FYP:', updateError);
      return { success: false, error: updateError };
    }
  }

  return { success: true, fypId };
}
