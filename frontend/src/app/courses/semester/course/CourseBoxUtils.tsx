
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
	if(props.studentCourse.status === "DA_COMPLETE" || props.studentCourse.status === "DA_PROSPECT"){
    return(
      <div className={Style.Checkmark}>
        ✓
      </div>
    );
  }else 
	if(props.studentCourse.status === "MA_HYPOTHETICAL" || props.studentCourse.status === "MA_VALID"){
    const mark = props.studentCourse.status === "MA_HYPOTHETICAL" ? "⚠" : "☑";
    return(
			<div className={Style.row}>
				{props.edit && <RemoveCourse studentCourse={props.studentCourse} user={props.user} setUser={props.setUser} />}
				<div className={Style.Checkmark}>
        	{mark}
      	</div>
			</div>
      
    );
  }
  return <div></div>;
}

export function SeasonIcon(props: { studentCourse: StudentCourse })
{
	// const getSeasonImage = () => (String(props.studentCourse.term).endsWith("3") ? fall : fall);
	return(
		<div>
			<Image className={Style.SeasonImage} src="/fall.svg" alt="" width={20} height={20}/>
		</div>
	)
}
