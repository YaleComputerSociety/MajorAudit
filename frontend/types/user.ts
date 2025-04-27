
// types/type-user.ts

export type CreatedCourse = {
	id: number;
	title: string;
	code: string;
	distributions: string[];
	credits: number;
}

export type CourseEntry = {
  term_from: string;
  code: string;
  result: string;
  term_to: string;
	sort_index: number;
};

export interface AbstractCourse {
	id: number;
	universal_course_id: string | null;
	codes: string[];
  title: string;
  description: string;
  requirements: string;
  credits: number;
  distributions: string[];
  is_colsem: boolean;
  is_fysem: boolean;
}

export interface CourseOffering {
	id: number;
  term: string;
  professors: string[];
  flags: string[];
  codes: string[]; 
  abstractCourse: AbstractCourse;
}

export interface StudentCourse {
	id: number;
  status: string; 										 
  result: string;											 
  term: string;
	sort_index: number;
	is_hidden: boolean;
	pref_code: string;
  courseOffering: CourseOffering | null;
	createdCourse: CreatedCourse | null;
}

export interface StudentTermArrangement {
  first_year?: string[];
  sophomore?: string[];
  junior?: string[];
  senior?: string[];
}

export interface FYP {
	id: number;
	studentCourses: StudentCourse[];
	languagePlacement: string;
	studentTermArrangement: StudentTermArrangement;
}

export interface User {
	name: string;
	netID: string;
	FYPs: FYP[];
}

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
