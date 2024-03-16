
import React from "react";
import styles from "./CourseBoxSmall.module.css";

import { Course, Season } from "../../types";

import img_fall from "./../../images/fall.png";
import img_spring from "./../../images/spring.png";
import DistributionCircle from "./DistributionsCircle";

function CourseSeasonIcon(props: { seasons: Array<Season> }) {
  const seasonImageMap = {
    FALL: img_fall,
    SPRING: img_spring,
    SUMMER: 'summer.png',
  };

  return (
    <div style={{ display: "flex", marginRight: "2px", marginTop: "3px" }}>
      {props.seasons.map((szn, index) => (
        <div key={index} style={{ marginLeft: index > 0 ? '-7.5px' : 0 }}>
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

 function CourseBoxSmall(course: Course) {
  return (
    <div className={styles.CourseBox} style={{ backgroundColor: course.status === "COMPLETED" ? "#E4E9F8" : "#F5F5F5" }}>
      {course.status === "COMPLETED" ? "✓ " : ""}
      <CourseSeasonIcon seasons={course.seasons}/>
      {course.code}
      {course.distributions.length > 0 ? (<DistributionCircle distributions={course.distributions}/>) : ("")}
    </div>
  );
}

export default CourseBoxSmall;
