
import { Course } from "@/types/type-user";
import { HSAR_401 } from "./data-courses";

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
