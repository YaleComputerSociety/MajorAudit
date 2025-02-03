
import Style from "./CourseBox.module.css";
import { User, StudentCourse } from "@/types/type-user";

import { RenderMark, SeasonIcon, CourseBoxColor } from "./CourseBoxUtils";
import DistributionCircle from "@/components/distribution-circle/DistributionsCircle";

// import { useModal } from "../../../hooks/modalContext";
// const { setModalOpen } = useModal(); function openModal() { setModalOpen(props.SC.course) } // onClick={openModal}

function CourseBox(props: {edit: boolean, studentCourse: StudentCourse, user: User, setUser: Function }){
	return(
		<div className={Style.courseBox}  style={{ backgroundColor: CourseBoxColor(props.studentCourse.term) }}> 
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
