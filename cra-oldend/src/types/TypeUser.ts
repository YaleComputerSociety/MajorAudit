
import { StudentCourse } from "./TypeCourse";
import { DegreeConfiguration, Degree, DegreeMetadata } from "./TypeProgram";

export interface Year {
	grade: number;
	terms: number[]; // e.g. [202203, 202201]
	fall: StudentCourse[];
	spring: StudentCourse[];
}

export interface StudentDegree {
	status: string; // DA | ADD | PIN
	programIndex: number;
	degreeIndex: number;
}

export interface StudentSemester {
	season: number;
	studentCourses: StudentCourse[];
}

export interface FYP {
	languageRequirement: string;
	studentSemesters: StudentSemester[]

	degreeConfigurations: DegreeConfiguration[][];
	degreeDeclarations: StudentDegree[];
}

export interface User {
	name: string;
	netID: string;
	onboard: boolean;
	FYP: FYP;
}

export const nullUser: User = {
	netID: "",
	onboard: false,
	name: "",
	FYP: { studentSemesters: [], languageRequirement: "", degreeConfigurations: [], degreeDeclarations: []},
}

export interface AuthState {
	loggedIn: boolean;
	onboard: boolean;
}

export const nullAuthState: AuthState = {
	loggedIn: false,
	onboard: false,
}
