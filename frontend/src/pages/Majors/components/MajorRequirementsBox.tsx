
import React from "react";
import styles from "./../Majors.module.css";

import { Major } from "../../../commons/types"; 
import ClassBox from "../../../commons/components/CourseBox";

function RequirementsTopshelf(major: Major) {
  return(
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
      <div style={{ fontSize: "30px" }}>Requirements</div>
      <div style={{ fontSize: "18px" }}>List Graph</div>
    </div>
  );
}

function RequirementsContent(major: Major) {
  return(
    <div>
      {major.requirements.map((req) => (
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
                    <ClassBox text={course.name} distributions={["L"]} />
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

function MajorRequirementsBox(props: {major: Major}) {
  return (
    <div className={styles.reqsContainer}>
      <RequirementsTopshelf {...props.major} />
      <RequirementsContent {...props.major} />
    </div>
  );
}

export default MajorRequirementsBox;
