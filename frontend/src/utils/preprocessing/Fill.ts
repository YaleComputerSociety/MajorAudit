
import { StudentCourse } from "@/types/type-user";
import { 
  DegreeConcentration, 
  ProgramDict, 
  ConcentrationRequirement
} from "@/types/type-program";

/**
 * Main function - updates entire `progDict` by filling student courses in each concentration.
 */
export function fill(
  studentCourses: StudentCourse[], 
  progDict: ProgramDict, 
  setProgDict: Function
): void {
  // Create a true deep copy to avoid mutations to the original
  const updatedProgDict: ProgramDict = JSON.parse(JSON.stringify(progDict));

  // Process each program
  Object.keys(updatedProgDict).forEach(progKey => {
    const program = updatedProgDict[progKey];
    
    program.prog_degs = program.prog_degs.map(deg => {
      deg.deg_concs = deg.deg_concs.map(conc => {
        return processConcentration(conc, studentCourses);
      });
      return deg;
    });
  });

  // Update state with the completely new object
  setProgDict(updatedProgDict);
}

/**
 * Process a single concentration by handling all its requirements
 */
function processConcentration(
  concentration: DegreeConcentration, 
  studentCourses: StudentCourse[]
): DegreeConcentration {
  const usedCourses = new Set<string>();
  const requiredCourses = new Set<string>(); // Track courses explicitly required by `o`

  // Clone to avoid mutations
  const processedConc = JSON.parse(JSON.stringify(concentration)) as DegreeConcentration;
  
  // ** Pass 1: Direct matches for `o` (Claim required courses) **
  processedConc.conc_reqs = processedConc.conc_reqs.map(req => {
    const updatedReq = processDirectMatches(req, studentCourses, usedCourses, requiredCourses);
    return updatedReq;
  });

  // ** Pass 2: Non-Flex elective ranges (Only assign courses NOT in requiredCourses) **
  processedConc.conc_reqs = processedConc.conc_reqs.map(req => {
    return processElectiveRanges(req, studentCourses, usedCourses, requiredCourses, false);
  });

  // ** Pass 3: Flex elective ranges (Only assign courses NOT in requiredCourses) **
  processedConc.conc_reqs = processedConc.conc_reqs.map(req => {
    return processElectiveRanges(req, studentCourses, usedCourses, requiredCourses, true);
  });

  return processedConc;
}

/**
 * **Pass 1: Fill `s` where `o` is non-null (Claim required courses first).**
 */
function processDirectMatches(
  req: ConcentrationRequirement, 
  studentCourses: StudentCourse[], 
  usedCourses: Set<string>,
  requiredCourses: Set<string>
): ConcentrationRequirement {
  return {
    ...req,
    subreqs_list: req.subreqs_list.map(subreq => ({
      ...subreq,
      subreq_options: subreq.subreq_options.map(option => {
        if (!option.o || option.s) return option; // Skip null `o` or already filled `s`

        const courseCode = option.o.codes[0];
        const matchingStudentCourse = studentCourses.find(sc => 
          sc.course.codes.includes(courseCode) && !usedCourses.has(courseCode)
        );

        // ✅ Ensure required courses are claimed FIRST before electives
        if (matchingStudentCourse) {
          usedCourses.add(courseCode); // Track as used
          requiredCourses.add(courseCode); // Mark as REQUIRED
          return { ...option, s: matchingStudentCourse };
        }

        return option;
      }),
    })),
  };
}

/**
 * **Pass 2 & 3: Fill elective ranges (Non-Flex first, then Flex).**
 * - **Ensures required courses (`requiredCourses`) are NOT used for electives.**
 */
function processElectiveRanges(
  req: ConcentrationRequirement, 
  studentCourses: StudentCourse[], 
  usedCourses: Set<string>,
  requiredCourses: Set<string>, // 🔥 Courses reserved by direct matches
  flex: boolean
): ConcentrationRequirement {
  return {
    ...req,
    subreqs_list: req.subreqs_list.map(subreq => {
      if (subreq.subreq_flex !== flex) return subreq; // Skip subreqs that don't match the flex condition

      return {
        ...subreq,
        subreq_options: subreq.subreq_options.map(option => {
          if (option.o !== null || !option.n?.e || option.s) return option; // Skip non-null `o` or already filled `s`

          const { dept, min, max } = option.n.e;

          // ✅ Filter student courses:
          // - Ensure the course is not in `usedCourses`
          // - Ensure the course is not already **reserved by a required subreq**
          const availableCourses = studentCourses.filter(sc => 
            !usedCourses.has(sc.course.codes[0]) &&
            !requiredCourses.has(sc.course.codes[0]) && // 🔥 PROTECT REQUIRED COURSES
            sc.course.codes.some(code => {
              if (!code.startsWith(dept)) return false;
              const courseNum = parseInt(code.replace(dept, ""), 10);
              return courseNum >= min && courseNum <= max;
            })
          );

          const matchingStudentCourse = availableCourses.find(sc => true); // ✅ Find first valid course

          if (matchingStudentCourse) {
            usedCourses.add(matchingStudentCourse.course.codes[0]); // ✅ Mark as used
            return { ...option, s: matchingStudentCourse };
          }

          return option;
        }),
      };
    }),
  };
}
