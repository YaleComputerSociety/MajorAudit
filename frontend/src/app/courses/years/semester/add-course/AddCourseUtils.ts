
import { User, StudentCourse } from "@/types/type-user";
import { getCatalogCourse } from "@/database/data-catalog";
import { AddCourseDisplay } from "./AddCourseButton";
import { usePrograms } from "@/context/ProgramProvider";
import { ConcentrationSubrequirement, DegreeConcentration, ProgramDegree, ProgramDict } from "@/types/type-program";

// TODO:
// Two tasks. 
// (1) Iterate through the entire progDict. If the new StudentCourse's course attribute
// corresponds to a course in a subreqs course_options array, add the StudentCourse
// to the user_courses_satisfying array. 
// (2) Iterate through all studentconcs in user.FYP.decl list, updating their
// user_conc DegreeConcentrations in the same way. 

export function executeAddCourse(
  term: number,
  user: User,
  setUser: Function, 
	progDict: ProgramDict,
	setProgDict: Function,
  inputRef: React.RefObject<HTMLInputElement | null>,
  selectedTerm: number,
  selectedResult: string,
  setAddDisplay: Function
){
  if (!inputRef.current) return;

  const targetCode = inputRef.current.value.trim().toUpperCase();
  const targetCourse = getCatalogCourse(selectedTerm, targetCode);

  if (!targetCourse) return;

  const status = selectedTerm === term ? "DA" : "MA";
  const newCourse: StudentCourse = { course: targetCourse, status, term, result: selectedResult };

  // ✅ Step 1: Update `user.FYP.studentCourses`
  const updatedCourses = [...user.FYP.studentCourses, newCourse];

  // ✅ Step 2: Function to update `student_courses_satisfying` in a given subreq
  function updateSubreqCourses(subreq: ConcentrationSubrequirement) {
    // Check if the course is in `courses_options` and if it's not already in `student_courses_satisfying`
    if (subreq.courses_options.some((c) => c?.codes.includes(targetCode)) &&
        !subreq.student_courses_satisfying.some((sc) => sc.course.codes.includes(targetCode))) {
      return {
        ...subreq,
        student_courses_satisfying: [...subreq.student_courses_satisfying, newCourse]
      };
    }
    return subreq;
  }

  // ✅ Step 3: Iterate through `user.FYP.decl_list` (Pinned Concentrations)
  const updatedDeclList = user.FYP.decl_list.map((studentConc) => {
    return {
      ...studentConc,
      user_conc: {
        ...studentConc.user_conc,
        conc_reqs: studentConc.user_conc.conc_reqs.map((req) => ({
          ...req,
          subreqs_list: req.subreqs_list.map(updateSubreqCourses)
        }))
      }
    };
  });

  // ✅ Step 4: Iterate through `progDict` to update **ALL** programs
  const updatedProgDict = { ...progDict };

  Object.keys(updatedProgDict).forEach((progKey) => {
    updatedProgDict[progKey].prog_degs = updatedProgDict[progKey].prog_degs.map((deg: ProgramDegree) => ({
      ...deg,
      deg_concs: deg.deg_concs.map((conc: DegreeConcentration) => ({
        ...conc,
        conc_reqs: conc.conc_reqs.map((req) => ({
          ...req,
          subreqs_list: req.subreqs_list.map(updateSubreqCourses)
        }))
      }))
    }));
  });

  // ✅ Step 5: Update State
  setUser({
    ...user,
    FYP: {
      ...user.FYP,
      studentCourses: updatedCourses,
      decl_list: updatedDeclList
    }
  });

  setProgDict(updatedProgDict);

  // ✅ Step 6: Close Input Box
  setAddDisplay((prevState: AddCourseDisplay) => ({ ...prevState, active: false }));
}






// export async function fetchAndCacheCourses(
//   selectedTerm: number,
//   setSearchData: Function
// ){
//   const cachedData = localStorage.getItem(`courses-${selectedTerm}`);
//   if(cachedData){
//     setSearchData(JSON.parse(cachedData));
//     console.log("Loaded From Cache");
//   }else{
//     // try{
//     //   const data = await getCatalog(selectedTerm.toString());
//     //   setSearchData(data);
//     //   try {
//     //     localStorage.setItem(`courses-${selectedTerm}`, JSON.stringify(data));
//     //     console.log("Retrieved & Cached");
//     //   } catch (e: any) {
//     //     if (e.name === "QuotaExceededError" || e.code === 22) {
//     //       console.error("Quota Exceeded: ", e);
//     //     } else {
//     //       console.error("Error Unknown: ", e);
//     //     }
//     //   }
//     // } catch (error) {
//     //   console.error("Error Retrieving: ", error);
//     // }
//   }
// }
