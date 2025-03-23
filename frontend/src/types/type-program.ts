
// types/type-program

import { Course, StudentCourse } from "./type-user";

export interface Option { 
	option: Course | null;
	satisfier: StudentCourse | null;
	elective_range?: string; 
	flags?: string[];
	is_any_okay?: boolean;
}

export interface Subrequirement {
	name: string; 
	description: string;
	index: number;
	courses_required_count: number;
	options: Option[]
}

export interface Requirement {
	name: string;
	description: string; 
	index: number;
	courses_required_count: number;
	subreqs_required_count: number;
	checkbox?: boolean;
	subrequirements: Subrequirement[];
}

export interface Concentration {
	name: string;
	description: string; 
  requirements: Requirement[];
}

export interface Degree {
	type: string;
	concentrations: Concentration[];
}

export interface Program {
	name: string;
	abbreviation: string;
	student_count: number; 
	catolog_link: string; 
	website_link: string; 
	degrees: Degree[];
}

export type ProgramDict = Record<string, Program>;
