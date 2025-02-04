
import { StudentCourse, StudentSemester, StudentYear } from "@/types/type-user";
import { IsTermActive } from "@/utils/CourseDisplay";

export function BuildStudentYears(studentCourses: StudentCourse[]): StudentYear[] {
  const grades = ["First-Year", "Sophomore", "Junior", "Senior"];
  const studentYears: StudentYear[] = grades.map(grade => ({
    grade,
    studentSemesters: [],
    active: true, // Default to true, will update later
  }));

  studentCourses.sort((a, b) => a.term - b.term);
  const semesterMap: Map<number, StudentSemester> = new Map();

  for (const course of studentCourses) {
    if (!semesterMap.has(course.term)) {
      semesterMap.set(course.term, { 
        term: course.term, 
        studentCourses: [], 
        active: IsTermActive(course.term) 
      });
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

  // Determine `active` status for each StudentYear
  for (let i = 0; i < studentYears.length - 1; i++) {
    const nextYear = studentYears[i + 1]; // Look ahead to the next year

    if (nextYear.studentSemesters.some(sem => !sem.active)) {
      studentYears[i].active = false;
    }
  }

  return studentYears;
}

