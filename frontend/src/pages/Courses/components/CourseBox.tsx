
import styles from "./../Courses.module.css";
import "react-tooltip/dist/react-tooltip.css";

import img_fall from "./../../../commons/images/fall.png";
import img_spring from "./../../../commons/images/spring.png";
import DistributionsCircle from "./../../../commons/components/courses/DistributionsCircle"

import { StudentCourse } from "./../../../commons/types/TypeCourse";
import { useModal } from "../../../hooks/modalContext";

function CourseBox(props: {SC: StudentCourse }) {
    
    const { setModalOpen } = useModal();
    function openModal() {
      setModalOpen(props.SC.course)
    }

		const { status, term, course } = props.SC;

		const renderMark = () => {
			if(status === "DA_COMPLETE" || status === "DA_PROSPECT") {
				return( 
					<div className={styles.checkmark}>
						✓
					</div>
				)
			}else if(status === "MA_HYPOTHETICAL"){
				return( 
					<div className={styles.checkmark}>
						⚠
					</div>
				)
			}
			return <div className={styles.hidden}></div>;
		};
	
		const getBackgroundColor = () => (status === "DA_COMPLETE" ? "#E1E9F8" : "#F5F5F5");
	
		const getSeasonImage = () => (String(term).endsWith("3") ? img_fall : img_spring);
	
		return (
			<div className={styles.courseBox} onClick={openModal} style={{ backgroundColor: getBackgroundColor() }}>
				<div className={styles.row} style={{ alignItems: "center" }}>
					{renderMark()}
					<img style={{ width: "15px", height: "15px", marginRight: "6px" }} src={getSeasonImage()} alt="" />
					<div>
						<div style={{ fontSize: "12px", fontWeight: "500" }}>{course.codes[0]}</div>
						<div style={{ fontSize: "8px", fontWeight: "500" }}>{course.title}</div>
					</div>
				</div>
				<div>
					<div className={styles.row} style={{ alignItems: "center" }}>
						{/* {props.displaySetting.rating && (
                        <div className={styles.evaluateBox} style={{ marginRight: "6px" }}>
                            {props.course.course.evaluation.rating}
                        </div>
                    )}
                    {props.displaySetting.workload && (
                        <div className={styles.evaluateBox} style={{ marginRight: "6px" }}>
                            {props.course.course.evaluation.workload}
                        </div>
                    )} */}
						<DistributionsCircle distributions={[...course.areas, ...course.skills]} />
					</div>
				</div>
			</div>
		);
}

export default CourseBox;
