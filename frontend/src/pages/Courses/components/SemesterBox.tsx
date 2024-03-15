
import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import { Semester } from "../courses_types";

function MetadataAll(semester: Semester){
    let totalRating = 0;
    let totalWorkload = 0;

    const distributionSet = new Set<string>();

    semester.courses.forEach(course => {
        totalRating += course.evaluation.rating;
        totalWorkload += course.evaluation.workload;

        course.distribution.forEach(value => {
            distributionSet.add(value);
        });
    });

    const averageRating = totalRating / semester.courses.length;
    const averageWorkload = totalWorkload / semester.courses.length;

    const distributionArray = Array.from(distributionSet);

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
                    {semester.courses.length}
                </div>
            </div>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Rating
                </div>
                <div className={styles.evaluateBox}>
                    {averageRating.toFixed(1)}
                </div>
            </div>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Workload
                </div>
                <div className={styles.evaluateBox}>
                    {averageWorkload.toFixed(1)}
                </div>
            </div>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Distribution
                </div>
                <div className={styles.row}>
                    {distributionArray.map((value, index) => (
                        <div className={styles.evaluateBox} key={index} style={styleMapping[value as keyof typeof styleMapping]}>
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


function SemesterBox(semester: Semester) {

    const classComponents = [];
    for (let i=0; i <semester["courses"].length; i++) {
        classComponents.push(<CourseBox {...semester["courses"][i]}/>); 
    }

    return (
        <div className={styles.column}>
            <MetadataAll {...semester}/>
            {classComponents}
        </div>
    );
}

export default SemesterBox;
