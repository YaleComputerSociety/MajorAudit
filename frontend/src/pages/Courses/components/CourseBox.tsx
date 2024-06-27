
import styles from "./../Courses.module.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

import img_fall from "./../../../commons/images/fall.png";
import img_spring from "./../../../commons/images/spring.png";
import DistributionsCircle from "./../../../commons/components/courses/DistributionsCircle"

import { DisplaySetting } from "./../Courses";
import { StudentCourse } from "./../../../commons/types/TypeCourse";

import { useModal } from "../../../hooks/modalContext";

function CourseBox(props: {course: StudentCourse, displaySetting: DisplaySetting }) {
    const { setModalOpen } = useModal();

    function openModal() {
        setModalOpen(props.course.course)
    }

    return (
        <div className={styles.courseBox} onClick={openModal} style={{ backgroundColor: props.course.status === "COMPLETE" ? "#E1E9F8" : "#F5F5F5" }}>
            <div className={styles.row} style={{ alignItems: "center" }}>
                <div className={props.course.status === "COMPLETE" ? styles.checkmark : styles.hidden}>
                    {props.course.status === "COMPLETE" ? 
                    <div>
                        <div data-tooltip-id="check-tooltip" data-tooltip-content="Credit Confirmed by Yale"
                        data-tooltip-place="top">✓</div>
                        <Tooltip id="check-tooltip" style={{backgroundColor: "#444444", borderRadius: "3px"}}/>
                    </div> : ""}
                </div>
                <img style={{ width: "15px", height: "15px", marginRight: "6px" }} src={props.course.season === "FALL" ? img_fall : img_spring} alt={props.course.season}></img>
                <div>
                    <div style={{ fontSize: "12px", fontWeight: "500" }}>{props.course.course.codes[0]}</div>
                    <div style={{ fontSize: "8px", fontWeight: "500" }}>{props.course.course.title}</div>
                </div>
            </div>
            <div>
                <div className={styles.row} style={{ alignItems: "center"}}>     
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
                    <div>
                        <DistributionsCircle distributions={props.course.course.areas}/>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CourseBox;
