
import { Course } from "./type-user";

interface DUS {
	name: string;
	address: string;
	email: string;
}

interface DegreeMetadataStats {
	courses: number;
	rating: number;
	workload: number;
	type: string;
}

export interface DegreeMetadata {
	name: string;
	abbr: string;
	degreeType: string;
	stats: DegreeMetadataStats;
	students: number;
	about: string;
	dus: DUS;
	catologLink: string;
	wesbiteLink: string;
}







// \BEGIN{MAJOR MAGIC}

export interface Range {
	department: string;
	min_code: number;
	max_code: number;
}

export interface TypeOneSubrequirement {
	requirement_name: string;
	requirement_description: string;
	must_choose_n_courses: number;
	courses: Course[];
	elective_range?: Range;
	any?: boolean;
}

export interface TypeOneRequirement {
	requirement_name: string;
	requirement_description: string;
	must_choose_n_subrequirements: number;
	subrequirements: TypeOneSubrequirement[];
}

// export interface TypeTwoRequirement {
// 	requirement_name: string;
// 	requirement_description: string;
// 	checkbox_boolean: boolean;
// }


// export type DegreeRequirement = TypeOneRequirement | TypeTwoRequirement;

export interface DegreeConfiguration {
  degreeRequirements: TypeOneRequirement[];
}

export interface Degree {
	metadata: DegreeMetadata;
	configuration: DegreeConfiguration;
}

// \END{MAJOR MAGIC}

export interface StudentDegree {
	status: string; 				// DA | ADD | PIN
	programIndex: number;
	degreeIndex: number;
}
