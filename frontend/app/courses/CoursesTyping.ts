
import { StudentCourse } from "@/types/user";

export interface StudentSemester {
	term: string;
	studentCourses: StudentCourse[];
}

export interface StudentYear {
	grade: string; 
	studentSemesters: StudentSemester[];
}
