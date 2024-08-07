
import { StudentCourse } from "./TypeCourse";

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
  
interface DegreeMetadata {
	name: string;
	degreeType: string;
	stats: DegreeMetadataStats;
	students: number;
	about: string;
	dus: DUS;
	catologLink: string;
	wesbiteLink: string;
}
  
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
  
export interface Degree {
	metadata: DegreeMetadata;
	codesCore: string[];
	codesAdded: string[];
	requirements: DegreeRequirement[];
}
  
export interface Program {
	name: string;
	abbreviation: string;
	degrees: Array<Degree>;
}
