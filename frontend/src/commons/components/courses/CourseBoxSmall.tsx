import React from "react";
import styles from "./CourseBoxSmall.module.css";

import { List } from "lodash";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Season, StudentCourse, Course } from "../../types/TypeCourse";

import img_fall from "./../../images/fall.png";
import img_spring from "./../../images/spring.png";

import DistributionBoxSmall from "./DistributionBoxSmall"
import DistributionCircle from "./DistributionsCircle";
import ReactDOMServer from 'react-dom/server';

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

 function CourseDistributionsText(props: { distributions: List<string>}) {
   const rows = [];
   for (let i = 0; i < props.distributions.length; i++) {
       rows.push(<DistributionBoxSmall text={props.distributions[i]}/>);
   }
   return (
     <div>Satisfies {rows} Requirement{props.distributions.length > 1 ? "s" : ""}</div>
   );
 }

function CourseBoxSmall(props: { studentCourse?: StudentCourse, course?: Course } ) {
  /* Depending on if you pass through a student course or a normal course,
   it will render a different coursebox, with a checkmark for studentCourse
   and without for a normal course */
  if (props.studentCourse == null && props.course != null) {
    return (
      <div className={styles.CourseBox} style={{ backgroundColor: "#F5F5F5" }}>
        <CourseSeasonIcon seasons={props.course.seasons} />
        {props.course.code}
        {props.course.distribution.length > 0 ? (
          <div style={{paddingLeft: "2px"}}>
            <div
              data-tooltip-id="distribution-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<CourseDistributionsText distributions={props.course.distribution}/>)}
              data-tooltip-place="top"
            >
            <DistributionCircle distributions={props.course.distribution} />
            </div>
            <Tooltip id="distribution-tooltip" border="1px solid black" style={{ 
              color: "black",
              backgroundColor: "white",
              borderRadius: "15px"}}/>
          </div>
        ) : (
          ""
        )}
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
            <Tooltip id="check-tooltip" border="1px solid black" style={{ 
              color: "black",
              backgroundColor: "white",
              borderRadius: "15px"}}/>
          </div>
        ) : (
          ""
        )}
        <CourseSeasonIcon seasons={[props.studentCourse.season]} />
        {props.studentCourse.course.code}
        {props.studentCourse.course.distribution.length > 0 ? (
          <div style={{paddingLeft: "2px"}}>
            <div
              data-tooltip-id="distribution-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<CourseDistributionsText distributions={props.studentCourse.course.distribution}/>)}
              data-tooltip-place="top"
            >
            <DistributionCircle distributions={props.studentCourse.course.distribution} />
            </div>
            <Tooltip id="distribution-tooltip" border="1px solid black" style={{ 
              color: "black",
              backgroundColor: "white",
              borderRadius: "15px"}}/>
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
