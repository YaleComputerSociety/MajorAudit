
import { Course } from "@/types/type-user";

interface Catalog {
	number: number;
	courses: Course[];
}

export const Catalogs: Catalog[] = [
	{ number: 202203, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202301, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202302, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202303, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202401, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202402, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202403, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
	{ number: 202501, courses: [{ codes: ["HSAR 401"], title: "Critical Approaches", credit: 1, dist: [], seasons: [] }] },
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
