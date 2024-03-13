
import React from "react";
import { List } from "lodash";
import DistributionCircle from "./DistributionsCircle";
import styles from "./CourseBox.module.css";

type Props = {
  readonly text: string;
  readonly semesters?: string;
  readonly hasCheck?: boolean;
  readonly distributions: List<string>;
};

export default function CourseBox({ text, semesters, hasCheck, distributions }: Props) {
  return (
    <div className={styles.CourseBox}>
      {hasCheck ? "✓ " : ""}
      {text}
      {distributions.length > 0 ? (<DistributionCircle distributions={distributions}/>) : ("")}
    </div>
  );
}
