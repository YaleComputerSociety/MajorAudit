import React from "react";
import { useState } from 'react'
import styles from "./CourseBoxSmall.module.css";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Dialog } from '@headlessui/react'

import { Season, StudentCourse, Course } from "../../types/TypeCourse";

import img_fall from "./../../images/fall.png";
import img_spring from "./../../images/spring.png";

import DistributionCircle from "./DistributionsCircle";

function CourseCheckmark(props: {enrollmentStatus: string}) {
  if (props.enrollmentStatus === "COMPLETED") {
    return (
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
    )
  }
  return <div></div>
}

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
  let [isOpen, setIsOpen] = useState(false)

  function CourseModal() {
    return (
      <Dialog className="Dialog" open={isOpen} onClose={closeModal}>
        <Dialog.Panel>
          <Dialog.Title>{props.course?.title}</Dialog.Title>
          <Dialog.Description>
            {props.course?.title}
          </Dialog.Description>
  
          <p>
          {props.course?.description}
          </p>
  
          <button onClick={closeModal}>Close</button>
        </Dialog.Panel>
      </Dialog>
    )
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  /* Depending on if you pass through a student course or a normal course,
   it will render a different coursebox, with a checkmark for studentCourse
   and without for a normal course */
  if (props.studentCourse == null && props.course != null) {
    return (
      <div>
        <div className={styles.CourseBox} style={{ backgroundColor: "#F5F5F5" }} onClick={openModal}>
          <CourseSeasonIcon seasons={props.course.seasons} />
          {props.course.code}
          {props.course.distribution.length > 0 ? (
              <DistributionCircle distributions={props.course.distribution} />
          ) : (
            ""
          )}
        </div>
        <CourseModal />
      </div>
    );
  }
  else if (props.course == null && props.studentCourse != null) {
    return (
      <div>
      <div className={styles.CourseBox} style={{ backgroundColor: "#F5F5F5" }} onClick={openModal}>
          <CourseCheckmark enrollmentStatus={props.studentCourse.enrollmentStatus}/>
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
        <CourseModal />
      </div>
      );
  }
  return <div/>
}

export default CourseBoxSmall;
