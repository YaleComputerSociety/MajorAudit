
import { StudentCourse } from "@/types/type-user"
import { CPSC_201, CPSC_202, CPSC_223, CPSC_323, ECON_110 } from "./data-courses"

// CPSC COURSES
export const SC_CPSC_201: StudentCourse = { term: 202403, status: "DA", result: "GRADE_PASS", course: CPSC_201 }
export const SC_CPSC_202: StudentCourse = { term: 202403, status: "DA", result: "GRADE_PASS", course: CPSC_202 }
export const SC_CPSC_223: StudentCourse = { term: 202501, status: "DA", result: "GRADE_PASS", course: CPSC_223 }
export const SC_CPSC_323: StudentCourse = { term: 202503, status: "MA", result: "IP", course: CPSC_323 }

// ECON COURSES
export const SC_ECON_110: StudentCourse = { term: 202403, status: "DA", result: "GRADE_PASS", course: ECON_110 }


