
import { StudentCourse } from "../../../../types/TypeCourse";
import { User } from "../../../../types/TypeUser";

import { getCatalogCourse } from "../../../../database/Catalogs";
import { AddCourseDisplay } from "../../../../types/TypeCourse";

// export async function fetchAndCacheCourses(
//   selectedTerm: number,
//   setSearchData: Function
// ){
//   const cachedData = localStorage.getItem(`courses-${selectedTerm}`);
//   if(cachedData){
//     setSearchData(JSON.parse(cachedData));
//     console.log("Loaded From Cache");
//   }else{
//     try{
//       const data = await getCatalog(selectedTerm.toString());
//       setSearchData(data);
//       try {
//         localStorage.setItem(`courses-${selectedTerm}`, JSON.stringify(data));
//         console.log("Retrieved & Cached");
//       } catch (e: any) {
//         if (e.name === "QuotaExceededError" || e.code === 22) {
//           console.error("Quota Exceeded: ", e);
//         } else {
//           console.error("Error Unknown: ", e);
//         }
//       }
//     } catch (error) {
//       console.error("Error Retrieving: ", error);
//     }
//   }
// }

export function executeAddCourse(
  inputRef: React.RefObject<HTMLInputElement>,
  selectedTerm: number,
  props: { term: number; user: User; setUser: Function },
  setAddDisplay: Function
){
  if(inputRef.current){
    const targetCode = inputRef.current.value;
    const targetCourse = getCatalogCourse(selectedTerm, targetCode);

    if(targetCourse){
      const status = selectedTerm === props.term ? "MA_VALID" : "MA_HYPOTHETICAL";
      const newCourse: StudentCourse = { course: targetCourse, status, term: props.term };

      const updatedSemesters = props.user.FYP.studentSemesters.map((semester) => {
        if (semester.season === selectedTerm) {
          return { ...semester, studentCourses: [...semester.studentCourses, newCourse] };
        }
        return semester;
      });

			props.setUser({ ...props.user, FYP: { ...props.user.FYP, studentSemesters: updatedSemesters } });
			setAddDisplay((prevState: AddCourseDisplay) => ({ ...prevState, active: false }));

			// // const isDuplicate = props.user.FYP.studentCourses.some(
      // //   (existingCourse) =>
      // //     existingCourse.course.title === newCourse.course.title &&
      // //     existingCourse.term === newCourse.term
      // // );

      // if (false) {
      //   console.log("Duplicate");
      // } else {
      //   // xCheckMajorsAndSet(props.user, newCourse, props.setUser);
        
      // }
    }
  }
}
