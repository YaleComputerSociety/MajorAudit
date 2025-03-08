
import { Course } from "@/types/type-user";

interface Catalog {
	number: number;
	courses: Course[];
}

export const CPSC_201: Course = { codes: ["CPSC 201"], title: "Introduction To Computer Science", 						credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_202: Course = { codes: ["CPSC 202"], title: "Math Tools For Computer Scientists", 					credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const MATH_244: Course = { codes: ["MATH 244"], title: "Discrete Mathematics", 												credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_223: Course = { codes: ["CPSC 223"], title: "Data Structures And Programming Techniques", 	credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_323: Course = { codes: ["CPSC 323"], title: "Introduction To Systems Programming", 					credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_365: Course = { codes: ["CPSC 365"], title: "Algorithms", 																	credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_366: Course = { codes: ["CPSC 366"], title: "Intensive Algorithms", 												credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }
export const CPSC_490: Course = { codes: ["CPSC 490"], title: "Senior Project", 															credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }

export const HSAR_401: Course = { codes: ["HSAR 401"], title: "Critical Approaches To Art History", 					credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }


export const Catalogs: Catalog[] = [
	{ number: 202203, courses: [HSAR_401] },
	{ number: 202301, courses: [HSAR_401] },
	{ number: 202302, courses: [HSAR_401] },
	{ number: 202303, courses: [HSAR_401] },
	{ number: 202401, courses: [HSAR_401] },
	{ number: 202402, courses: [HSAR_401] },
	{ number: 202403, courses: [HSAR_401] },
	{ number: 202501, courses: [HSAR_401] },
]

export const getCatalogCourse = (catalogNumber: number, courseCode: string): Course | null => {

  const catalog = Catalogs.find((cat) => cat.number === catalogNumber);
  if (!catalog) return null; 

  const course = catalog.courses.find((course) => course.codes.includes(courseCode));
  return course || null; 
};

export const getCatalogTerms = (): number[] => {
  return Catalogs.map((catalog) => catalog.number).sort((a, b) => a - b);
}
