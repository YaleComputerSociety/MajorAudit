
import React from "react";
import styles from "./CourseIcon.module.css";
import "react-tooltip/dist/react-tooltip.css";
import { StudentCourse } from "@/types/type-user";

import fall from "./fall.svg";
import DistributionCircle from "../distribution-circle/DistributionsCircle";

// import { useModal } from "../../../hooks/modalContext";

function CourseSeasonIcon(props: { seasons: Array<string> }) {
  const seasonImageMap: { [key: string]: string } = {
    "Fall": fall,
    "Spring": fall,
  };

  return (
    <div style={{ display: "flex", marginRight: "2px", marginTop: "3px" }}>
      {props.seasons.map((szn, index) => (
        <div key={index} style={{ marginLeft: index > 0 ? "-7.5px" : 0 }}>
          {seasonImageMap[szn] && (
            <img
              style={{ width: "15px", height: "15px" }}
              src={seasonImageMap[szn]}
              alt={szn}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function DistCircDiv(props: { dist: Array<string> }) {
  if (!Array.isArray(props.dist) || props.dist.length === 0) {
    return <div></div>;
  }

  return (
    <div style={{ marginLeft: "2px", marginTop: "2px" }}>
      <DistributionCircle distributions={props.dist} />
    </div>
  );
}


export function StudentCourseIcon(props: { studentCourse: StudentCourse, utilityButton?: React.ReactNode }) {
  
  const mark = (status: string) => {
    let mark = "";
    switch (status) {
      case "DA_COMPLETE":
      case "DA_PROSPECT":
        mark = "✓";
        break;
      case "MA_HYPOTHETICAL":
        mark = "⚠";
        break;
      case "MA_VALID":
        mark = "☑";
        break;
      default:
        return <div className={styles.hidden}></div>;
    }
    return <div className={styles.Mark}>{mark}</div>;
  };

  const dist = props.studentCourse.course.dist || [];

  return (
    <div 
      className={styles.CourseIcon} 
      style={{ backgroundColor: props.studentCourse.status === "NA" ? "#F5F5F5" : "#E1E9F8" }}
    >
      {props.utilityButton && props.utilityButton}
      {props.studentCourse.status === "NA" 
        ? <CourseSeasonIcon seasons={props.studentCourse.course.seasons || []} />
        : mark(props.studentCourse.status)
      }
      {props.studentCourse.course.codes[0]}
      <DistCircDiv dist={dist} />
    </div>
  );
}
