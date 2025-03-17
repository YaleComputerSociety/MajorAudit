
import { StudentCourse } from "@/types/type-user";
import { ConcentrationSubrequirement, DegreeConcentration, ProgramDict } from "@/types/type-program";

/**
 * First Pass: Fills `s` in options where `o` is non-null for non-checkbox requirements.
 */
function fillDirectMatches(
  concentration: DegreeConcentration, 
  studentCourses: StudentCourse[], 
  usedCourses: Set<string>
): DegreeConcentration {
  return {
    ...concentration,
    conc_reqs: concentration.conc_reqs.map(req => {
      if (req.checkbox) return req;

      return {
        ...req,
        subreqs_list: req.subreqs_list.map(subreq => ({
          ...subreq,
          subreq_options: subreq.subreq_options.map(option => {
            if (!option.o || option.s) return option; // Skip null `o` or already filled `s`

            const matchingStudentCourse = studentCourses.find(sc => 
              sc.course.codes.includes(option.o!.codes[0]) && !usedCourses.has(sc.course.codes[0])
            );

            if (matchingStudentCourse) {
              usedCourses.add(matchingStudentCourse.course.codes[0]); // Track usage
              return { ...option, s: matchingStudentCourse };
            }

            return option;
          }),
        })),
      };
    }),
  };
}

/**
 * Second Pass: Fills `s` using elective ranges in non-checkbox requirements.
 * Iterates through non-flex subreqs first, then flex.
 */
function fillElectiveRanges(
  concentration: DegreeConcentration, 
  studentCourses: StudentCourse[], 
  usedCourses: Set<string>
): DegreeConcentration {
  return {
    ...concentration,
    conc_reqs: concentration.conc_reqs.map(req => {
      if (req.checkbox) return req; // Skip checkbox reqs

      // First Pass: Fill non-flex subreqs, skipping flex ones
      let updatedSubreqs = req.subreqs_list.map(subreq => {
        if (subreq.subreq_flex) return subreq; // Skip flex subreqs in first pass
        return fillSubreqElectives(subreq, studentCourses, usedCourses);
      });

      // Second Pass: Fill flex subreqs, keeping previous updates
      updatedSubreqs = updatedSubreqs.map(subreq => {
        if (!subreq.subreq_flex) return subreq; // Skip non-flex subreqs in second pass
        return fillSubreqElectives(subreq, studentCourses, usedCourses);
      });

      return { ...req, subreqs_list: updatedSubreqs };
    }),
  };
}

/**
 * Helper function to fill elective ranges in a subreq.
 */
function fillSubreqElectives(
  subreq: ConcentrationSubrequirement, 
  studentCourses: StudentCourse[], 
  usedCourses: Set<string>
): ConcentrationSubrequirement {
  return {
    ...subreq,
    subreq_options: subreq.subreq_options.map(option => {
      if (option.o !== null || !option.n?.e || option.s) return option; // Skip already filled slots

      const { dept, min, max } = option.n.e;
      const matchingStudentCourse = studentCourses.find(sc => 
        sc.course.codes.some(code =>
          code.startsWith(dept) &&
          parseInt(code.replace(dept, ""), 10) >= min &&
          parseInt(code.replace(dept, ""), 10) <= max &&
          !usedCourses.has(sc.course.codes[0]) // Ensure it's not used
        )
      );

      if (matchingStudentCourse) {
        usedCourses.add(matchingStudentCourse.course.codes[0]); // Track usage
        return { ...option, s: matchingStudentCourse };
      }

      return option;
    }),
  };
}

/**
 * Third Pass: Fills `s` in checkbox requirements, allowing reuse but preventing duplicates within the req.
 */
function fillCheckboxReqs(
  concentration: DegreeConcentration, 
  studentCourses: StudentCourse[]
): DegreeConcentration {
  return {
    ...concentration,
    conc_reqs: concentration.conc_reqs.map(req => {
      if (!req.checkbox) return req; // Skip non-checkbox reqs

      const usedWithinCheckboxReq = new Set<string>(); // Reset per checkbox req

      return {
        ...req,
        subreqs_list: req.subreqs_list.map(subreq => ({
          ...subreq,
          subreq_options: subreq.subreq_options.map(option => {
            if (option.s) return option; // If already filled, keep it

            const matchingStudentCourse = studentCourses.find(sc => 
              (!option.o || sc.course.codes.includes(option.o.codes[0])) && 
              (!usedWithinCheckboxReq.has(sc.course.codes[0])) // Ensure unique within the req
            );

            if (matchingStudentCourse) {
              usedWithinCheckboxReq.add(matchingStudentCourse.course.codes[0]); // Track within checkbox req
              return { ...option, s: matchingStudentCourse };
            }

            return option;
          }),
        })),
      };
    }),
  };
}

/**
 * Fills student courses for a given concentration by running the three passes.
 */
function fillStudentCourses(
  concentration: DegreeConcentration, 
  studentCourses: StudentCourse[]
): DegreeConcentration {
  const usedCourses = new Set<string>(); // Tracks courses used in non-checkbox reqs

  // Apply filling in three passes
  let updatedConcentration = fillDirectMatches(concentration, studentCourses, usedCourses);
  updatedConcentration = fillElectiveRanges(updatedConcentration, studentCourses, usedCourses);
  updatedConcentration = fillCheckboxReqs(updatedConcentration, studentCourses);

  return updatedConcentration;
}

/**
 * Main function - updates entire `progDict` by filling student courses in each concentration.
 */
export function fill(
  studentCourses: StudentCourse[], 
  progDict: ProgramDict, 
  setProgDict: Function
) {
  const updatedProgDict = { ...progDict };

  Object.keys(updatedProgDict).forEach(progKey => {
    updatedProgDict[progKey].prog_degs = updatedProgDict[progKey].prog_degs.map(deg => ({
      ...deg,
      deg_concs: deg.deg_concs.map(conc => fillStudentCourses(conc, studentCourses)),
    }));
  });

  setProgDict(updatedProgDict);
}
