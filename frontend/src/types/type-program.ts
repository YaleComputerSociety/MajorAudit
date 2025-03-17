
import { Course, StudentCourse } from "./type-user";

export interface ElectiveRange {
	dept: string;
	min: number;
	max: number;
}

interface OptionNullHelp {
	e?: ElectiveRange;
	f?: string[];
	a?: boolean;
}

export interface SubreqCourseOption { 
	o: Course | null;
	s: StudentCourse | null;
	n?: OptionNullHelp | null;
}

export interface ConcentrationSubrequirement {
	subreq_name: string;
	subreq_desc: string;

	subreq_flex: boolean;
	subreq_courses_req_count: number;
	subreq_options: SubreqCourseOption[]
}

export interface ConcentrationRequirement {
	req_name: string;
	req_desc: string;
	
	courses_required_count: number;

	subreqs_required_count?: number;
	subreqs_satisfied_count?: number;

	checkbox?: boolean;
	subreqs_list: ConcentrationSubrequirement[];
}

export interface DegreeConcentration {
	user_status: number;
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
	prog: string;
	deg: number;
	conc: number;
}

export type ProgramDict = Record<string, Program>;
