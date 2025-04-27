// frontend/app/api/student-courses/student-courses.ts

import { SupabaseClient } from '@supabase/supabase-js';
import { Database,Tables } from '@/types/supabase_newer';
import { StudentCourse } from '@/types/user';

type GenericSupabaseClient = SupabaseClient<Database>;

interface AddCreatedParams {
  fypId: number;
  createdCourse: {
    title: string;
    code: string;
    distributions: string[];
    credits: number;
  };
  term: string;
  status: string;
  result: string;
  sort_index: number;
  supabaseClient: GenericSupabaseClient;
}

interface AddOfferingParams {
  fypId: number;
  courseOfferingId: number;
  term: string;
  status: string;
  result: string;
	sort_index: number;
  supabaseClient: GenericSupabaseClient;
}

type BulkCourseEntry = 
  | {
      course_offering_id: number;
      term: string;
      status: string;
      result: string;
      sort_index: number;
    }
  | {
      created_course: {
        title: string;
        code: string;
        distributions: string[];
        credits: number;
      };
      term: string;
      status: string;
      result: string;
      sort_index: number;
    };


export async function validateOffering(
  code: string,
  term: string,
  supabaseClient: GenericSupabaseClient
): Promise<{
  courseOffering: Tables<'course_offerings'> | null,
  course: Tables<'courses'> | null,
  courseCodes: Tables<'course_codes'>[]
}> {
  const { data: courseCodeRows } = await supabaseClient
    .from('course_codes')
    .select('course_id')
    .eq('code', code.toUpperCase());

  if (!courseCodeRows || courseCodeRows.length === 0) {
    return { courseOffering: null, course: null, courseCodes: [] };
  }

  const courseId = courseCodeRows[0].course_id;

  const { data: courseOffering } = await supabaseClient
    .from('course_offerings')
    .select('id, term, professors, flags, course_id')
    .eq('course_id', courseId)
    .eq('term', term)
    .maybeSingle();

  const { data: course } = await supabaseClient
    .from('courses')
    .select('*, universal_course_id')
    .eq('id', courseId)
    .maybeSingle();

  const { data: courseCodes } = await supabaseClient
    .from('course_codes')
    .select('*')
    .eq('course_id', courseId);

  return { courseOffering: courseOffering ?? null, course: course ?? null, courseCodes: courseCodes ?? [] };
}

async function addCreatedStudentCourse(params: AddCreatedParams) {
  const { fypId, createdCourse, term, status, result, sort_index, supabaseClient } = params;

  const { data: newCreatedCourse, error: createdCourseError } = await supabaseClient
    .from('created_courses')
    .insert({
      title: createdCourse.title,
      code: createdCourse.code,
      distributions: createdCourse.distributions,
      credits: createdCourse.credits
    })
    .select('*')
    .single();

  if (createdCourseError) throw new Error(`Failed to create course: ${createdCourseError.message}`);

  const { data: studentCourse, error: studentCourseError } = await supabaseClient
    .from('student_courses')
    .insert({
      fyp_id: fypId,
      created_course_id: newCreatedCourse.id,
      term,
      status,
      result,
      sort_index,
      is_hidden: false,
			pref_code: createdCourse.code
    })
    .select('*')
    .single();

  if (studentCourseError) throw new Error(`Failed to add student course: ${studentCourseError.message}`);

  return { studentCourse, createdCourse: newCreatedCourse };
}

async function addOfferingStudentCourse(params: AddOfferingParams) {
  const { fypId, courseOfferingId, term, status, result, sort_index, supabaseClient } = params;

  const { data, error } = await supabaseClient
    .from('student_courses')
    .insert({
      fyp_id: fypId,
      course_offering_id: courseOfferingId,
      term,
      status,
      result,
			sort_index,
			is_hidden: false,
			pref_code: null
    })
    .select('*')
    .single();

  if (error) throw new Error(`Failed to add student course: ${error.message}`);
  return data;
}

export async function addStudentCourses(
  fypId: number,
  entries: BulkCourseEntry[],
  supabaseClient: GenericSupabaseClient
): Promise<{ added: StudentCourse[]; errors: { entry: BulkCourseEntry; message: string }[] }> {
  const added: StudentCourse[] = [];
  const errors: { entry: BulkCourseEntry; message: string }[] = [];

  for (const entry of entries) {
    if ('course_offering_id' in entry) {
      // OFFERING path
      const { course_offering_id, term, result, status, sort_index } = entry;
      try {
        const { data: offering } = await supabaseClient
          .from('course_offerings')
          .select('*, course:courses(*)')
          .eq('id', course_offering_id)
          .maybeSingle();

        if (!offering) throw new Error('Course offering not found');

        const { data: courseCodes } = await supabaseClient
          .from('course_codes')
          .select('*')
          .eq('course_id', offering.course_id);

        const sc = await addOfferingStudentCourse({
          fypId,
          courseOfferingId: course_offering_id,
          term,
          status,
          result,
          sort_index,
          supabaseClient
        });

        added.push(
          normalizeStudentCourseOffering(
            sc,
            offering,
            offering.course,
            courseCodes ?? []
          )
        );
      } catch (err) {
        errors.push({ entry, message: err instanceof Error ? err.message : 'Unknown error' });
      }

    } else if ('created_course' in entry) {
      // CREATED COURSE path
      const { created_course, term, result, status, sort_index } = entry;
      try {
        const { studentCourse, createdCourse } = await addCreatedStudentCourse({
          fypId,
          createdCourse: created_course,
          term,
          status,
          result,
          sort_index,
          supabaseClient
        });

        added.push(
          normalizeStudentCourseCreated(
            studentCourse,
            createdCourse
          )
        );
      } catch (err) {
        errors.push({ entry, message: err instanceof Error ? err.message : 'Unknown error' });
      }
    } else {
      errors.push({ entry, message: 'Invalid course entry' });
    }
  }

  return { added, errors };
}

