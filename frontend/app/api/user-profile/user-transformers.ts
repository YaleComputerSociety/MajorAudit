
// app/api/user/user-transformers.ts

import { 
  Tables, 
} from '@/types/supabase_newer'
import { 
  User, 
  FYP, 
  StudentCourse, 
  CourseOffering, 
  AbstractCourse 
} from '@/types/type-user'

export function transformToAbstractCourse(
  course: Tables<'courses'>,
  courseCodes: Tables<'course_codes'>[]
): AbstractCourse {
  return {
    id: course.id,
    codes: courseCodes.map(cc => cc.code),
    title: course.title,
    description: course.description || '',
    requirements: course.requirements || '',
    credits: course.credits || 0,
    distributions: course.distributions || [],
    is_colsem: course.is_colsem || false,
    is_fysem: course.is_fysem || false,
  }
}

export function transformToCourseOffering(
  offering: Tables<'course_offerings'>,
  course: Tables<'courses'>,
  courseCodes: Tables<'course_codes'>[]
): CourseOffering {
  return {
    term: offering.term,
    professors: offering.professors || [],
    flags: offering.flags || [],
    codes: courseCodes.map(cc => cc.code),
    abstractCourse: transformToAbstractCourse(course, courseCodes)
  }
}

export function transformToStudentCourse(
  studentCourse: Tables<'student_courses'>,
  courseOffering: Tables<'course_offerings'> | null,
  course: Tables<'courses'> | null,
  courseCodes: Tables<'course_codes'>[]
): StudentCourse {
  return {
		id: studentCourse.id,
    status: studentCourse.status,
    result: studentCourse.result,
    term: studentCourse.term,
    courseOffering: courseOffering && course ? 
      transformToCourseOffering(courseOffering, course, courseCodes) : 
      {
        term: studentCourse.term,
        professors: [],
        flags: [],
        codes: [],
        abstractCourse: {
          id: -1,
          codes: [],
          title: "Unknown Course",
          description: "",
          requirements: "",
          credits: 0,
          distributions: [],
          is_colsem: false,
          is_fysem: false
        }
      }
  }
}

export function transformToFYP(
  fyp: Tables<'fyp'>,
  studentCourses: StudentCourse[]
): FYP {
  return {
    id: fyp.id,
    studentCourses,
    languagePlacement: fyp.language_placement || '',
    studentTermArrangement: fyp.term_arrangement || '',
  }
}

export function transformToUser(
  user: Tables<'users'>,
  fyps: FYP[]
): User {
  return {
    name: user.name || '',
    netID: user.net_id,
    FYPs: fyps 
  }
}
