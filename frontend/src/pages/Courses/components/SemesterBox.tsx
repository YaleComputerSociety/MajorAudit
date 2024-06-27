
import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import { StudentCourse } from "../../../commons/types/TypeCourse";
import { DisplaySetting } from "./../Courses";

function MetadataAll(props: { studentCourses: Array<StudentCourse>, displaySetting: DisplaySetting }){
    // let totalRating = 0;
    // let totalWorkload = 0;

    if (props.studentCourses.length === 0) {
        return <div></div>;
    }

    const areaSet = new Set<string>();
    const skillSet = new Set<string>();

    props.studentCourses.forEach(studentCourse => {
        // totalRating += course.course.evaluation.rating;
        // totalWorkload += course.course.evaluation.workload;

        studentCourse.course.areas.forEach(value => { areaSet.add(value); });
        studentCourse.course.skills.forEach(value => { skillSet.add(value); });
    });

    // const averageRating = totalRating / props.courses.length;
    // const averageWorkload = totalWorkload;

    const areaArray = Array.from(areaSet);
    const skillArray = Array.from(skillSet);
    const styleMapping = {
        "Hu": { backgroundColor: "#E6CFF4", color: "#9970AB", marginRight: "4px" },
        "So": { backgroundColor: "#CFE0F4", color: "#5493C4", marginRight: "4px"  },
        "Sc": { backgroundColor: "#D0F4CF", color: "#67AE5E", marginRight: "4px"  },
        "QR": { backgroundColor: "#F4CFCF", color: "#C1320A", marginRight: "4px"  },
        "WR": { backgroundColor: "#F4DCCF", color: "#E37F1D", marginRight: "4px"  },
        "L" : { backgroundColor: "#D2CEDB", color: "#231861", marginRight: "4px"  }
    };

    return(
        <div className={styles.row} style={{ marginBottom: "10px" }}>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Credits
                </div>
                <div className={styles.countBox}>
                    {props.studentCourses.length}
                </div>
            </div>
            {/* {props.displaySetting.rating && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>Rating</div>
                    <div className={styles.evaluateBox}>{averageRating.toFixed(1)}</div>
                </div>
            )} */}
            {/* {props.displaySetting.workload && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>Workload</div>
                    <div className={styles.evaluateBox}>{averageWorkload.toFixed(1)}</div>
                </div>
            )} */}
            {areaArray.length > 0 && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>
                        Areas
                    </div>
                    <div className={styles.row}>
                        {areaArray.map((value, index) => (
                            <div className={styles.evaluateBox} key={index} style={styleMapping[value as keyof typeof styleMapping]}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {skillArray.length > 0 && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>
                        Skills
                    </div>
                    <div className={styles.row}>
                        {skillArray.map((value, index) => (
                            <div className={styles.evaluateBox} key={index} style={styleMapping[value as keyof typeof styleMapping]}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function SemesterBox(props: { studentCourses: Array<StudentCourse>, displaySetting: DisplaySetting }) {
    // Ensure courses is a valid array
    const studentCourses = props.studentCourses || [];
    const classComponents = studentCourses.map((studentCourses, index) => (
        <CourseBox key={index} course={studentCourses} displaySetting={props.displaySetting} />
    ));

    // Render empty div if no courses
    if (classComponents.length === 0) {
        return <div />;
    }

    return (
        <div className={styles.column}>
            <MetadataAll {...props} />
            {classComponents}
        </div>
    );
}

export default SemesterBox;
