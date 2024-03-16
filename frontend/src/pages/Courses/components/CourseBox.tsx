
import styles from "./../Courses.module.css";

import img_fall from "./../../../commons/images/fall.png";
import img_spring from "./../../../commons/images/spring.png";

import DistributionsCircle from "./../../../commons/components/courses/DistributionsCircle"

import { Course } from "./../courses_types";

function Evaluations(course: Course){
    return(
        <div className={styles.row} style={{ alignItems: "center"}}>
            <div className={styles.evaluateBox} style={{ marginRight: "6px" }}>
                {course.evaluation.rating}
            </div>
            <div className={styles.evaluateBox} style={{ marginRight: "6px" }}>
                {course.evaluation.workload}
            </div>
            <div className={styles.evaluateBox} style={{ marginRight: "6px" }}>
                {course.evaluation.professor}
            </div>
            <div>
                <DistributionsCircle distributions={course.distribution}/>
            </div>
        </div>
    );
}

function CourseBox(props: {course: Course, showGPA: boolean}) {
    return (
        <div className={styles.courseBox} style={{ backgroundColor: props.course.completed ? "#E1E9F8" : "#F5F5F5" }}>
            <div className={styles.row} style={{ alignItems: "center" }}>
                <div className={props.course.completed ? styles.checkmark : styles.hidden}>
                    {props.course.completed ? "✓" : ""}
                </div>
                <img style={{ width: "15px", height: "15px", marginRight: "6px" }} src={props.course.season === "FALL" ? img_fall : img_spring} alt={props.course.season}></img>
                <div className={props.showGPA ? styles.courseLetterGrade : styles.hidden}>
                    {props.showGPA ? props.course.letterGrade : ""}
                </div>
                <div>
                    <div style={{ fontSize: "12px", fontWeight: "500" }}>{props.course.code}</div>
                    <div style={{ fontSize: "8px", fontWeight: "500" }}>{props.course.name}</div>
                </div>
            </div>
            <div>
                <Evaluations {...props.course}/>
            </div>
        </div >
    );
}

export default CourseBox;
