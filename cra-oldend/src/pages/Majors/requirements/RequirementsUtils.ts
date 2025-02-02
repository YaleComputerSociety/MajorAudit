
// // RequirementsUtils.ts

import { User } from "../../../types/TypeUser";
// import { Degree } from "../../../commons/types/TypeProgram";
// import { StudentCourse } from "../../../commons/types/TypeCourse";

// export const addCourseToSubsection = (
//   course: StudentCourse,
//   reqIndex: number,
//   subIndex: number,
//   degree: Degree,
//   user: User,
//   setUser: Function
// ) => {
//   const newRequirements = [...degree.requirements];
//   newRequirements[reqIndex].subsections[subIndex].courses.push(course);

//   // Add the course codes to degree.codesAdded
//   const newCodesAdded = new Set(degree.codesAdded);
//   course.course.codes.forEach((code) => newCodesAdded.add(code));

//   // Find the program that contains the degree to be updated
//   const updatedPrograms = user.programs.map((program) => {
//     const updatedDegrees = program.degrees.map((deg) => {
//       if (deg.metadata === degree.metadata) {
//         return {
//           ...deg,
//           requirements: newRequirements,
//           codesAdded: Array.from(newCodesAdded),
//         };
//       }
//       return deg;
//     });
//     return { ...program, degrees: updatedDegrees };
//   });

//   const updatedUser = {
//     ...user,
//     programs: updatedPrograms,
//   };

//   setUser(updatedUser);
// };

// export const removeCourseFromSubsection = (
//   studentCourse: StudentCourse,
//   reqIndex: number,
//   subIndex: number,
//   degree: Degree,
//   user: User,
//   setUser: Function
// ) => {

//   let newRequirements = [...degree.requirements];
//   const courseCodes = studentCourse.course?.codes ?? [];

//   const isCoreCode = courseCodes.some((code) => degree.codesCore.includes(code));
//   const isAddedCode = courseCodes.some((code) => degree.codesAdded.includes(code));

//   if (newRequirements[reqIndex]?.subsections?.[subIndex]) {
//     let updatedDegree = { ...degree };

//     if (isCoreCode) {
//       // Change the status to 'HIDDEN'
//       const updatedCourses = newRequirements[reqIndex].subsections[subIndex].courses.map((c: StudentCourse) => {
//         if (c.course?.title === studentCourse.course?.title) {
//           return { ...c, status: "HIDDEN" };
//         }
//         return c;
//       });
//       newRequirements[reqIndex].subsections[subIndex].courses = updatedCourses;
//     } else if (isAddedCode) {
//       // Remove matching codes from codesAdded
//       const newCodesAdded = degree.codesAdded.filter((code) => !courseCodes.includes(code));

//       // Remove the course with the matching title from all subsections
//       newRequirements = newRequirements.map((req) => {
//         const updatedSubsections = req.subsections.map((sub) => {
//           const filteredCourses = sub.courses.filter((c) => c.course?.title !== studentCourse.course?.title);
//           return { ...sub, courses: filteredCourses };
//         });
//         return { ...req, subsections: updatedSubsections };
//       });

//       // Update degree codesAdded
//       updatedDegree = {
//         ...updatedDegree,
//         codesAdded: newCodesAdded,
//       };
//     }

//     // Always update requirements
//     updatedDegree = {
//       ...updatedDegree,
//       requirements: newRequirements,
//     };

//     // Find the program that contains the degree to be updated
//     const updatedPrograms = user.programs.map((program) => {
//       const updatedDegrees = program.degrees.map((deg) => {
//         if (deg.metadata === degree.metadata) {
//           return updatedDegree;
//         }
//         return deg;
//       });
//       return { ...program, degrees: updatedDegrees };
//     });

//     const updatedUser = {
//       ...user,
//       programs: updatedPrograms,
//     };

//     setUser(updatedUser);
//   } else {
//     console.error("Invalid reqIndex or subIndex:", reqIndex, subIndex);
//   }

//   console.log("Updated codesAdded:", degree.codesAdded);
// };


// export const resetDegree = (degree: Degree, user: User, setUser: Function) => {
//   const newRequirements = degree.requirements.map((req) => {
//     const updatedSubsections = req.subsections.map((sub) => {
//       const updatedCourses = sub.courses.reduce((acc: StudentCourse[], course: StudentCourse) => {
//         const courseCodes = course.course.codes;

//         const isCoreCode = courseCodes.some(code => degree.codesCore.includes(code));
//         const isAddedCode = courseCodes.some(code => degree.codesAdded.includes(code));

//         if (isCoreCode && course.status === 'HIDDEN') {
//           const matchingStudentCourse = user.studentCourses.find(sc => sc.course.title === course.course.title);
//           if (matchingStudentCourse) {
//             acc.push({ ...course, status: matchingStudentCourse.status });
//           } else {
//             acc.push({ ...course, status: 'NA' });
//           }
//         } else if (!isAddedCode) {
//           acc.push(course);
//         }

//         return acc;
//       }, []);

//       return { ...sub, courses: updatedCourses };
//     });

//     return { ...req, subsections: updatedSubsections };
//   });

//   const newCodesAdded = degree.codesAdded.filter(code => {
//     return !newRequirements.some(req => 
//       req.subsections.some(sub => 
//         sub.courses.some(course => 
//           course.course.codes.includes(code)
//         )
//       )
//     );
//   });

//   const updatedPrograms = user.programs.map((program) => {
//     const updatedDegrees = program.degrees.map((deg) => {
//       if (deg.metadata === degree.metadata) {
//         return {
//           ...deg,
//           requirements: newRequirements,
//           codesAdded: newCodesAdded,
//         };
//       }
//       return deg;
//     });
//     return { ...program, degrees: updatedDegrees };
//   });

//   const updatedUser = {
//     ...user,
//     programs: updatedPrograms,
//   };

//   setUser(updatedUser);
// };
