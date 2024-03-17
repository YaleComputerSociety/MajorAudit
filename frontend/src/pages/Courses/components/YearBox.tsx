
import styles from "./../Courses.module.css"
import SemesterBox from "./SemesterBox";
import { Year } from "./../../../commons/types/TypeStudent";

export default function YearBox(props: {year: Year, showGPA: boolean} ) {
  return (
    <div className={styles.column}>
        <div className={styles.row} style={{ marginBottom: "4px" }}>
            <div className={styles.Grade}>{props.year["grade"]}</div>
            <div className={styles.Year}>{props.year["calendarYear"]}</div>
        </div>
        <div className={styles.row}>
            <div style={{ marginRight: "20px" }}>
              <SemesterBox semester={props.year["fall"]} showGPA={props.showGPA}/>
            </div>
            <SemesterBox semester={props.year["spring"]} showGPA={props.showGPA}/>
        </div>
    </div>
  );
}
