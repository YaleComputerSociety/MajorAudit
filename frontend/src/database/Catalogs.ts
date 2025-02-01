
import { Course } from "../types/TypeCourse";

interface Catalog {
	number: number;
	courses: Course[];
}

export const Catalogs: Catalog[] = [
	{ number: 202203, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202301, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
]

export const getCatalogCourse = (catalogNumber: number, courseCode: string): Course | null => {

  const catalog = Catalogs.find((cat) => cat.number === catalogNumber);
  if (!catalog) return null; 

  const course = catalog.courses.find((course) => course.codes.includes(courseCode));
  return course || null; 
};
