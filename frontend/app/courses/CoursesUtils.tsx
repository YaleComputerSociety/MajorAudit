import { FYP } from "@/types/type-user";
import { StudentYear, StudentSemester } from "./CoursesTyping";

export function BuildStudentYears(fyp: FYP): StudentYear[] {
  const { studentCourses } = fyp;

  // Parse the studentTermArrangement
  let studentTermArrangement: any = {};

  try {
    if (typeof fyp.studentTermArrangement === "object") {
      studentTermArrangement = fyp.studentTermArrangement;
    } else if (typeof fyp.studentTermArrangement === "string") {
      studentTermArrangement = JSON.parse(fyp.studentTermArrangement);
    }
  } catch (error) {
    console.error("Error parsing studentTermArrangement:", error);
  }

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
