
import Style from "./CourseBox.module.css";
import { User, StudentCourse } from "@/types/type-user";

import { useUser } from "@/context/UserProvider";

import { RenderMark, SeasonIcon, GetCourseColor, IsTermActive } from "../../../../../utils/course-display/CourseDisplay";
import DistributionCircle from "../../../../../components/distribution-circle/DistributionsCircle";

function RemoveButton(props: { 
	studentCourse: StudentCourse; 
	user: User; 
	setUser: (user: User) => void 
}){
  const removeStudentCourse = () => {
    const updatedStudentCourses = props.user.FYP.studentCourses.filter(
      (course) => course.courseOffering.abstractCourse.title !== props.studentCourse.courseOffering.abstractCourse.title
    );

    const updatedUser = { ...props.user, FYP: { ...props.user.FYP, studentCourses: updatedStudentCourses } };
    props.setUser(updatedUser);
  };

  return (
    <div 
			className={Style.FuncButton} 
			style={{ background: "#ffaaaa" }}
			onClick={removeStudentCourse}
		/>
  );
}

function CourseBox(props: {
	edit: boolean, 
	studentCourse: StudentCourse, 
}){
	const { user, setUser } = useUser();

	return(
		<div 
			className={Style.CourseBox}  
			style={{ background: GetCourseColor(props.studentCourse.term) }}
		> 
			<div 
				className={Style.Row} 
			>
				{(props.edit && IsTermActive(props.studentCourse.term)) && 
					<RemoveButton studentCourse={props.studentCourse} user={user} setUser={setUser}/>
				}
				<RenderMark status={props.studentCourse.status}/>
				<SeasonIcon studentCourse={props.studentCourse}/>
				<div className={Style.Column}>
					<div className={Style.CourseCode}>
						{props.studentCourse.courseOffering.abstractCourse.codes[0]}
					</div>
					<div className={Style.CourseTitle}>
						{props.studentCourse.courseOffering.abstractCourse.title}
					</div>
				</div>
			</div>
			<DistributionCircle distributions={props.studentCourse.courseOffering.abstractCourse.distributions}/>
		</div>
	);
}

export default CourseBox;
