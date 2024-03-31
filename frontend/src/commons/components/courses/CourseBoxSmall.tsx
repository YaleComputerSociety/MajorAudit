import React from "react";
import styles from "./CourseBoxSmall.module.css";

import { List } from "lodash";
import { Course, Season } from "../../types";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

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

function CourseBoxSmall(course: Course) {
  return (
    <div
      className={styles.CourseBox}
      style={{
        backgroundColor: course.status === "COMPLETED" ? "#E4E9F8" : "#F5F5F5",
      }}
    >
      {course.status === "COMPLETED" ? (
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
      <CourseSeasonIcon seasons={course.seasons} />
      {course.code}
      {course.distributions.length > 0 ? (
        <div style={{paddingLeft: "2px"}}>
          <div
            data-tooltip-id="distribution-tooltip"
            data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<CourseDistributionsText distributions={course.distributions}/>)}
            data-tooltip-place="top"
          >
          <DistributionCircle distributions={course.distributions} />
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

export default CourseBoxSmall;
