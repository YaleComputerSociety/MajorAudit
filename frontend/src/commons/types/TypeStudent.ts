
import { StudentCourse } from "./TypeCourse";

export interface Year {
	grade: number;
	terms: Array<number>; // e.g. [202203, 202201]
	fall: Array<StudentCourse>;
	spring: Array<StudentCourse>;
}

export interface Student {
  metadata: Array<Year>;
}
