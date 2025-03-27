
// types/type-user.ts

export interface MajorsIndex {
	prog: string; 	// e.g. "CPSC"
	deg: number; 
	conc: number;
}
// export interface StudentConc {
// 	name: string;
// 	status: number;
// 	// concentration: DegreeConcentration;
// 	concentration_majors_index: MajorsIndex;
// 	selected_subreqs: Record<number, number[]>;
// }


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
	seasons: string[];
}

export interface StudentCourse {
  course: Course; 	
	term: string; 		// 202401
  status: string; 	// "DA" or "MA"
	result: string; 	// "IP" or "GRADE_PASS" or "GRADE_FAIL" or "CR" or "W"
}

export interface FYP {
	studentCourses: StudentCourse[];
	languagePlacement: string;
	studentTermArrangement: string;
}

export interface User {
	name: string;
	netID: string;
	FYP: FYP;
}
