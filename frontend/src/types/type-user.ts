
// import { DegreeConcentration } from "./type-program";

export interface Course {
	id: string;
  codes: string[]; 
  title: string; 
	description: string;
	requirements: string;
	professors: string[];
	distributions: string[];
	flags: string[];
	credits: number;
	term: string;
	is_colsem: boolean;
	is_fysem: boolean;
	is_sysem: boolean;
	seasons: string[];
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

export interface MajorsIndex {
	prog: string; 	// e.g. "CPSC"
	deg: number; 
	conc: number;
}
export interface StudentConc {
	name: string;
	status: number;
	// concentration: DegreeConcentration;
	concentration_majors_index: MajorsIndex;
	selected_subreqs: Record<number, number[]>;
}

export interface FYP {
	decl_list: StudentConc[];
	studentCourses: StudentCourse[];
	languagePlacement: string;
	studentTermArrangement: StudentTermArrangement;
}

export interface User {
	name: string;
	netID: string;
	FYP: FYP;
}

export interface MajorsIndex {
	prog: string;
	deg: number;
	conc: number;
}
