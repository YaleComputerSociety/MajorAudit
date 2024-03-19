
import styles from "./../Courses.module.css";

import img_fall from "./../../../commons/images/fall.png";
import img_spring from "./../../../commons/images/spring.png";

import DistributionsCircle from "./../../../commons/components/courses/DistributionsCircle"

import { DisplaySetting } from "./../Courses";
import { StudentCourse } from "./../../../commons/types/TypeCourse";

function CourseBox(props: {course: StudentCourse, displaySetting: DisplaySetting }) {
    return (
        <div className={styles.courseBox} style={{ backgroundColor: props.course.enrollmentStatus === "COMPLETED" ? "#E1E9F8" : "#F5F5F5" }}>
            <div className={styles.row} style={{ alignItems: "center" }}>
                <div className={props.course.enrollmentStatus === "COMPLETED" ? styles.checkmark : styles.hidden}>
                    {props.course.enrollmentStatus === "COMPLETED" ? "✓" : ""}
                </div>
                <img style={{ width: "15px", height: "15px", marginRight: "6px" }} src={props.course.season === "FALL" ? img_fall : img_spring} alt={props.course.season}></img>
                <div>
                    <div style={{ fontSize: "12px", fontWeight: "500" }}>{props.course.course.code}</div>
                    <div style={{ fontSize: "8px", fontWeight: "500" }}>{props.course.course.title}</div>
                </div>
            </div>
            <div>
                <div className={styles.row} style={{ alignItems: "center"}}>     
                    {props.displaySetting.rating && (
                        <div className={styles.evaluateBox} style={{ marginRight: "6px" }}>
                            {props.course.course.evaluation.rating}
                        </div>
                    )}
                    {props.displaySetting.workload && (
                        <div className={styles.evaluateBox} style={{ marginRight: "6px" }}>
                            {props.course.course.evaluation.workload}
                        </div>
                    )}
                    <div>
                        <DistributionsCircle distributions={props.course.course.distribution}/>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CourseBox;
