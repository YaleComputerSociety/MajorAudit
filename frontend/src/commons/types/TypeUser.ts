
import { StudentCourse } from "./TypeCourse";
import { Program } from "./TypeProgram";

export interface Year {
	grade: number;
	terms: Array<number>; // e.g. [202203, 202201]
	fall: Array<StudentCourse>;
	spring: Array<StudentCourse>;
}

export interface User {
	netID: string;
	onboard: boolean;
	name: string;
	degrees: string[];
	studentCourses: StudentCourse[];
	programs: Program[];
	language: string;
}

export const nullUser: User = {
	netID: "",
	onboard: false,
	name: "",
	degrees: [],
	studentCourses: [],
	programs: [],
	language: "",
}

export interface AuthState {
	loggedIn: boolean;
	onboard: boolean;
}

export const nullAuthState: AuthState = {
	loggedIn: false,
	onboard: false,
}
