
import React from "react";
import { List } from "lodash";
import DistributionCircle from "./DistributionsCircle";
import styles from "./CourseBox.module.css";
import { Course } from "./../../types";

export default function CourseBox(course: Course) {
  return (
    <div className={styles.CourseBox}>
      {course.hasCheck ? "✓ " : ""}
      {course.code}
      {course.distributions.length > 0 ? (<DistributionCircle distributions={course.distributions}/>) : ("")}
    </div>
  );
}
