
import { User, StudentSemester, StudentYear } from "@/types/type-user";

export function BuildStudentYears(user: User): StudentYear[] 
{
  const { studentTermArrangement, studentCourses } = user.FYP;

  const firstYearTerms = studentTermArrangement.first_year;
  const sophomoreTerms = studentTermArrangement.sophomore;
  const juniorTerms = studentTermArrangement.junior;
  const seniorTerms = studentTermArrangement.senior;

  const buildSemesters = (terms: number[]): StudentSemester[] => {
    return terms.map(term => ({
      term,
      studentCourses: studentCourses.filter(studentCourses => studentCourses.term === term),
    }));
  };

  const studentYears: StudentYear[] = [
    { grade: "First-Year", studentSemesters: buildSemesters(firstYearTerms) },
    { grade: "Sophomore", studentSemesters: buildSemesters(sophomoreTerms) },
    { grade: "Junior", studentSemesters: buildSemesters(juniorTerms) },
    { grade: "Senior", studentSemesters: buildSemesters(seniorTerms) },
  ];

  return studentYears;
}
