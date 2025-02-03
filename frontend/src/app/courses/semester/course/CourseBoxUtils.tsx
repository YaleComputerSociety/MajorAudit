
import Style from "./CourseBox.module.css"
import Image from "next/image";

import { StudentCourse, User } from "@/types/type-user";

function RemoveCourse(props: { studentCourse: StudentCourse; user: User; setUser: Function }) 
{
  const remove = () => {
    const updatedStudentSemesters = props.user.FYP.studentSemesters.map((semester) => {
      if(semester.season === props.studentCourse.term){
        return{
          ...semester,
          studentCourses: semester.studentCourses.filter(
            (studentCourse) =>
              studentCourse.course.title !== props.studentCourse.course.title
          ),
        };
      }
      return semester;
    });

    const updatedUser = { ...props.user, FYP: { ...props.user.FYP, studentSemesters: updatedStudentSemesters } };
    props.setUser(updatedUser);
  };

  return (
    <div className={Style.RemoveButton} onClick={remove}>
      
    </div>
  );
}

export function RenderMark(props: { edit: boolean, studentCourse: StudentCourse, user: User, setUser: Function })
{
	if(props.studentCourse.status === "DA"){
    return(
      <div className={Style.Checkmark}>
        ✓
      </div>
    );
  }else 
	if(props.studentCourse.status === "MA"){
    return(
			<div className={Style.row}>
				{props.edit && <RemoveCourse studentCourse={props.studentCourse} user={props.user} setUser={props.setUser} />}
				<div className={Style.Checkmark}>
					⚠
      	</div>
			</div>
      
    );
  }
  return <div></div>;
}

export function SeasonIcon(props: { studentCourse: StudentCourse })
{
	const getSeasonImage = () => (String(props.studentCourse.term).endsWith("3") ? "/fall.svg" : "/spring.svg");
	return(
		<div>
			<Image className={Style.SeasonImage} src={getSeasonImage()} alt="" width={20} height={20}/>
		</div>
	)
}

export function CourseBoxColor(term: number) {
  const currentYearMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  // Convert number to string and validate length
  const termStr = String(term);
  if (termStr.length !== 6) return "#E1E9F8"; // Default color if term format is invalid

  const year = termStr.slice(0, 4); // Extract year (YYYY)
  const season = termStr.slice(4, 6); // Extract season (01, 02, or 03)

  // Define the cutoff month for each season
  const seasonCutoff: { [key: string]: string } = {
    "01": `${year}-06`, // Summer cutoff (June)
    "02": `${year}-09`, // Fall cutoff (September)
    "03": `${Number(year) + 1}-01`, // Spring cutoff (January of next year)
  };

  return currentYearMonth >= seasonCutoff[season] ? "#E1E9F8" : "#F5F5F5";
}