export async function getStudentCourses(
  fypId: number,
  supabaseClient: GenericSupabaseClient
) {
  const { data, error } = await supabaseClient
    .from('student_courses')
		.select(`
			*,
			course_offering:course_offerings(
				id, term, professors, flags, course_id,
				course:courses(
					id, title, description, requirements,
					credits, distributions, is_colsem, is_fysem, universal_course_id
				)
			),
			created_course:created_courses(
				id, title, code, distributions, credits
			)
		`)
    .eq('fyp_id', fypId);

  if (error) throw new Error(`Failed to fetch student courses: ${error.message}`);

  const courseIds = [...new Set(
    data
      .filter(row => row.course_offering?.course)
      .map(row => row.course_offering!.course!.id)
  )];

  const { data: codes } = await supabaseClient
    .from('course_codes')
    .select('*')
    .in('course_id', courseIds);

  const codeMap = new Map<number, Tables<'course_codes'>[]>();
  codes?.forEach(code => {
    const list = codeMap.get(code.course_id) || [];
    list.push(code);
    codeMap.set(code.course_id, list);
  });

	return data.map(sc => {
		if (sc.created_course) {
			return normalizeStudentCourseCreated(sc, sc.created_course);
		} else if (sc.course_offering) {
			return normalizeStudentCourseOffering(
				sc,
				sc.course_offering,
				sc.course_offering?.course ?? null,
				codeMap.get(sc.course_offering?.course?.id ?? -1) || []
			);
		} else {
			throw new Error('Student course is missing both offering and created course');
		}
	});
}

async function removeStudentCourse(
  fypId: number,
  studentCourseId: number,
  supabaseClient: GenericSupabaseClient
) {
  const { data, error } = await supabaseClient
    .from('student_courses')
    .select('id')
    .eq('id', studentCourseId)
    .eq('fyp_id', fypId)
    .maybeSingle();

  if (!data) throw new Error('Course not found or unauthorized' + error);

  const { error: deleteError } = await supabaseClient
    .from('student_courses')
    .delete()
    .eq('id', studentCourseId);

  if (deleteError) throw new Error(`Failed to delete course: ${deleteError.message}`);
  return { success: true, message: 'Deleted' };
}

export async function removeStudentCourses(
  fypId: number,
  courseIds: number[],
  supabaseClient: GenericSupabaseClient
): Promise<{ removed: number[]; errors: { id: number; message: string }[] }> {
  const removed: number[] = [];
  const errors: { id: number; message: string }[] = [];

  for (const id of courseIds) {
    try {
      await removeStudentCourse(fypId, id, supabaseClient);
      removed.push(id);
    } catch (err) {
      errors.push({ id, message: err instanceof Error ? err.message : 'Unknown error' });
    }
  }

  return { removed, errors };
}

export function normalizeStudentCourseOffering(
  studentCourse: Tables<'student_courses'>,
  offering: Tables<'course_offerings'>,
  course: Tables<'courses'> | null,
  courseCodes: Tables<'course_codes'>[]
): StudentCourse {
  return {
    id: studentCourse.id,
    term: studentCourse.term,
    status: studentCourse.status,
    result: studentCourse.result,
		sort_index: studentCourse.sort_index,
		is_hidden: studentCourse.is_hidden || false,
		pref_code: studentCourse.pref_code || courseCodes[0]?.code || "",
    courseOffering: {
			id: offering.id,
      term: offering.term,
      professors: offering.professors || [],
      flags: offering.flags || [],
      codes: courseCodes.map(c => c.code),
      abstractCourse: course
        ? {
            id: course.id,
            codes: courseCodes.map(c => c.code),
            title: course.title,
            description: course.description || '',
            requirements: course.requirements || '',
            credits: course.credits || 0,
            distributions: course.distributions || [],
            is_colsem: course.is_colsem || false,
            is_fysem: course.is_fysem || false,
            universal_course_id: course.universal_course_id || null
          }
        : {
            id: -1,
            codes: [],
            title: 'Unknown Course',
            description: '',
            requirements: '',
            credits: 0,
            distributions: [],
            is_colsem: false,
            is_fysem: false,
            universal_course_id: null
          }
    },
		createdCourse: null
  };
}

export function normalizeStudentCourseCreated(
  studentCourse: Tables<'student_courses'>,
  createdCourse: Tables<'created_courses'>
): StudentCourse {
  return {
    id: studentCourse.id,
    term: studentCourse.term,
    status: studentCourse.status,
    result: studentCourse.result,
    sort_index: studentCourse.sort_index,
    is_hidden: studentCourse.is_hidden || false,
		pref_code: studentCourse.pref_code || createdCourse.code,
    createdCourse: {
      id: createdCourse.id,
      title: createdCourse.title,
      code: createdCourse.code,
      credits: createdCourse.credits,
      distributions: createdCourse.distributions
    },
    courseOffering: null
  };
}
