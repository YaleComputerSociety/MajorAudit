
import { StudentCourse } from "./TypeCourse";

export interface Semester {
    courses: Array<StudentCourse>;
}
export interface Year {
    grade: "First-Year" | "Sophomore" | "Junior" | "Senior";
    calendarYear: string;
    fall : Semester;
    spring: Semester;
}

export interface Student {
    metadata: Array<Year>;
}
