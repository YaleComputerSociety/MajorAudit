
import { User } from "@/types/type-user";
import { StudentYear, StudentSemester } from "./CoursesTyping";

export function BuildStudentYears(user: User): StudentYear[] 
{
  const { studentCourses } = user.FYP;

	const studentTermArrangement = {
		first_year: ["0", "202403", "202501"],
		sophomore: ["0", "202503", "202601"],
		junior: ["0", "202603", "202701"],
		senior: ["0", "202703", "202801"]
	}

  const firstYearTerms = studentTermArrangement.first_year;
  const sophomoreTerms = studentTermArrangement.sophomore;
  const juniorTerms = studentTermArrangement.junior;
  const seniorTerms = studentTermArrangement.senior;

  const buildSemesters = (terms: string[]): StudentSemester[] => {
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
