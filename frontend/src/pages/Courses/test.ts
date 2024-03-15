
import { Student } from "./courses_types";

export const MockStudent: Student = {
    metadata: [
        {
            grade: "First-Year",
            calendarYear: "2022-2023",
            fall: {
                courses: [
                    { completed: true, season: "FALL", code: "DRST 001", name: "Directed Studies: Literature", evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["Hu", "WR"] }, 
                    { completed: true, season: "FALL", code: "DRST 003", name: "Directed Studies: Philosophy",  evaluation: { rating: 4.2, workload: 4.4, professor: 5}, distribution: ["Hu", "WR"] }, 
                    { completed: true, season: "FALL", code: "DRST 005", name: "Directed Studies: Historical and Political Thought",  evaluation: { rating: 4.3, workload: 3.5, professor: 5}, distribution: ["Hu", "WR"] }, 
                    { completed: true, season: "FALL", code: "CPSC 201", name: "Introduction to Computer Science",  evaluation: { rating: 3.6, workload: 3.9, professor: 5}, distribution: ["QR"] }]
            },
            spring: {
                courses: [
                    { completed: true, season: "SPRING", code: "DRST 002", name: "Directed Studies: Literature",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu", "WR"] }, 
                    { completed: true, season: "SPRING", code: "DRST 004", name: "Directed Studies: Philosophy",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu", "WR"] }, 
                    { completed: true, season: "SPRING", code: "DRST 006", name: "Directed Studies: Historical and Political Thought",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu", "WR"] },
                    { completed: true, season: "SPRING", code: "ECON 115", name: "Introductory Microeconomics",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["QR", "So"] }, 
                    { completed: true, season: "SPRING", code: "CPSC 223", name: "Data Structures and Programming Techniques",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["QR"] }]
            }
        },
        {
            grade: "Sophomore",
            calendarYear: "2023-2024",
            fall: {
                courses: [
                    { completed: true, season: "FALL", code: "CPSC 327", name: "Object Oriented Programming",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["QR"] }, 
                    { completed: true, season: "FALL", code: "HIST 277", name: "Memory and History in Modern Europe",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu", "WR"] }, 
                    { completed: true, season: "FALL", code: "E&EB 255", name: "Invertebrates",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Sc"] }, 
                    { completed: true, season: "FALL", code: "ENGL 376", name: "Theories and Histories of the Western Novel",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu", "WR"] },
                    { completed: true, season: "FALL", code: "ART 136", name: "Capturing Light: Analog 35mm Photography",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu"] }]
            },
            spring: {
                courses: [
                    { completed: true, season: "SPRING", code: "SPAN 385", name: "Cervantes y Don Quijote",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu"] }, 
                    { completed: true, season: "SPRING", code: "CPSC 323", name: "Systems Programming and Computer Architecture",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["QR"] }, 
                    { completed: true, season: "SPRING", code: "HUMS 401", name: "Proust Interpretations: Reading In Search of Lost Time",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu", "WR"] }, 
                    { completed: true, season: "SPRING", code: "HSAR 225", name: "Art in the Age of Empire, 1760-1917",  evaluation: { rating: 4.5, workload: 3.5, professor: 5}, distribution: ["Hu"] }]
            }
        }
    ]
};
