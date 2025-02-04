
import Style from "./CourseBox.module.css";
import { User, StudentCourse } from "@/types/type-user";

import { RenderMark, SeasonIcon, GetCourseColor, IsTermActive } from "./../../../../../utils/CourseDisplay";
import DistributionCircle from "@/components/distribution-circle/DistributionsCircle";

// import { useModal } from "../../../hooks/modalContext";
// const { setModalOpen } = useModal(); function openModal() { setModalOpen(props.SC.course) } // onClick={openModal}

function RemoveCourse(props: { studentCourse: StudentCourse; user: User; setUser: Function }) 
{
  const remove = () => {
    const updatedStudentCourses = props.user.FYP.studentCourses.filter(
      (course) => course.course.title !== props.studentCourse.course.title
    );

    const updatedUser = { 
      ...props.user, 
      FYP: { 
        ...props.user.FYP, 
        studentCourses: updatedStudentCourses 
      } 
    };

    props.setUser(updatedUser);
  };

  return (
    <div className={Style.RemoveButton} onClick={remove}></div>
  );
}

function CourseBox(props: {edit: boolean, studentCourse: StudentCourse, user: User, setUser: Function }){
	return(
		<div className={Style.courseBox}  style={{ backgroundColor: GetCourseColor(props.studentCourse.term) }}> 
			<div className={Style.row} style={{ alignItems: "center" }}>
				{(props.edit && IsTermActive(props.studentCourse.term)) && <RemoveCourse studentCourse={props.studentCourse} user={props.user} setUser={props.setUser} />}
				<RenderMark edit={props.edit} studentCourse={props.studentCourse} user={props.user} setUser={props.setUser}/>
				<SeasonIcon studentCourse={props.studentCourse}/>
				<div>
					<div className={Style.CourseCode}>
						{props.studentCourse.course.codes[0]}
					</div>
					<div className={Style.CourseTitle}>
						{props.studentCourse.course.title}
					</div>
				</div>
			</div>
			<div>
				<div className={Style.row} style={{ alignItems: "center" }}>
					<DistributionCircle distributions={props.studentCourse.course.dist}/>
				</div>
			</div>
		</div>
	);
}

export default CourseBox;
