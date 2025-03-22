
import { User, StudentCourse } from "@/types/type-user";
import { AddCourseDisplay } from "./AddCourseButton";

export function executeAddCourse(
  inputRef: React.RefObject<HTMLInputElement | null>,
	result: string,

	toTerm: number,
  fromTerm: number,

  user: User,
  setUser: (user: User) => void, 

  setAddDisplay: React.Dispatch<React.SetStateAction<AddCourseDisplay>>
) {
	if (!inputRef.current) return;

  const code = inputRef.current.value.trim().toUpperCase();
  const strFromTerm = fromTerm.toString(); // Assuming term corresponds to season_code

  // Fetch course from API
  fetch(`/api/courses/${strFromTerm}/${code}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) return; // No course found

      const newCourse = data[0];
			
			const status = fromTerm === toTerm ? "DA" : "MA";
      const newStudentCourse: StudentCourse = {
        course: newCourse,
        status,
        term: toTerm,
        result: result,
      };
      const updatedCourses = [...user.FYP.studentCourses, newStudentCourse];

      setUser({ ...user, FYP: { ...user.FYP, studentCourses: updatedCourses } });
      setAddDisplay((prevState: AddCourseDisplay) => ({ ...prevState, active: false }));
    })
    .catch((error) => console.error("Error fetching course:", error));
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
