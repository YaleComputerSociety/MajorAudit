import styles from "./../Courses.module.css"
import SemesterBox from "./SemesterBox";

type Props = {
  readonly grade: string;
};

export default function YearBox({ grade }: Props) {
  return (
    <div className={styles.Container}>
        <div className={styles.Row}>
            <div className={styles.Grade}>{grade}</div>
            <div className={styles.Year}>{"2022-2023"}</div>
        </div>
        <div className={styles.Row}>
            <SemesterBox season="fall"/>
            <SemesterBox season="spring"/>
        </div>
    </div>
  );
}
