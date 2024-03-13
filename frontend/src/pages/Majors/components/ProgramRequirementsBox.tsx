
import React from "react";
import styles from "./../Majors.module.css";

import { Degree } from "../../../commons/types"; 
import CourseBox from "../../../commons/components/courses/CourseBox";

function RequirementsTopshelf(major: Degree) {
  return(
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
      <div style={{ fontSize: "30px" }}>Requirements</div>
      <div style={{ fontSize: "18px" }}>List Graph</div>
    </div>
  );
}

function RequirementsContent(degree: Degree) {
  return(
    <div>
      {degree.requirements.map((req) => (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.subsectionHeader} style={{ marginBottom: "4px" }}>{req.name}</div>
            <div style={{ color: "grey" }}>{req.coursesCompleted}/{req.coursesTotal}</div>
          </div>
          {req.description && (<div style={{ fontSize: "9px", fontStyle: "italic", marginBottom: "8px" }}>{req.description}</div>)}

          {/* Line of Courses */}
          {req.subsections.map((sub, subIndex) => (
            <div key={subIndex} style={{ marginBottom: subIndex === req.subsections.length - 1 ? "14px" : "4px" }}>
              <div style={{ display: "flex" }}>
                {sub.courses.map((course, courseIndex) => (
                  <div key={courseIndex} style={{ display: "flex" }}>
                    <CourseBox text={course.name} distributions={["QR"]} />
                    {courseIndex < sub.courses.length - 1 && <div>/</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProgramRequirementsBox(props: {degree: Degree}) {
  return (
    <div className={styles.reqsContainer}>
      <RequirementsTopshelf {...props.degree} />
      <RequirementsContent {...props.degree} />
    </div>
  );
}

export default ProgramRequirementsBox;
