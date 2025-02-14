
import { StudentCourse } from "./type-user";

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

interface DegreeRequirementsSubsection {
	name?: string;
	description?: string;
	flexible: boolean;
	courses: StudentCourse[];
}

interface DegreeRequirement {
	name: string;
	description?: string;
	subsections: DegreeRequirementsSubsection[];
}

export interface DegreeConfiguration {
	degreeRequirements: DegreeRequirement[];
}

export interface Degree {
	metadata: DegreeMetadata;
	configuration: DegreeConfiguration;
}

// \END{MAJOR MAGIC}







export interface StudentDegree {
	status: string; // DA | ADD | PIN
	programIndex: number;
	degreeIndex: number;
}
