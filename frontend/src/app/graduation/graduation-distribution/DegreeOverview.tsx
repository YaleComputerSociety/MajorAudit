
import React from "react";
import styles from "./DegreeOverview.module.css";

//import { Degree } from "@/types/type-user";
// import { StudentCourse } from "../../../commons/types/TypeCourse";

// import ProgramRequirementsBox from "../../Majors/components/ProgramRequirementsBox";

// function DegreeTopshelf(props: { degree: Degree }) {
//     return(
//         <div style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "500" }}>
//             Degree ⚙
//             <div>
//                 <div style={{ marginBottom: "16px", fontSize: "26px", fontWeight: "500" }}>
//                     {props.degree.metadata.degreeType === "BACH_ART" ? (
//                         <span style={{ fontStyle: "italic" }}>B.A.</span>
//                     ) : (
//                         props.degree.metadata.degreeType
//                     )}
//                     {props.degree.metadata.name}
//                 </div>
//             </div>
//         </div>
//     );
// }

//for major, distributions, total...
function createHeader(header_name: string, curr_credits: number, total_credits: number) {
    return( 
        <div className={`${styles.header} ${styles.text}`} style={{fontSize: "18px", paddingTop: "12px"}}>
            <span>{header_name}</span>
            <span>{curr_credits}/{total_credits}</span>
        </div>
    );
}

function DegreeOverview(/*props: { degree: Degree }*/){

    // const storedStudentCourses = localStorage.getItem("studentCourses");
    // let studentCourses: StudentCourse[] = [];
    // let studentCodes: Set<string> = new Set();
    // if (storedStudentCourses) {
    //   studentCourses = JSON.parse(storedStudentCourses) as StudentCourse[];
    //   studentCodes = new Set(studentCourses.flatMap(studentCourse => studentCourse.course.codes));
    // }

    return(
        <div className={styles.reqsContainer}>
            {/* <DegreeTopshelf degree={props.degree}/>
            <ProgramRequirementsBox degree={props.degree} studentCodes={studentCodes} studentCourses={studentCourses}/> */}
            <div className={styles.column}>
            <span className={styles.title_text} style={{fontSize: "28px"}}>Overview</span>
            {createHeader("MAJOR", 5, 12)}
            </div>
        </div>
    );
}

export default DegreeOverview;
