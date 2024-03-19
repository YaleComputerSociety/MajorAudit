
import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import { Semester } from "./../../../commons/types/TypeStudent";
import { DisplaySetting } from "./../Courses";

function MetadataAll(props: { semester: Semester, displaySetting: DisplaySetting }){
    let totalRating = 0;
    let totalWorkload = 0;

    const areaSet = new Set<string>();
    const skillSet = new Set<string>();

    props.semester.courses.forEach(course => {
        totalRating += course.course.evaluation.rating;
        totalWorkload += course.course.evaluation.workload;

        course.course.distribution.forEach(value => {
            if(value === "Hu" || value === "So" || value === "Sc"){
                areaSet.add(value);
            }else{
                skillSet.add(value);
            }
        });
    });

    const averageRating = totalRating / props.semester.courses.length;
    const averageWorkload = totalWorkload; // maybe not divide

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
                    {props.semester.courses.length}
                </div>
            </div>
            {props.displaySetting.rating && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>Rating</div>
                    <div className={styles.evaluateBox}>{averageRating.toFixed(1)}</div>
                </div>
            )}
            {props.displaySetting.workload && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>Workload</div>
                    <div className={styles.evaluateBox}>{averageWorkload.toFixed(1)}</div>
                </div>
            )}
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

function SemesterBox(props: { semester: Semester, displaySetting: DisplaySetting }) {

    const classComponents = [];
    for (let i=0; i <props.semester["courses"].length; i++) {
        classComponents.push(<CourseBox course={props.semester["courses"][i]} displaySetting={props.displaySetting} />); 
    }

    return (
        <div className={styles.column}>
            <MetadataAll {...props}/>
            {classComponents}
        </div>
    );
}

export default SemesterBox;
