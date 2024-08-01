
import React from "react";
import styles from "./CourseIcon.module.css";

import "react-tooltip/dist/react-tooltip.css";
import { Course, StudentCourse } from "../../types/TypeCourse";

import img_fall from "./../../images/fall.png";
import img_spring from "./../../images/spring.png";
import DistributionCircle from "./DistributionsCircle";

// import { useModal } from "../../../hooks/modalContext";

function CourseSeasonIcon(props: { seasons: Array<string> }){

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

function DistCircDiv(props: { dist: Array<string> }){
  
	if(props.dist.length === 0){
    return (
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

function CourseIcon(props: {studentCourse?: StudentCourse; course?: Course;}){
  
  // const { setModalOpen } = useModal();
  // function openModal() {
  //   if (props.course && props.studentCourse == null) {
  //     setModalOpen(props.course);
  //   } else if (props.course == null && props.studentCourse) {
  //     setModalOpen(props.studentCourse.course);
  //   }
  // }

	const mark = (status: string) => {
    let mark = "";
    switch(status) {
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
				return(
					<div className={styles.hidden}>
					
					</div>
				);
    }
    return (
        <div className={styles.Mark}>
            {mark}
        </div>
    );
	};

	// COURSE
  if(props.course){
    let dist = [...props.course.areas, ...props.course.skills];

    return(
			// onClick={openModal}
      <div className={styles.CourseIcon}>
        <CourseSeasonIcon seasons={props.course.seasons} />
        {props.course.codes[0]}
        {<DistCircDiv dist={dist}/>}
      </div>
    );
  }
	
	// STUDENTCOUSE
	if(props.studentCourse){
    let dist = [...props.studentCourse.course.areas, ...props.studentCourse.course.skills];

    return(
			// onClick={openModal}
      <div className={`${styles.CourseIcon} ${styles.CourseIconStudent}`}>
        {mark(props.studentCourse.status)}
        {props.studentCourse.course.codes[0]}
        {<DistCircDiv dist={dist}/>}
      </div>
    );
  }
  
	// NULL
	return(
		<div>

		</div>
	);
}

export default CourseIcon;
