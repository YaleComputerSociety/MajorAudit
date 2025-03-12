
import { Course, StudentCourse } from "@/types/type-user"

// COURSES

// HSAR PROGRAM
export const HSAR_401: Course = { codes: ["HSAR 401"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }

// PLSC PROGRAM
export const PLSC_474: Course = { codes: ["PSLC 474"], title: "", credit: 1, dist: ["So"], seasons: ["Spring"]}
export const PLSC_490: Course = { codes: ["PSLC 490"], title: "", credit: 1, dist: ["So"], seasons: ["Fall", "Spring"]}
export const PLSC_493: Course = { codes: ["PSLC 493"], title: "", credit: 1, dist: ["So"], seasons: ["Fall", "Spring"]}

// CPSC PROGRAM
export const CPSC_201: Course = { codes: ["CPSC 201"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_202: Course = { codes: ["CPSC 202"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_244: Course = { codes: ["MATH 244"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_223: Course = { codes: ["CPSC 223"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_323: Course = { codes: ["CPSC 323"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_365: Course = { codes: ["CPSC 365"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_366: Course = { codes: ["CPSC 366"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_381: Course = { codes: ["CPSC 381"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_490: Course = { codes: ["CPSC 490"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }

// ECON PROGRAM
export const MATH_110: Course = { codes: ["MATH 110"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_111: Course = { codes: ["MATH 111"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_112: Course = { codes: ["MATH 112"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_115: Course = { codes: ["MATH 115"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_116: Course = { codes: ["MATH 116"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ENAS_151: Course = { codes: ["ENAS 151"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_118: Course = { codes: ["MATH 118"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_120: Course = { codes: ["MATH 120"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_108: Course = { codes: ["ECON 108"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_110: Course = { codes: ["ECON 110"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_115: Course = { codes: ["ECON 115"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_111: Course = { codes: ["ECON 111"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_116: Course = { codes: ["ECON 116"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_121: Course = { codes: ["ECON 121"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_125: Course = { codes: ["ECON 125"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_122: Course = { codes: ["ECON 122"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_126: Course = { codes: ["ECON 126"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_117: Course = { codes: ["ECON 117"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_123: Course = { codes: ["ECON 123"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const ECON_136: Course = { codes: ["ECON 136"], title: "", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }

// STUDENT COURSES

// CPSC COURSES
export const SC_CPSC_201: StudentCourse = { term: 202403, status: "DA", result: "GRADE_PASS", course: CPSC_201 }
// export const SC_CPSC_202: StudentCourse = { term: 202403, status: "DA", result: "GRADE_PASS", course: CPSC_202 }
export const SC_CPSC_223: StudentCourse = { term: 202501, status: "DA", result: "GRADE_PASS", course: CPSC_223 }
export const SC_CPSC_323: StudentCourse = { term: 202503, status: "DA", result: "GRADE_PASS", course: CPSC_323 }
export const SC_CPSC_381: StudentCourse = { term: 202503, status: "DA", result: "GRADE_PASS", course: CPSC_381 }

// ECON COURSES
export const SC_ECON_110: StudentCourse = { term: 202403, status: "DA", result: "GRADE_PASS", course: ECON_110 }
