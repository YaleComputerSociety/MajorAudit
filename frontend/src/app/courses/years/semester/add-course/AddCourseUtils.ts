
import { User, StudentCourse } from "@/types/type-user";
import { getCatalogCourse } from "@/database/data-catalog";
import { AddCourseDisplay } from "./AddCourseButton";
import { ProgramDict } from "@/types/type-program";

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

  const updatedCourses = [...user.FYP.studentCourses, newCourse];

  setUser({ ...user, FYP: { ...user.FYP, studentCourses: updatedCourses } });
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
