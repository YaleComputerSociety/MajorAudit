import styles from "./../Courses.module.css"
import SemesterBox from "./SemesterBox";
import { Year } from "../courses_types";

type Props = {
  readonly grade: Year;
};

export default function YearBox({ grade }: Props) {
  return (
    <div className={styles.Container}>
        <div className={styles.Row}>
            <div className={styles.Grade}>{grade["name"]}</div>
            <div className={styles.Year}>{grade["calendarYear"]}</div>
        </div>
        <div className={styles.Row}>
            <SemesterBox semester={grade["fall"]}/>
            <SemesterBox semester={grade["spring"]}/>
        </div>
    </div>
  );
}
