
import { StudentCourse } from "./TypeCourse";

export interface Year {
    grade: number;
    terms: Array<string>; // e.g. ["Fall 2022", "Spring 2023"]
    fall: Array<StudentCourse>;
    spring: Array<StudentCourse>;
}

export interface Student {
    metadata: Array<Year>;
}
