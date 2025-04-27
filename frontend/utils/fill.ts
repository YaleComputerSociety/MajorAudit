
// import { StudentCourse } from "@/types/type-user";
// import { 
// 	Concentration,
//   // DegreeConcentration, 
//   // ProgramDict,
// 	Requirement, 
//   // ConcentrationRequirement
// } from "@/types/type-program";

// /**
//  * Main function - updates entire `progDict` by filling student courses in each concentration.
//  */
// export function fill(
//   // studentCourses: StudentCourse[], 
//   // progDict: ProgramDict, 
//   // setProgDict: Function
// ): void {
// 	return;


//   // // Create a true deep copy to avoid mutations to the original
//   // const updatedProgDict: ProgramDict = JSON.parse(JSON.stringify(progDict));

//   // // Process each program
//   // Object.keys(updatedProgDict).forEach(progKey => {
//   //   const program = updatedProgDict[progKey];
    
//   //   program.prog_degs = program.prog_degs.map(deg => {
//   //     deg.deg_concs = deg.deg_concs.map(conc => {
//   //       return processConcentration(conc, studentCourses);
//   //     });
//   //     return deg;
//   //   });
//   // });

//   // // Update state with the completely new object
//   // setProgDict(updatedProgDict);
// }

// /**
//  * Process a single concentration by handling all its requirements
//  */
// function processConcentration(
//   concentration: Concentration, 
//   studentCourses: StudentCourse[]
// ): Concentration {
//   const usedCourses = new Set<string>();
//   const requiredCourses = new Set<string>(); // Track courses explicitly required by `o`

//   // Clone to avoid mutations
//   const processedConc = JSON.parse(JSON.stringify(concentration)) as Concentration;
  
//   // Split requirements by type
//   const checkboxReqs = processedConc.requirements.filter(req => req.checkbox);
//   const nonCheckboxReqs = processedConc.requirements.filter(req => !req.checkbox);
  
//   // Process non-checkbox requirements in three passes
  
//   // ** Pass 1: Direct matches for non-checkbox `o` (Claim required courses) **
//   const updatedNonCheckboxReqs = nonCheckboxReqs.map(req => {
//     return processDirectMatches(req, studentCourses, usedCourses, requiredCourses);
//   });

//   // ** Pass 2: Non-Flex elective ranges for non-checkbox (Only assign courses NOT in requiredCourses) **
//   const updatedNonCheckboxReqs2 = updatedNonCheckboxReqs.map(req => {
//     return processElectiveRanges(req, studentCourses, usedCourses, requiredCourses, false);
//   });

//   // ** Pass 3: Flex elective ranges for non-checkbox (Only assign courses NOT in requiredCourses) **
//   const updatedNonCheckboxReqs3 = updatedNonCheckboxReqs2.map(req => {
//     return processElectiveRanges(req, studentCourses, usedCourses, requiredCourses, true);
//   });
  
//   // Process checkbox requirements
//   const updatedCheckboxReqs = checkboxReqs.map(req => {
//     return processCheckboxReq(req, studentCourses, usedCourses);
//   });
  
//   // Combine the results
//   processedConc.requirements = [...updatedNonCheckboxReqs3, ...updatedCheckboxReqs];
  
//   return processedConc;
// }

// /**
//  * **Pass 1: Fill `s` where `o` is non-null (Claim required courses first).**
//  */
// function processDirectMatches(
//   req: Requirement, 
//   studentCourses: StudentCourse[], 
//   usedCourses: Set<string>,
//   requiredCourses: Set<string>
// ): Requirement {
//   return {
//     ...req,
//     subrequirements: req.subrequirements.map(subreq => ({
//       ...subreq,
//       subreq_options: subreq.options.map(option => {
//         if (!option.option || option.satisfier) return option; // Skip null `o` or already filled `s`

//         const courseCode = option.option.codes[0];
//         const matchingStudentCourse = studentCourses.find(sc => 
//           sc.course.codes.includes(courseCode) && !usedCourses.has(courseCode)
//         );

//         // ✅ Ensure required courses are claimed FIRST before electives
//         if (matchingStudentCourse) {
//           usedCourses.add(courseCode); // Track as used
//           requiredCourses.add(courseCode); // Mark as REQUIRED
//           return { ...option, s: matchingStudentCourse };
//         }

//         return option;
//       }),
//     })),
//   };
// }

