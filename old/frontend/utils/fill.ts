

function parseElectiveRange(range: string): { dept: string; min: number; max: number } | null {
  const parts = range.split("-");
  if (parts.length !== 3) return null;

  const [dept, minStr, maxStr] = parts;
  const min = parseInt(minStr, 10);
  const max = parseInt(maxStr, 10);

  if (isNaN(min) || isNaN(max)) return null;

  return { dept, min, max };
}

function extractDeptAndNumber(code: string): { dept: string; num: number } | null {
  // First, split by space
  const parts = code.split(" ");
  if (parts.length !== 2) return null;

  const dept = parts[0];
  const numberPart = parts[1];

  // Try to extract leading number only
  const numberMatch = numberPart.match(/^(\d{3,4})/);
  if (!numberMatch) return null;

  const num = parseInt(numberMatch[1], 10);

  if (isNaN(num)) return null;

  return { dept, num };
}


import { ProgramDict, Concentration, Requirement, Subrequirement, Option } from "@/types/program";
import { StudentCourse } from "@/types/user";

export function fill(
  studentCourses: StudentCourse[], 
  progDict: ProgramDict, 
  setProgDict: (progDict: ProgramDict) => void
): void {
  const updatedProgDict: ProgramDict = JSON.parse(JSON.stringify(progDict));

  Object.keys(updatedProgDict).forEach(progKey => {
    const program = updatedProgDict[progKey];

    program.degrees = program.degrees.map(degree => {
      degree.concentrations = degree.concentrations.map(concentration => {
        return processConcentration(concentration, studentCourses);
      });
      return degree;
    });
  });

  setProgDict(updatedProgDict);
}

function processConcentration(
  concentration: Concentration, 
  studentCourses: StudentCourse[]
): Concentration {
  const usedCourses = new Set<string>();
  const requiredCourses = new Set<string>();

  const processedConc = JSON.parse(JSON.stringify(concentration)) as Concentration;

  const checkboxReqs = processedConc.requirements.filter(req => req.checkbox);
  const nonCheckboxReqs = processedConc.requirements.filter(req => !req.checkbox);

  const updatedNonCheckboxReqs = nonCheckboxReqs
    .map(req => processDirectMatches(req, studentCourses, usedCourses, requiredCourses))
    .map(req => processElectiveRanges(req, studentCourses, usedCourses, requiredCourses, false))
    .map(req => processElectiveRanges(req, studentCourses, usedCourses, requiredCourses, true));

  const updatedCheckboxReqs = checkboxReqs.map(req => 
    processCheckboxReq(req, studentCourses, usedCourses)
  );

  processedConc.requirements = [...updatedNonCheckboxReqs, ...updatedCheckboxReqs];

  return processedConc;
}

function processDirectMatches(
  req: Requirement, 
  studentCourses: StudentCourse[], 
  usedCourses: Set<string>,
  requiredCourses: Set<string>
): Requirement {
  return {
    ...req,
    subrequirements: req.subrequirements.map(subreq => ({
      ...subreq,
      options: subreq.options.map(option => {
        if (!option.option || option.satisfier) return option;

        const targetUid = option.option.universal_course_id;
        if (!targetUid) return option;

        const matchingStudent = studentCourses.find(sc => {
          const course = sc.courseOffering?.abstractCourse;
          if (!course) return false; // ✅ Only match real populated courseOfferings
          return course.universal_course_id === targetUid && !usedCourses.has(targetUid);
        });

        if (matchingStudent) {
          usedCourses.add(targetUid);
          requiredCourses.add(targetUid);
          return { ...option, satisfier: matchingStudent };
        }

        return option;
      }),
    })),
  };
}


function processElectiveRanges(
  req: Requirement, 
  studentCourses: StudentCourse[], 
  usedCourses: Set<string>,
  requiredCourses: Set<string>,
  flex: boolean
): Requirement {
  return {
    ...req,
    subrequirements: req.subrequirements.map(subreq => ({
      ...subreq,
      options: subreq.options.map(option => {
        if (option.option || !option.elective_range || option.satisfier) return option;

        const range = parseElectiveRange(option.elective_range);
        if (!range) return option;

        const { dept, min, max } = range;

        const matchingStudent = studentCourses.find(sc => {
          const course = sc.courseOffering?.abstractCourse;
          if (!course) return false;
          
          return course.codes.some(code => {
            const parsed = extractDeptAndNumber(code);
            if (!parsed) return false;
            const { dept: codeDept, num } = parsed;
            return codeDept === dept && num >= min && num <= max && 
              !usedCourses.has(course.universal_course_id ?? "");
          });
        });

        if (matchingStudent) {
          const uid = matchingStudent.courseOffering?.abstractCourse.universal_course_id;
          if (uid) usedCourses.add(uid);
          return { ...option, satisfier: matchingStudent };
        }

        return option;
      }),
    })),
  };
}

function processCheckboxReq(
  req: Requirement, 
  studentCourses: StudentCourse[], 
  globalUsedCourses: Set<string>
): Requirement {
  const usedInCheckbox = new Set<string>();

  return {
    ...req,
    subrequirements: req.subrequirements.map(subreq => ({
      ...subreq,
      options: subreq.options.map(option => {
        if (option.satisfier) return option;

        if (option.option) {
          const targetUid = option.option.universal_course_id;
          if (!targetUid) return option;

          const matchingStudent = studentCourses.find(sc => {
            const course = sc.courseOffering?.abstractCourse;
            return course && course.universal_course_id === targetUid && !usedInCheckbox.has(targetUid);
          });

          if (matchingStudent) {
            usedInCheckbox.add(targetUid);
            return { ...option, satisfier: matchingStudent };
          }
        } else if (option.elective_range) {
          const range = parseElectiveRange(option.elective_range);
          if (!range) return option;

          const { dept, min, max } = range;

          const matchingStudent = studentCourses.find(sc => {
            const course = sc.courseOffering?.abstractCourse;
            if (!course) return false;

            return course.codes.some(code => {
              const parsed = extractDeptAndNumber(code);
              if (!parsed) return false;
              const { dept: codeDept, num } = parsed;
              return codeDept === dept && num >= min && num <= max && 
                !usedInCheckbox.has(course.universal_course_id ?? "");
            });
          });

          if (matchingStudent) {
            const uid = matchingStudent.courseOffering?.abstractCourse.universal_course_id;
            if (uid) usedInCheckbox.add(uid);
            return { ...option, satisfier: matchingStudent };
          }
        }

        return option;
      }),
    })),
  };
}


