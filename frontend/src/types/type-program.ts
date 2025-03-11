
import { Course, StudentCourse } from "./type-user";

export interface StudentDegree {
	status: string; 				// DA | ADD | PIN
	programIndex: number;
	degreeIndex: number;
}

export interface ElectiveRange {
	dept: string;
	min_code: number;
	max_code: number;
}

export type SubreqElectiveRange = ElectiveRange| null;

export interface ConcentrationSubrequirement {
	subreq_name: string;
	subreq_desc: string;

	courses_required: number;
	courses_options: (Course | null)[];
	courses_elective_range: SubreqElectiveRange;
	courses_any_bool: boolean;

	student_courses_satisfying: StudentCourse[];
}

export interface ConcentrationRequirement {
	req_name: string;
	req_desc: string;
	
	courses_required_count: number;
	courses_satisfied_count: number;

	subreqs_required_count?: number;
	subreqs_satisfied_count?: number;

	checkbox?: boolean;
	subreqs_list: ConcentrationSubrequirement[];
}

export interface DegreeConcentration {
	conc_name: string;
	conc_desc: string;
  conc_reqs: ConcentrationRequirement[];
}

export interface ProgramDegree {
	deg_type: string;
	deg_concs: DegreeConcentration[];
}

interface ProgDUS {
	dus_name: string;
	dus_email: string;
	dus_address: string; 
}

interface ProgramMetadata {
	prog_name: string;
	prog_abbr: string;
	prog_stud_count: number;
	prog_dus: ProgDUS;
	prog_catolog: string;
	prog_website: string;
}

export interface Program {
	prog_data: ProgramMetadata;
	prog_degs: ProgramDegree[];
}

export interface MajorsIndex {
	prog: number;
	deg: number;
	conc: number;
}
