
import { StudentCourse, StudentSemester, StudentYear } from "@/types/type-user";

export function BuildStudentYears(studentCourses: StudentCourse[]): StudentYear[]{

  const grades = ["First-Year", "Sophomore", "Junior", "Senior"];
  const studentYears: StudentYear[] = grades.map(grade => ({
    grade,
    studentSemesters: [],
  }));

  studentCourses.sort((a, b) => a.term - b.term);
  const semesterMap: Map<number, StudentSemester> = new Map();
  
  for (const course of studentCourses) {
    if (!semesterMap.has(course.term)) {
      semesterMap.set(course.term, { term: course.term, studentCourses: [] });
    }
    semesterMap.get(course.term)!.studentCourses.push(course);
  }

  const studentSemesters = Array.from(semesterMap.values()).sort((a, b) => a.term - b.term);

  let yearIndex = 0;
  let termsInYear = 0;

  for (const semester of studentSemesters) {
    const isSummer = semester.term % 100 === 2;

    if (!isSummer) {
      if (termsInYear >= 2 && yearIndex < 3) {
        yearIndex++;
        termsInYear = 0;
      }
      termsInYear++;
    }

    studentYears[yearIndex].studentSemesters.push(semester);
  }

  return studentYears;
}
