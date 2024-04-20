import React from "react";
import styles from "./CourseBoxSmall.module.css";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Season, StudentCourse, Course } from "../../types/TypeCourse";

import img_fall from "./../../images/fall.png";
import img_spring from "./../../images/spring.png";

import DistributionCircle from "./DistributionsCircle";

function CourseSeasonIcon(props: { seasons: Array<Season> }) {
  const seasonImageMap = {
    FALL: img_fall,
    SPRING: img_spring,
    SUMMER: "summer.png",
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

function CourseBoxSmall(props: { studentCourse?: StudentCourse, course?: Course } ) {
  /* Depending on if you pass through a student course or a normal course,
   it will render a different coursebox, with a checkmark for studentCourse
   and without for a normal course */
  if (props.studentCourse == null && props.course != null) {
    return (
      <div>
        <div className={styles.CourseBox} style={{ backgroundColor: "#F5F5F5" }}>
          <CourseSeasonIcon seasons={props.course.seasons} />
          {props.course.code}
          {props.course.distribution.length > 0 ? (
            <div style={{paddingLeft: "2px"}}>
              <DistributionCircle distributions={props.course.distribution}/>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  else if (props.course == null && props.studentCourse != null) {
    return (
    <div className={styles.CourseBox} style={{ backgroundColor: "#F5F5F5" }}>
        {props.studentCourse.enrollmentStatus === "COMPLETED" ? (
          <div
            style={{
              paddingLeft: "1px",
              paddingRight: "3px",
            }}
          >
            <div
              data-tooltip-id="check-tooltip"
              data-tooltip-content="Credit Confirmed by Yale"
              data-tooltip-place="top"
            >
              ✓
            </div>
            <Tooltip id="check-tooltip" style={{ 
            backgroundColor: "#444444",
            borderRadius: "3px"}}/>
          </div>
        ) : (
          ""
        )}
        <CourseSeasonIcon seasons={[props.studentCourse.season]} />
        {props.studentCourse.course.code}
        {props.studentCourse.course.distribution.length > 0 ? (
          <div style={{paddingLeft: "2px"}}>
          <DistributionCircle distributions={props.studentCourse.course.distribution}/>
          </div>
        ) : (
          ""
        )}
      </div>
      );
  }
  return <div/>
}

export default CourseBoxSmall;
