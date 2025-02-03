
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
  status: string; 	// "DA" || "MA"
}

export interface StudentSemester {
	season: number;
	studentCourses: StudentCourse[];
}

export interface FYP {
	languageRequirement: string;
	studentSemesters: StudentSemester[]
	degreeConfigurations: DegreeConfiguration[][];
	degreeDeclarations: StudentDegree[];
}

export interface User {
	name: string;
	netID: string;
	onboard: boolean;
	FYP: FYP;
}
