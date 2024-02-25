import styles from "./../Courses.module.css"


type Props = {
  readonly heading: string;
  readonly text: string;
};

export default function MetadataBox({ heading, text }: Props) {
  return (
    <div className={styles.MetadataColumn}>
        <div className={styles.MetadataHeading}>{heading}</div>
        <div className={styles.Row} style={{marginBottom:"10%"}}>
            <div className={styles.MetadataBox} style={{borderRadius: "7px"}}>{text}</div>
        </div>
    </div>
  );
}
