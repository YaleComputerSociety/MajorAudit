
import { Course, StudentCourse } from "./type-user";

export interface StudentDegree {
	status: string; 				// DA | ADD | PIN
	programIndex: number;
	degreeIndex: number;
}

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

export interface ElectiveRange {
	dept: string;
	min_code: number;
	max_code: number;
}

export type SubreqElectiveRange = ElectiveRange| null;

// subreq: 1 | set options
export interface DegreeSubrequirement {
	subreq_type_id: number;
	subreq_name: string;
	subreq_desc: string;

	courses_required: number;
	courses_options: (Course | null)[];
	courses_elective_range: SubreqElectiveRange;
	courses_any_bool: boolean;

	student_courses_satisfying: StudentCourse[];
}

export interface DegreeRequirement {
	req_type_id: number;
	req_name: string;
	req_desc: string;
	
	courses_required_count: number;
	courses_satisfied_count: number;

	subreqs_required_count?: number;
	subreqs_satisfied_count?: number;

	checkbox?: boolean;
	subreqs_list: DegreeSubrequirement[];
}

// export interface DegreeRequirementTypeTwo {
// 	req_type_id: number;
// 	req_name: string;
// 	req_desc: string;

// 	checkbox_bool: boolean;
// 	user_courses_satisfying: Course[];
// }

// export type DegreeRequirement = DegreeRequirementTypeOne | DegreeRequirementTypeTwo;

export interface DegreeConfiguration {
  reqs_list: DegreeRequirement[];
}

export interface Degree {
	metadata: DegreeMetadata;
	configuration: DegreeConfiguration;
}

// \END{MAJOR MAGIC}
