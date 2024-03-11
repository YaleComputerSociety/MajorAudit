
import React from "react";
import styles from "./../Majors.module.css";

import { Major } from "../../../commons/types"; 
import ClassBox from "../../../commons/components/CourseBox";

function MajorRequirementsBox(props: {major: Major}) {
  return (
    <div className={styles.reqsContainer}>
      <div className={styles.containerHeader}>Requirements</div>
      <div>
        {props.major.requirements.map((req) => (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: "grey" }}>{req.name}</div>
              <div style={{ color: "grey" }}>{req.coursesCompleted}/{req.coursesTotal}</div>
            </div>

            {/* Line of Courses */}
            {req.subsections.map((sub) => (
              <div>
                <div style={{ display: "flex" }}>
                  {sub.courses.map((course) => (<ClassBox text={course.name} distributions={["L"]}/>))}
                </div>
              </div>
            ))}

          </div>
        ))}
    </div>
    </div>
  );
}

export default MajorRequirementsBox;
