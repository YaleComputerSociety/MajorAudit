import styles from "./../Courses.module.css"

import fall_image from './../images/fall.png';
import spring_image from './../images/spring.png';
import checkmark from './../images/checkmark.png';

type Props = {
    readonly course: string;
    readonly season: string;
    readonly completed: string;
};

export default function CourseBox({ season, course, completed }: Props) {
    return (
        <div
            style={{
                borderRadius: "20px",
                backgroundColor: completed === "true" ? "#E1E9F8" : "#F5F5F5",
                marginBottom: "0.5%",
                padding: "1%"
            }}
        >
            <div className={styles.Row}>
                <img src={checkmark}
                    alt={completed}
                    style={{
                        marginLeft: "1%",
                        display: completed === "true" ? "flow" : "none",
                        
                    }}></img>
                <img src={season === "fall" ? fall_image : spring_image} alt={season} className={styles.Season}></img>
                <div className={styles.Column}>
                    <div className={styles.CourseCode}>{course}</div>
                    <div className={styles.CourseName}>{"full course name"}</div>
                </div>
                <div className={styles.Row} style={{ fontSize: "small", alignItems: "center"}}>
                    <div className={styles.MetadataBox}
                        style={{
                            borderRadius: "25px",
                            marginRight: "5%",
                            width: "50px"
                        }}>
                        {"~4.0"}
                    </div>
                    <div className={styles.MetadataBox}
                        style={{
                            borderRadius: "25px",
                            marginRight: "5%",
                            width: "50px"
                        }}>
                        {"~4.0"}
                    </div>
                    <div className={styles.MetadataBox}
                        style={{
                            borderRadius: "25px",
                            marginRight: "5%",
                            width: "50px"
                        }}>{
                            "~3.8"}
                    </div>
                </div>
            </div>
        </div >
    );
}
