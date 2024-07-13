
import styles from "./../Courses.module.css"
import SemesterBox from "./SemesterBox";
import { Year } from "./../../../commons/types/TypeStudent";
import { DisplaySetting } from "./../Courses";

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

export default function YearBox(props: {year: Year, displaySetting: DisplaySetting} ) {
  return (
    <div className={styles.column} style={{ marginBottom: "20px" }}>
        <div className={styles.row} style={{ marginBottom: "4px" }}>
            <div className={styles.Grade}>{convertGrade(props.year["grade"])}</div>
            <div className={styles.Year}>{props.year["terms"][0].split(" ")[1]}-{props.year["terms"][1].split(" ")[1]}</div>
        </div>
        <div className={styles.row}>
            <div style={{ marginRight: "20px" }}>
              <SemesterBox studentCourses={props.year["fall"]} displaySetting={props.displaySetting}/>
            </div>
              <SemesterBox studentCourses={props.year["spring"]} displaySetting={props.displaySetting}/>
        </div>
    </div>
  );
}
