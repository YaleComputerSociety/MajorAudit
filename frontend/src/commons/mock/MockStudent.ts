import { Course, StudentCourse } from "./../types/TypeCourse";
import { Student } from "./../types/TypeStudent";

const CGSC110: Course = { code: "CGSC 110", title: "Introduction to Cognitive Science", seasons: ["Fall"], distribution: ["So"] };
const StudentCGSC110: StudentCourse = { course: CGSC110, status: "COMPLETE", season: "Fall", year: 2022 };

export const MockStudent: Student = {
  metadata: [
    {
      grade: 1,
      terms: ["Fall 2022", "Spring 2023"],
      fall: [StudentCGSC110],
      spring: [StudentCGSC110]
    },
    {
      grade: 2,
      terms: ["Fall 2023", "Spring 2024"],
      fall: [],
      spring: [StudentCGSC110]
    }
  ]
};