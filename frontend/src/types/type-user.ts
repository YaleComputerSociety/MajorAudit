
import { DegreeConfiguration, StudentDegree } from "./type-program";

export interface Course {
  codes: string[]; 		// ["FREN 403", "HUMS 409"]
  title: string; 			// "Proust Interpretations: Reading <i>Remembrance of Things Past</i>"
  credit: number; 		// 1
  dist: string[]; 		// ["Hu"]
  seasons: string[]; 	// ["Spring"]
}

export interface StudentCourse {
  course: Course; 	
	term: number; 		// 202401
  status: string; 	// "DA" or "MA"
}

export interface StudentSemester {
	term: number;
	studentCourses: StudentCourse[];
}

export interface StudentYear {
	grade: string; 		// "First-Year" | "Sophomore" | "Junior" | "Senior"
	studentSemesters: StudentSemester[];
}

export interface FYP {
	languageRequirement: string;
	studentCourses: StudentCourse[];
	degreeConfigurations: DegreeConfiguration[][];
	degreeDeclarations: StudentDegree[];
}

export interface User {
	name: string;
	netID: string;
	onboard: boolean;
	FYP: FYP;
}
