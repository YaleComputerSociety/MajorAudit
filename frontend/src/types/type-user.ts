
import { DegreeConcentration, MajorsIndex, Program } from "./type-program";

export interface LanguagePlacement {
	language: string;
	level: number;
}

export interface Course {
	id: string;
  codes: string[]; 
  title: string; 
	description: string;
	prereqs: string;
	professors: string[];
	distributions: string[];
	seasons: string[];
	flags: string[];
	credits: number;
	colsem: boolean;
	fysem: boolean;
	sysem: boolean;
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
	conc_majors_index: MajorsIndex;
	user_status: number;
	user_conc: DegreeConcentration;
	user_conc_name: string;
	selected_subreqs: Record<number, number[]>;
}

export interface FYP {
	languagePlacement: LanguagePlacement;
	studentCourses: StudentCourse[];
	studentTermArrangement: StudentTermArrangement;
	decl_list: StudentConc[];
}

export interface User {
	name: string;
	netID: string;
	onboard: boolean;
	FYP: FYP;
}
