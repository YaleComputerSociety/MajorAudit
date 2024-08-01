
import { Year } from "../../../commons/types/TypeStudent";
import { StudentCourse } from "../../../commons/types/TypeCourse";

export const yearTreeify = (courses: StudentCourse[]): Year[] => {
  const academicYears: { [key: number]: Year } = {};

  courses.forEach(course => {
    const year = Math.floor(course.term / 100);
    const seasonCode = course.term % 100;
    const academicYearKey = seasonCode === 3 ? year : year - 1;

    if (!academicYears[academicYearKey]) {
      academicYears[academicYearKey] = {
        grade: 0,
        terms: [academicYearKey * 100 + 3, (academicYearKey + 1) * 100 + 1],
        fall: [],
        spring: [],
      };
    }

    if (seasonCode === 3) {
      academicYears[academicYearKey].fall.push(course);
    } else {
      academicYears[academicYearKey].spring.push(course);
    }
  });

  const sortedYears = Object.keys(academicYears)
    .map(key => parseInt(key))
    .sort((a, b) => a - b)
    .map((key, idx) => {
      academicYears[key].grade = idx + 1;
      return academicYears[key];
    });

  const lastYearKey = parseInt(Object.keys(academicYears).pop()!);
  for (let i = sortedYears.length; i < 4; i++) {
    const nextYearKey = lastYearKey + i - sortedYears.length + 1;
    sortedYears.push({
      grade: sortedYears.length + 1,
      terms: [nextYearKey * 100 + 3, (nextYearKey + 1) * 100 + 1],
      fall: [],
      spring: [],
    });
  }

  return sortedYears;
};
