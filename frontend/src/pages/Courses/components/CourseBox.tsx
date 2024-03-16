
import styles from "./../Courses.module.css";

import img_fall from './../images/fall.png';
import img_spring from './../images/spring.png';

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

function CourseBox(course: Course) {
    return (
        <div className={styles.courseBox} style={{ backgroundColor: course.completed ? "#E1E9F8" : "#F5F5F5" }}>
            <div className={styles.row} style={{ alignItems: "center" }}>
                <div className={course.completed ? styles.checkmark : styles.hidden}>
                    {course.completed ? "✓" : ""}
                </div>
                <img style={{ width: "15px", height: "15px", marginRight: "6px" }} src={course.season === "FALL" ? img_fall : img_spring} alt={course.season}></img>
                <div>
                    <div style={{ fontSize: "12px", fontWeight: "500" }}>{course.code}</div>
                    <div style={{ fontSize: "8px", fontWeight: "500" }}>{course.name}</div>
                </div>
            </div>
            <div>
                <Evaluations {...course}/>
            </div>
        </div >
    );
}

export default CourseBox;
