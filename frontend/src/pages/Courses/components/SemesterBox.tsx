import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import { Semester } from "../courses_types";

type Props = {
    readonly semester: Semester;
};

function MetadataAll(){
    return(
        <div className={styles.Row} style={{ marginBottom: "10px" }}>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Credits
                </div>
                <div className={styles.countBox}>
                    6
                </div>
            </div>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Rating
                </div>
                <div className={styles.evaluateBox}>
                    4.2
                </div>
            </div>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Workload
                </div>
                <div className={styles.evaluateBox}>
                    4.1
                </div>
            </div>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Distribution
                </div>
                <div className={styles.evaluateBox}>
                    3.9
                </div>
            </div>
        </div>
    );
}


function SemesterBox({ semester }: Props) {

    const classComponents = [];
    for (let i=0; i <semester["courses"].length; i++) {
        classComponents.push(<CourseBox season={semester["season"]} course={semester["courses"][i]["name"]} completed={semester["courses"][i]["hasCompleted"]}/>); 
    }

    return (
        <div className={styles.Column}>
            <MetadataAll/>
            {classComponents}
        </div>
    );
}

export default SemesterBox;
