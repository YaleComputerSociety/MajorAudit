import { Course, StudentCourse } from "./../types/TypeCourse";
import { Student } from "./../types/TypeStudent";

const CGSC110: Course = { code: "CGSC 110", title: "Introduction to Cognitive Science", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["So"] };
const StudentCGSC110: StudentCourse = { course: CGSC110, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const LING119: Course = { code: "LING 119", title: "How to Create a Language: Constructed Language and Natural Language", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["So"] };
const StudentLING119: StudentCourse = { course: LING119, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const FILM150: Course = { code: "FILM 150", title: "Introduction to Film Studies", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu", "WR"] };
const StudentFILM150: StudentCourse = { course: FILM150, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const MUSI050: Course = { code: "MUSI 050", title: "Transformations in 20th and 21st Century Music", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: [] };
const StudentMUSI050: StudentCourse = { course: MUSI050, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const KREN110: Course = { code: "KREN 110", title: "Elementary Korean I", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["L"] };
const StudentKREN110: StudentCourse = { course: KREN110, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const CPSC223: Course = { code: "CPSC 223", title: "Data Structures and Programming Techniques", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["QR"] };
const StudentCPSC223: StudentCourse = { course: CPSC223, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };

const NSCI258: Course = { code: "NSCI 258", title: "Computational Methods in Human Neuroscience", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Sc", "QR", "So"] };
const StudentNSCI258: StudentCourse = { course: NSCI258, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };

const SOCY234: Course = { code: "SOCY 234", title: "Inequality, Economic Mobility & Public Policy", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["So"] };
const StudentSOCY234: StudentCourse = { course: SOCY234, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };

const EAST390: Course = { code: "EAST 390", title: "Atheism and Buddhism", seasons: ["FALL", "SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu"] };
const StudentEAST390: StudentCourse = { course: EAST390, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };

const KREN120: Course = { code: "KREN 120", title: "Elementary Korean II", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["L"] };
const StudentKREN120: StudentCourse = { course: KREN120, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };

const CGSC274: Course = { code: "CGSC 274", title: "Algorithms of the Mind", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Sc", "QR", "So"] };
const StudentCGSC274: StudentCourse = { course: CGSC274, enrollmentStatus: "COMPLETED", season: "FALL", year: "2023-2024" };

const LING385: Course = { code: "LING 385", title: "Topics in Computational Linguistics: Language Models and Linguistic Theory", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: [] };
const StudentLING385: StudentCourse = { course: LING385, enrollmentStatus: "COMPLETED", season: "FALL", year: "2023-2024" };

const GMAN310: Course = { code: "GMAN 310", title: "\"Sprachkrise\"—Philosophies & Language Crises", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu"] };
const StudentGMAN310: StudentCourse = { course: GMAN310, enrollmentStatus: "COMPLETED", season: "FALL", year: "2023-2024" };

const ARCH306: Course = { code: "ARCH 306", title: "Ornamenting Architecture: Cosmos, Nature, Neuroaesthetics", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu"] };
const StudentARCH306: StudentCourse = { course: ARCH306, enrollmentStatus: "COMPLETED", season: "FALL", year: "2023-2024" };

const EDST290: Course = { code: "EDST 290", title: "Leadership, Change, and Improvement in Education", seasons: ["FALL"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["So"] };
const StudentEDST290: StudentCourse = { course: EDST290, enrollmentStatus: "COMPLETED", season: "FALL", year: "2023-2024" };

const CPSC486: Course = { code: "CPSC 486", title: "Probabilistic Machine Learning", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: [] };
const StudentCPSC486: StudentCourse = { course: CPSC486, enrollmentStatus: "PROSPECTIVE", season: "SPRING", year: "2023-2024" };

const NSCI479: Course = { code: "NSCI 479", title: "Computational Basis of Seeing and Thinking", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["So"] };
const StudentNSCI479: StudentCourse = { course: NSCI479, enrollmentStatus: "PROSPECTIVE", season: "SPRING", year: "2023-2024" };

const FREN326: Course = { code: "GMAN 376", title: "Play: Theories and Practices", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu"] };
const StudentFREN326: StudentCourse = { course: FREN326, enrollmentStatus: "PROSPECTIVE", season: "SPRING", year: "2023-2024" };

const ENGL120: Course = { code: "ENGL 120", title: "Reading and Writing the Modern Essay", seasons: ["FALL", "SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu", "WR"] };
const StudentENGL120: StudentCourse = { course: ENGL120, enrollmentStatus: "PROSPECTIVE", season: "SPRING", year: "2023-2024" };

const EAST394: Course = { code: "EAST 394", title: "Buddhist Monastic Experience", seasons: ["SPRING"], evaluation: { rating: 0, workload: 0, professor: 5 }, distribution: ["Hu"] };
const StudentEAST394: StudentCourse = { course: EAST394, enrollmentStatus: "PROSPECTIVE", season: "SPRING", year: "2023-2024" };

export const MockStudent: Student = {
  metadata: [
    {
      grade: "First-Year",
      calendarYear: "2022-2023",
      fall: {
        courses: [StudentCGSC110, StudentLING119, StudentFILM150, StudentMUSI050, StudentKREN110]
      },
      spring: {
        courses: [StudentCPSC223, StudentNSCI258, StudentSOCY234, StudentEAST390, StudentKREN120]
      }
    },
    {
      grade: "Sophomore",
      calendarYear: "2023-2024",
      fall: {
        courses: [StudentCGSC274, StudentLING385, StudentGMAN310, StudentARCH306, StudentEDST290]
      },
      spring: {
        courses: [StudentCPSC486, StudentNSCI479, StudentFREN326, StudentENGL120, StudentEAST394]
      }
    },
    {
      grade: "Junior",
      calendarYear: "2024-2025",
      fall: {
        courses: []
      },
      spring: {
        courses: []
      }
    },
    {
      grade: "Senior",
      calendarYear: "2025-2026",
      fall: {
        courses: []
      },
      spring: {
        courses: []
      }
    }
  ]
};