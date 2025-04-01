
import { StudentCourse } from './type-user';

/**
 * Response type for adding a course
 */
export interface AddCourseResponse {
  success: boolean;
  course?: StudentCourse;
  message: string;
}

/**
 * Response type for removing a course
 */
export interface RemoveCourseResponse {
  success: boolean;
  message: string;
}

/**
 * Return type for the useStudentCourses hook
 */
export interface UseStudentCoursesReturn {
  courses: StudentCourse[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<StudentCourse[] | null>;
  validateCourse: (code: string, termFrom: string) => Promise<boolean>;
  addCourse: (
    termFrom: string,
    code: string,
    result: string,
    termTo: string
  ) => Promise<AddCourseResponse>;
  // removeCourse: (id: number) => Promise<RemoveCourseResponse>;
}
