import styles from "./../Courses.module.css"


type Props = {
  readonly text: string;
};

export default function CourseBox({ text }: Props) {
  return (
    <div className={styles.Course}>
        <div>{text}</div>
        <div>{"full course name"}</div>
    </div>
  );
}
