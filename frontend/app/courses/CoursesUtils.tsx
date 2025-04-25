// frontend/app/courses/CoursesUtils.tsx

import { StudentCourse, StudentTermArrangement } from "@/types/user";
import { StudentYear, StudentSemester } from "./CoursesTyping";

export function BuildStudentYears(studentCourses: StudentCourse[], studentTermArrangement: StudentTermArrangement): StudentYear[] {
  
	const firstYearTerms = studentTermArrangement?.first_year ?? [];
  const sophomoreTerms = studentTermArrangement?.sophomore ?? [];
  const juniorTerms = studentTermArrangement?.junior ?? [];
  const seniorTerms = studentTermArrangement?.senior ?? [];

  const buildSemesters = (terms: string[]): StudentSemester[] => {
    return terms.map((term) => ({
      term,
      studentCourses: studentCourses.filter((sc) => sc.term === term),
    }));
  };

  return [
    { grade: "First-Year", studentSemesters: buildSemesters(firstYearTerms) },
    { grade: "Sophomore", studentSemesters: buildSemesters(sophomoreTerms) },
    { grade: "Junior", studentSemesters: buildSemesters(juniorTerms) },
    { grade: "Senior", studentSemesters: buildSemesters(seniorTerms) },
  ];
}
