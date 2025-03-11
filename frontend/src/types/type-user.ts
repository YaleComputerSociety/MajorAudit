
import { MajorsIndex, Program } from "./type-program";

export interface LanguagePlacement {
	language: string;
	level: number;
}

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
	result: string; 	// "IP" or "GRADE_PASS" or "GRADE_FAIL" or "CR" or "W"
}

export interface StudentSemester {
	term: number;
	studentCourses: StudentCourse[];
}

export interface StudentYear {
	grade: string; 		// "First-Year" | "Sophomore" | "Junior" | "Senior"
	studentSemesters: StudentSemester[];
}

export interface StudentTermArrangement {
	first_year: number[];
	sophomore: number[];
	junior: number[];
	senior: number[];
}

export interface StudentConc {
	user_status: number;
	majors_index: MajorsIndex;
}

export interface FYP {
	languagePlacement: LanguagePlacement;
	studentCourses: StudentCourse[];
	studentTermArrangement: StudentTermArrangement;
	prog_list: Program[];
	decl_list: StudentConc[];
}

export interface User {
	name: string;
	netID: string;
	onboard: boolean;
	FYP: FYP;
}
