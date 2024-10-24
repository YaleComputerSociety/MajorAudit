
import { StudentCourse } from "../../../../../commons/types/TypeCourse";
import { User } from "../../../../../commons/types/TypeUser";
import { xCheckMajorsAndSet } from "./../../../CoursesUtils";
import { getCatalog } from "../../../../../api/api";
import { AddCourseDisplay } from "../../../../../commons/types/TypeCourse";

export async function fetchAndCacheCourses(
  selectedTerm: number,
  setSearchData: Function
) {
  const cachedData = localStorage.getItem(`courses-${selectedTerm}`);
  if(cachedData){
    setSearchData(JSON.parse(cachedData));
    console.log("Loaded From Cache");
  }else{
    try{
      const data = await getCatalog(selectedTerm.toString());
      setSearchData(data);
      try {
        localStorage.setItem(`courses-${selectedTerm}`, JSON.stringify(data));
        console.log("Retrieved & Cached");
      } catch (e: any) {
        if (e.name === "QuotaExceededError" || e.code === 22) {
          console.error("Quota Exceeded: ", e);
        } else {
          console.error("Error Unknown: ", e);
        }
      }
    } catch (error) {
      console.error("Error Retrieving: ", error);
    }
  }
}

export function handleAddCourse(
  inputRef: React.RefObject<HTMLInputElement>,
  searchData: any[],
  selectedTerm: number,
  props: { term: number; user: User; setUser: Function },
  setAddDisplay: Function
){
  if(inputRef.current){
    const targetCode = inputRef.current.value;
    const targetCourse = searchData.find((fireCourse) => fireCourse["c"].includes(targetCode));

    if(targetCourse){
      const codes = targetCourse["c"];
      const title = targetCourse["t"];
      const credit = targetCourse["r"];
      const dist = targetCourse["d"];
      const seasons = ["Fall", "Spring"];
      
			const course = { codes, title, credit, dist, seasons };
      const status = selectedTerm === props.term ? "MA_VALID" : "MA_HYPOTHETICAL";
      const term = props.term;
      const newCourse: StudentCourse = { course, status, term };

      const isDuplicate = props.user.FYP.studentCourses.some(
        (existingCourse) =>
          existingCourse.course.title === newCourse.course.title &&
          existingCourse.term === newCourse.term
      );

      if (isDuplicate) {
        console.log("Duplicate");
      } else {
        xCheckMajorsAndSet(props.user, newCourse, props.setUser);
        setAddDisplay((prevState: AddCourseDisplay) => ({
					...prevState,
					active: false,
				}));
      }
    }
  }
}

