import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";

type Props = {
  readonly text: string;
};

export default function YearBox({ text }: Props) {
  return (
    <div className={styles.Container}>
        <div className={styles.Row}>
            <div className={styles.Grade}>{text}</div>
            <div className={styles.Year}>{"(year-year)"}</div>
        </div>
        <div className={styles.Row}>
            <div className={styles.Column}>
                <div className={styles.Row}>
                    <div>{"CREDITS"}</div>
                    <div>{"RATING"}</div>
                    <div>{"WORKLOAD"}</div>
                    <div>{"DISTRIBUTIONALS"}</div>
                </div>
                <CourseBox text="COURSE NAME #1"/>
                <CourseBox text="COURSE NAME #2"/>
            </div>
            <div className={styles.Column}>
                <div className={styles.Row}>
                    <div>{"CREDITS"}</div>
                    <div>{"RATING"}</div>
                    <div>{"WORKLOAD"}</div>
                    <div>{"DISTRIBUTIONALS"}</div>
                </div>
                <CourseBox text="COURSE NAME #3"/>
            </div>
        </div>
    </div>
  );
}
