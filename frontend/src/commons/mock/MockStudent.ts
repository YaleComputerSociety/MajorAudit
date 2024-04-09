
import { Course, StudentCourse } from "./../types/TypeCourse";
import { Student } from "./../types/TypeStudent";


const DRST001: Course = { code: "DRST 001", title: "Directed Studies: Literature", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["Hu", "WR"] };
const StudentDRST001: StudentCourse = { course: DRST001, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const DRST003: Course = { code: "DRST 003", title: "Directed Studies: Philosophy", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["Hu", "WR"] };
const StudentDRST003: StudentCourse = { course: DRST003, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };


export const MockStudent: Student = {
    metadata: [
        {
            grade: "First-Year",
            calendarYear: "2022-2023",
            fall: {
                courses: [StudentDRST001, StudentDRST001, StudentDRST001, StudentDRST001]
            },
            spring: {
                courses: [StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003]
            }
        },
        {
            grade: "Sophomore",
            calendarYear: "2023-2024",
            fall: {
                courses: [StudentDRST001, StudentDRST001, StudentDRST001, StudentDRST001, StudentDRST001] 
            },
            spring: {
                courses: [StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003] 
            }
        }
        ,
        {
            grade: "Junior",
            calendarYear: "2024-2025",
            fall: {
                courses: [StudentDRST001, StudentDRST001, StudentDRST001, StudentDRST001, StudentDRST001] 
            },
            spring: {
                courses: [StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003] 
            }
        },
        {
            grade: "Senior",
            calendarYear: "2025-2026",
            fall: {
                courses: [StudentDRST001, StudentDRST001, StudentDRST001] 
            },
            spring: {
                courses: [StudentDRST003, StudentDRST003] 
            }
        }
    ]
};
