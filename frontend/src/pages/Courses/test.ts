import { Student } from "./courses_types";

export const MockStudent: Student = {
    metadata: [
        {
            name: "First Year",
            calendarYear: "2022-2023",
            fall: {
                season: "fall",
                courses: [{ name: "CPSC 223", hasCompleted: "true" }, 
                          { name: "ENGL 114", hasCompleted: "true" }, 
                          { name: "BIO 101", hasCompleted: "true" }, 
                          { name: "MATH 226", hasCompleted: "true" }]
            },
            spring: {
                season: "spring",
                courses: [{ name: "CPSC 202", hasCompleted: "false" }, 
                          { name: "BIO 102", hasCompleted: "false" }, 
                          { name: "ENGL 115", hasCompleted: "false" }]
            }
        },
        {
            name: "Sophomore",
            calendarYear: "2023-2024",
            fall: {
                season: "fall",
                courses: [{ name: "CPSC 223", hasCompleted: "true" }, 
                          { name: "ENGL 114", hasCompleted: "true" }, 
                          { name: "BIO 101", hasCompleted: "true" }]
            },
            spring: {
                season: "spring",
                courses: [{ name: "CPSC 202", hasCompleted: "false" }, 
                          { name: "BIO 102", hasCompleted: "false" }, 
                          { name: "ENGL 115", hasCompleted: "false" }, 
                          { name: "ENGL 120", hasCompleted: "false" }]
            }
        },
        {
            name: "Junior",
            calendarYear: "2024-2025",
            fall: {
                season: "fall",
                courses: [{ name: "CPSC 223", hasCompleted: "true" }, 
                          { name: "ENGL 114", hasCompleted: "true" }, 
                          { name: "BIO 101", hasCompleted: "true" }]
            },
            spring: {
                season: "spring",
                courses: [{ name: "CPSC 202", hasCompleted: "false" }, 
                          { name: "BIO 102", hasCompleted: "false" }, 
                          { name: "ENGL 115", hasCompleted: "false" }]
            }
        }
    ]
};