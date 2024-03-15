import styles from "./../Courses.module.css"
import SemesterBox from "./SemesterBox";
import { Year } from "../courses_types";

export default function YearBox(year: Year) {
  return (
    <div className={styles.column}>
        <div className={styles.row} style={{ marginBottom: "4px" }}>
            <div className={styles.Grade}>{year["grade"]}</div>
            <div className={styles.Year}>{year["calendarYear"]}</div>
        </div>
        <div className={styles.row}>
            <div style={{ marginRight: "20px" }}>
              <SemesterBox {...year["fall"]}/>
            </div>
            <SemesterBox {...year["spring"]}/>
        </div>
    </div>
  );
}
