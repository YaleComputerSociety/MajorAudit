import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import MetadataBox from "./MetadataBox";
import { Semester } from "../courses_types";

type Props = {
    readonly semester: Semester;
};

export default function SemesterBox({ semester }: Props) {

    const classComponents = [];
    for (let i=0; i <semester["courses"].length; i++) {
        classComponents.push(<CourseBox season={semester["season"]} course={semester["courses"][i]["name"]} completed={semester["courses"][i]["hasCompleted"]}/>); 
    }

    return (
        <div className={styles.Column}>
            <div className={styles.Row}>
                <MetadataBox heading="CREDITS" text="5.5"/>
                <MetadataBox heading="RATING" text="~4.0"/>
                <MetadataBox heading="WORKLOAD" text="~3.8"/>
                <MetadataBox heading="DISTRIBUTIONALS" text="So"/>
            </div>
            {classComponents}
        </div>
    );
}
