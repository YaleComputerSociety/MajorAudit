
import styles from "./../Courses.module.css";
import "react-tooltip/dist/react-tooltip.css";

import img_fall from "./../../../commons/images/fall.png";
import img_spring from "./../../../commons/images/spring.png";
import DistributionsCircle from "../../../commons/components/icons/DistributionsCircle"

import { StudentCourse } from "./../../../commons/types/TypeCourse";
import { User } from "../../../commons/types/TypeStudent";
// import { useModal } from "../../../hooks/modalContext";

function RemoveCourse(props: { SC: StudentCourse, user: User, setUser: Function }){

	const remove = () => {
    const updatedStudentCourses = props.user.studentCourses.filter(
      (course) => course.course.title !== props.SC.course.title || course.term !== props.SC.term
    );
    props.setUser((prevUser: User) => ({
      ...prevUser,
      studentCourses: updatedStudentCourses
    }));
  };

	return( 
		<div className={styles.RemoveButton} onClick={remove}>
			
		</div>
	)
}

function CourseBox(props: {edit: boolean, SC: StudentCourse, user: User, setUser: Function  }) {
    
    // const { setModalOpen } = useModal();
    // function openModal() {
    //   setModalOpen(props.SC.course)
    // }

		const { status, term, course } = props.SC;

		const renderMark = () => {
			if(status === "DA_COMPLETE" || status === "DA_PROSPECT"){
				return (
					<div className={styles.checkmark}>
						✓
					</div>
				);
			}else if(status === "MA_HYPOTHETICAL" || "MA_VALID"){
				const mark = (status === "MA_HYPOTHETICAL") ? "⚠" : "☑";
				return (
					<div className={styles.row}>
						{props.edit && <RemoveCourse SC={props.SC} user={props.user} setUser={props.setUser} />}
						<div className={styles.checkmark}>
							{mark}
						</div>
					</div>
				);
			}
			return <div className={styles.hidden}></div>;
		};
	
		const getBackgroundColor = () => (status === "DA_COMPLETE" ? "#E1E9F8" : "#F5F5F5");
		const getSeasonImage = () => (String(term).endsWith("3") ? img_fall : img_spring);
	
		return (
			<div className={styles.courseBox}  style={{ backgroundColor: getBackgroundColor() }}> 
			{/* onClick={openModal} */}

				<div className={styles.row} style={{ alignItems: "center" }}>
					{renderMark()}
					<img style={{ width: "15px", height: "15px", marginRight: "6px" }} src={getSeasonImage()} alt="" />
					<div>
						<div style={{ fontSize: "12px", fontWeight: "500" }}>
							{course.codes[0]}
						</div>
						<div style={{ fontSize: "8px", fontWeight: "500" }}>
							{course.title}
						</div>
					</div>
				</div>
				<div>
					<div className={styles.row} style={{ alignItems: "center" }}>
						<DistributionsCircle distributions={[...course.areas, ...course.skills]} />
					</div>
				</div>
			</div>
		);
}

export default CourseBox;
