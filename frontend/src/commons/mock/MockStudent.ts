
import { Course, StudentCourse } from "./../types/TypeCourse";
import { Student } from "./../types/TypeStudent";


const ENGL253: Course = { code: "ENGL 253", title: "Reading Ulysses: Modernist Classic and Postcolonial Epic", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu"] };
const StudentENGL253: StudentCourse = { course: ENGL253, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const ENGL419: Course = { code: "ENGL 419", title: "Writing about Contemporary Figurative Art", seasons: ["FALL"], evaluation: { rating: 4.8, workload: 4.5, professor: 5 }, distribution: ["WR", "Hu"] };
const StudentENGL419: StudentCourse = { course: ENGL419, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const GMAN233: Course = { code: "GMAN 233", title: "Karl Marx's Capital", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu"] };
const StudentGMAN233: StudentCourse = { course: GMAN233, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const SDS238: Course = { code: "S&DS 238", title: "Probability and Bayesian Statistics", seasons: ["FALL"], evaluation: { rating: 3.8, workload: 4.0, professor: 5 }, distribution: ["QR"] };
const StudentSDS238: StudentCourse = { course: SDS238, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const PLSC204: Course = { code: "PLSC 204", title: "Election Fundamentals and Forecasting", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["So"] };
const StudentPLSC204: StudentCourse = { course: PLSC204, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const DRST003: Course = { code: "DRST 003", title: "Directed Studies: Philosophy", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["Hu", "WR"] };
const StudentDRST003: StudentCourse = { course: DRST003, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };


export const MockStudent: Student = {
    metadata: [
        {
            grade: "First-Year",
            calendarYear: "2022-2023",
            fall: {
                courses: [StudentENGL419]
            },
            spring: {
                courses: [StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003]
            }
        },
        {
            grade: "Sophomore",
            calendarYear: "2023-2024",
            fall: {
                courses: [StudentENGL419] 
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
                courses: [StudentENGL253, StudentENGL419, StudentGMAN233, StudentSDS238, StudentPLSC204] 
            },
            spring: {
                courses: [StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003, StudentDRST003] 
            }
        },
        {
            grade: "Senior",
            calendarYear: "2025-2026",
            fall: {
                courses: [StudentENGL419] 
            },
            spring: {
                courses: [StudentDRST003, StudentDRST003] 
            }
        }
    ]
};
