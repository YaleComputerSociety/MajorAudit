
import { User } from "@/types/type-user";
import { StudentYear, StudentSemester } from "./CoursesTyping";

export function BuildStudentYears(user: User): StudentYear[] 
{
	if (user.FYPindex === -1 || !user.FYPs || user.FYPs.length === 0) {
    return [];
  }
  
  const currentFYP = user.FYPs[user.FYPindex];
  const { studentCourses } = currentFYP;
  
  // Parse the studentTermArrangement from the FYP
  let studentTermArrangement;
  
  try {
    // If it's already an object, use it directly
    if (typeof currentFYP.studentTermArrangement === 'object') {
      studentTermArrangement = currentFYP.studentTermArrangement;
    } 
    // If it's a JSON string, parse it
    else if (typeof currentFYP.studentTermArrangement === 'string') {
      studentTermArrangement = JSON.parse(currentFYP.studentTermArrangement);
    } 
  } catch (error) {
    console.error("Error parsing studentTermArrangement:", error);
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
