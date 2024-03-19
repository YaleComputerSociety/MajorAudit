
import styles from "./../Courses.module.css"
import SemesterBox from "./SemesterBox";
import { Year } from "./../../../commons/types/TypeStudent";
import { DisplaySetting } from "./../Courses";

export default function YearBox(props: {year: Year, displaySetting: DisplaySetting} ) {
  return (
    <div className={styles.column}>
        <div className={styles.row} style={{ marginBottom: "4px" }}>
            <div className={styles.Grade}>{props.year["grade"]}</div>
            <div className={styles.Year}>{props.year["calendarYear"]}</div>
        </div>
        <div className={styles.row}>
            <div style={{ marginRight: "20px" }}>
              <SemesterBox semester={props.year["fall"]} displaySetting={props.displaySetting}/>
            </div>
              <SemesterBox semester={props.year["spring"]} displaySetting={props.displaySetting}/>
        </div>
    </div>
  );
}
