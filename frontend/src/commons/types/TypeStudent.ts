
import { StudentCourse } from "./TypeCourse";

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
	degrees: Array<string>;
	studentCourses: Array<StudentCourse>;
	language: string;
}

export const nullUser: User = {
	netID: "",
	onboard: false,
	name: "",
	degrees: [],
	studentCourses: [],
	language: ""
}

export interface AuthState {
	loggedIn: boolean;
	onboard: boolean;
}

export const nullAuthState: AuthState = {
	loggedIn: false,
	onboard: false,
}