// /**
//  * **Pass 2 & 3: Fill elective ranges (Non-Flex first, then Flex).**
//  * - **Ensures required courses (`requiredCourses`) are NOT used for electives.**
//  */
// function processElectiveRanges(
//   req: Requirement, 
//   studentCourses: StudentCourse[], 
//   usedCourses: Set<string>,
//   requiredCourses: Set<string>, // 🔥 Courses reserved by direct matches
//   flex: boolean
// ): Requirement {
//   return {
//     ...req,
//     subrequirements: req.subrequirements.map(subreq => {
//       // if (subreq.subreq_flex !== flex) return subreq; // Skip subreqs that don't match the flex condition

//       return {
//         ...subreq,
//         subreq_options: subreq.options.map(option => {
//           if (option.option !== null || !option.elective_range || option.satisfier) return option; // Skip non-null `o` or already filled `s`

//           // const { dept, min, max } = option.elective_range;

//           // // ✅ Filter student courses:
//           // // - Ensure the course is not in `usedCourses`
//           // // - Ensure the course is not already **reserved by a required subreq**
//           // const availableCourses = studentCourses.filter(sc => 
//           //   !usedCourses.has(sc.course.codes[0]) &&
//           //   !requiredCourses.has(sc.course.codes[0]) && // 🔥 PROTECT REQUIRED COURSES
//           //   sc.course.codes.some(code => {
//           //     if (!code.startsWith(dept)) return false;
//           //     const courseNum = parseInt(code.replace(dept, ""), 10);
//           //     return courseNum >= min && courseNum <= max;
//           //   })
//           // );

//           // const matchingStudentCourse = availableCourses.find(sc => true); // ✅ Find first valid course

//           // if (matchingStudentCourse) {
//           //   usedCourses.add(matchingStudentCourse.course.codes[0]); // ✅ Mark as used
//           //   return { ...option, s: matchingStudentCourse };
//           // }

//           return option;
//         }),
//       };
//     }),
//   };
// }

// /**
//  * Process a checkbox requirement - allowing reuse within global pool
//  * but preventing duplicates within the checkbox requirement
//  */
// function processCheckboxReq(
//   req: Requirement,
//   studentCourses: StudentCourse[],
//   globalUsedCourses: Set<string>
// ): Requirement {
//   const usedWithinCheckboxReq = new Set<string>(); // Track courses used within this checkbox req
  
//   // ** Phase 1: Direct matches for checkbox requirements **
//   let updatedReq = {
//     ...req,
//     subreqs_list: req.subrequirements.map(subreq => ({
//       ...subreq,
//       subreq_options: subreq.options.map(option => {
//         if (!option.option || option.satisfier) return option; // Skip null `o` or already filled `s`

//         const courseCode = option.option.codes[0];
//         // For checkbox reqs, we only check if it's used within this same checkbox req
//         const matchingStudentCourse = studentCourses.find(sc => 
//           sc.course.codes.includes(courseCode) && !usedWithinCheckboxReq.has(courseCode)
//         );

//         if (matchingStudentCourse) {
//           usedWithinCheckboxReq.add(courseCode); // Track within checkbox req
//           // Don't add to globalUsedCourses - intentionally allow reuse outside this req
//           return { ...option, s: matchingStudentCourse };
//         }

//         return option;
//       }),
//     })),
//   };
  
//   // ** Phase 2: Elective ranges and null options for checkbox requirements **
//   updatedReq = {
//     ...updatedReq,
//     subreqs_list: updatedReq.subreqs_list.map(subreq => ({
//       ...subreq,
//       subreq_options: subreq.subreq_options.map(option => {
//         if (option.satisfier) return option; // Skip already filled slots
        
//         // let matchingStudentCourse: StudentCourse | undefined;
        
//         // if (option.elective_range) {
//         //   // Handle elective range
//         //   const { dept, min, max } = option.n.e;
//         //   matchingStudentCourse = studentCourses.find(sc => 
//         //     !usedWithinCheckboxReq.has(sc.course.codes[0]) && // Only check within this checkbox
//         //     sc.course.codes.some(code => {
//         //       if (!code.startsWith(dept)) return false;
//         //       const courseNum = parseInt(code.replace(dept, ""), 10);
//         //       return courseNum >= min && courseNum <= max;
//         //     })
//         //   );
//         // } else if (!option.o) {
//         //   // For null option.o, find any course not used within this checkbox req
//         //   matchingStudentCourse = studentCourses.find(sc => 
//         //     !usedWithinCheckboxReq.has(sc.course.codes[0]) // Only check within this checkbox
//         //   );
//         // }

//         // if (matchingStudentCourse) {
//         //   usedWithinCheckboxReq.add(matchingStudentCourse.course.codes[0]); // Track within checkbox
//         //   return { ...option, s: matchingStudentCourse };
//         // }

//         return option;
//       }),
//     })),
//   };

//   return updatedReq;
// }
