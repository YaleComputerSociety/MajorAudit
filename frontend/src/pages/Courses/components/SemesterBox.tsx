import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import MetadataBox from "./MetadataBox";


type Props = {
    readonly season: string;
};

export default function SemesterBox({ season }: Props) {
    return (
        <div className={styles.Column}>
            <div className={styles.Row}>
                <MetadataBox heading="CREDITS" text="5.5"/>
                <MetadataBox heading="RATING" text="~4.0"/>
                <MetadataBox heading="WORKLOAD" text="~3.8"/>
                <MetadataBox heading="DISTRIBUTIONALS" text="So"/>
            </div>
            <CourseBox season={season} course="COURSE NAME #1" completed="true"/>
            <CourseBox season={season} course="COURSE NAME #2" completed="false"/>
        </div>
    );
}
