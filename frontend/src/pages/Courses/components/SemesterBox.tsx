
import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import DistributionBoxSmall from "../../../commons/components/courses/DistributionBoxSmall"
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
                            <div style={{paddingRight: "4px"}}>
                            <DistributionBoxSmall text={value} key={index} />
                            </div>
                            // <div className={styles.evaluateBox} key={index} style={styleMapping[value as keyof typeof styleMapping]}>
                            //     {value}
                            // </div>
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
                            <div style={{paddingRight: "4px"}}>
                            <DistributionBoxSmall text={value} key={index} />
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
