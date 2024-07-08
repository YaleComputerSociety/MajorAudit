
import { useRef, useCallback } from "react";
import styles from "./../Courses.module.css";
import SemesterBox from "./SemesterBox";
import { Year } from "./../../../commons/types/TypeStudent";

const convertGrade = (grade: number) => {
  switch (grade) {
    case 1:
      return "First-Year";
    case 2:
      return "Sophomore";
    case 3:
      return "Junior";
    case 4:
      return "Senior";
    default:
      return "";
  }
};

export default function YearBox(props: {year: Year, edit: boolean }){

  return(
    <div className={styles.yearComponent}>

        <div className={styles.row} style={{ marginBottom: "4px" }}>
            <div className={styles.Grade}>
              {convertGrade(props.year["grade"])}
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#727272", alignSelf: "flex-end", marginBottom: "2.5px" }}>
              {props.year["terms"][0].split(" ")[1]}-{props.year["terms"][1].split(" ")[1]}
            </div>
        </div>

        <div className={styles.row}>

            <div style={{ marginRight: "20px" }}>
              <SemesterBox  edit={props.edit} term={props.year["terms"][0]} studentCourses={props.year["fall"]}/>
            </div>
            <SemesterBox    edit={props.edit} term={props.year["terms"][1]} studentCourses={props.year["spring"]}/>

        </div>
    </div>
  );
}
