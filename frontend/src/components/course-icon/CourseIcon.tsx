
import React from "react";
import styles from "./CourseIcon.module.css";

import { StudentCourse, Course } from "@/types/type-user";
import { RenderMark, GetCourseColor } from "@/utils/CourseDisplay";

import DistributionCircle from "../distribution-circle/DistributionsCircle";



// import { useModal } from "../../../hooks/modalContext";
// import "react-tooltip/dist/react-tooltip.css";

function CourseSeasonIcon(props: { seasons: Array<string> }) {
  const seasonImageMap: { [key: string]: string } = {
    "Fall":  "./fall.svg",
    "Spring":  "./spring.svg",
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

function DistCircDiv(props: { dist: string[] }) 
{
  if(!Array.isArray(props.dist) || props.dist.length === 0){
    return(
			<div>

			</div>
		);
  }

  return(
    <div style={{ marginLeft: "2px", marginTop: "2px" }}>
      <DistributionCircle distributions={props.dist} />
    </div>
  );
}


export function StudentCourseIcon(props: { studentCourse: StudentCourse, utilityButton?: React.ReactNode }) {
  
  const dist = props.studentCourse.course.dist || [];

  return (
    <div className={styles.CourseIcon} style={{ backgroundColor: GetCourseColor(props.studentCourse.term) }}>
      {props.utilityButton && props.utilityButton}
      {props.studentCourse.status === "" 
        ? <CourseSeasonIcon seasons={props.studentCourse.course.seasons || []} />
        : <RenderMark status={props.studentCourse.status}/>
      }
      {props.studentCourse.course.codes[0]}
      <DistCircDiv dist={dist} />
    </div>
  );
}


export function CourseIcon(props: { course: Course }){
  
  return(
    <div className={styles.CourseIcon} style={{ backgroundColor: "F5F5F5" }}>
      <CourseSeasonIcon seasons={props.course.seasons || []} />
      {props.course.codes[0]}
      <DistCircDiv dist={props.course.dist} />
    </div>
  );
}
