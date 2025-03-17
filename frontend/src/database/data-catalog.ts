
import { Course } from "@/types/type-user";
import { CPSC_490, HSAR_401 } from "./data-courses";

interface Catalog {
	number: number;
	courses: Course[];
}

export const Catalogs: Catalog[] = [
	{ number: 202203, courses: [HSAR_401] },
	{ number: 202301, courses: [HSAR_401] },
	{ number: 202302, courses: [HSAR_401] },
	{ number: 202303, courses: [HSAR_401] },
	{ number: 202401, courses: [HSAR_401] },
	{ number: 202402, courses: [HSAR_401] },
	{ number: 202403, courses: [HSAR_401] },
	{ number: 202501, courses: [HSAR_401, CPSC_490] },
	{ number: 202502, courses: [HSAR_401] },
	{ number: 202503, courses: [HSAR_401] },
	{ number: 202601, courses: [HSAR_401] },
	{ number: 202602, courses: [HSAR_401] },
	{ number: 202603, courses: [HSAR_401] },
	{ number: 202701, courses: [HSAR_401] },
	{ number: 202702, courses: [HSAR_401] },
	{ number: 202703, courses: [HSAR_401] },
	{ number: 202801, courses: [HSAR_401] },
	{ number: 202802, courses: [HSAR_401] },
	{ number: 202803, courses: [HSAR_401] },
	{ number: 202901, courses: [HSAR_401] },
	{ number: 202902, courses: [HSAR_401] },
	{ number: 202903, courses: [HSAR_401] },
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
