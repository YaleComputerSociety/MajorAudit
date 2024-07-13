
import React from "react";
import styles from "./CourseBoxSmall.module.css";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Course, StudentCourse } from "../../types/TypeCourse";

import img_fall from "./../../images/fall.png";
import img_spring from "./../../images/spring.png";
import DistributionCircle from "./DistributionsCircle";
// import ReactDOMServer from 'react-dom/server';

import { useModal } from "../../../hooks/modalContext";

// function CourseSeasonText(season: string ) {
//   return (
//     "Course Offered In " + season.charAt(0) + season.slice(1).toLowerCase()
//   );
// }

function CourseSeasonIcon(props: { seasons: Array<string> }) {
  const seasonImageMap: { [key: string]: string } = {
    "Fall": img_fall,
    "Spring": img_spring,
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
  return (
    <div style={{ marginLeft: "2px", marginTop: "2px" }}>
      <DistributionCircle distributions={props.dist} />
    </div>
  );
}

function CheckMark(props: { studentCourse: StudentCourse }) {
  return (
    <div>
      {props.studentCourse.status === "COMPLETE" ? (
        <div style={{ paddingLeft: "1px", paddingRight: "3px" }}>
          <div
            data-tooltip-id="check-tooltip"
            data-tooltip-content="Credit Confirmed by Yale"
            data-tooltip-place="top"
          >
            ✓
          </div>
          <Tooltip
            id="check-tooltip"
            style={{ backgroundColor: "#444444", borderRadius: "3px" }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function CourseBoxSmall(props: {studentCourse?: StudentCourse; course?: Course;}){
  
  const { setModalOpen } = useModal();

  function openModal() {
    if (props.course && props.studentCourse == null) {
      setModalOpen(props.course);
    } else if (props.course == null && props.studentCourse) {
      setModalOpen(props.studentCourse.course);
    }
  }

  if(props.course && props.studentCourse == null){
    let allDist = [...props.course.areas, ...props.course.skills];
    return (
      <div className={styles.CourseBox} onClick={openModal}>
        <CourseSeasonIcon seasons={props.course.seasons} />
        {props.course.codes[0]}
        {allDist.length > 0 ? (<DistCircDiv dist={allDist}/>) : ("")}
      </div>
    );
  }else if(props.course == null && props.studentCourse){
    let allDist = [...props.studentCourse.course.areas, ...props.studentCourse.course.skills];
    return (
      <div className={`${styles.CourseBox} ${styles.CourseBoxStudent}`} onClick={openModal}>
        <CheckMark studentCourse={props.studentCourse} />
        {/* <CourseSeasonIcon seasons={[props.studentCourse.season]} /> */}
        {props.studentCourse.course.codes[0]}
        {allDist.length > 0 ? (
          <DistCircDiv dist={allDist}/>) : ("")}
      </div>
    );
  }
  return <div />;
}

export default CourseBoxSmall;