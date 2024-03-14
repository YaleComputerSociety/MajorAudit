
import styles from "./../Courses.module.css";
import fall_image from './../images/fall.png';
import spring_image from './../images/spring.png';
import checkmark from './../images/checkmark.png';
import DistributionsCircle from "./../../../commons/components/courses/DistributionsCircle"

type Props = {
    readonly course: string;
    readonly season: string;
    readonly completed: string;
};

export default function CourseBox({ season, course, completed }: Props) {
    return (
        <div style={{ borderRadius: "16px", backgroundColor: completed === "true" ? "#E1E9F8" : "#F5F5F5", marginBottom: "5px", padding: "1%"}}>
            <div className={styles.Row}>
                <img src={checkmark} alt={completed} style={{ marginLeft: "1%", display: completed === "true" ? "flow" : "none", width: "20px", height: "20px" }}></img>
                <img src={season === "fall" ? fall_image : spring_image} alt={season} className={styles.Season}></img>
                <div className={styles.Column}>
                    <div className={styles.CourseCode}>{course}</div>
                    <div className={styles.CourseName}>{"full course name"}</div>
                </div>
                <div className={styles.Row} style={{ fontSize: "small", alignItems: "center"}}>
                    <div className={styles.evaluateBox}>
                        4.1
                    </div>
                    <div className={styles.evaluateBox}>
                        3.8
                    </div>
                    <div className={styles.evaluateBox}>
                        3.8
                    </div>
                    <div style={{ marginRight: "10px" }}>
                        <DistributionsCircle distributions={["Hu"]}/>
                    </div>
                </div>
            </div>
        </div >
    );
}
