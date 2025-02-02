
import Style from "./CourseBox.module.css";
import { User, StudentCourse } from "@/types/type-user";

import { RenderMark } from "./CourseBoxUtils";
import { SeasonIcon } from "./CourseBoxUtils";
import DistributionCircle from "@/components/distribution-circle/DistributionsCircle";

// import img_fall from "./../../../../commons/images/fall.png";
// import img_spring from "./../../../../commons/images/spring.png";



// import { useModal } from "../../../hooks/modalContext";

function CourseBox(props: {edit: boolean, studentCourse: StudentCourse, user: User, setUser: Function }) 
{
	// const { setModalOpen } = useModal();
	// function openModal() {
	//   setModalOpen(props.SC.course)
	// }

	const getBackgroundColor = () => (props.studentCourse.status === "DA_COMPLETE" ? "#E1E9F8" : "#F5F5F5");
	

	return (
		<div className={Style.courseBox}  style={{ backgroundColor: getBackgroundColor() }}> 
			{/* onClick={openModal} */}
			<div className={Style.row} style={{ alignItems: "center" }}>
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
