
// import { useState } from "react";
import styles from "./../Majors.module.css";

import InfoButton from "../../../navbar/InfoButton";

import { Degree } from "../../../commons/types/TypeProgram";
import { AmbiCourseIcon } from "../../../commons/components/icons/CourseIcon";

function RequirementsTopshelf(major: Degree) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
      <div style={{ fontSize: "30px" }}>Requirements</div>
      <div style={{ fontSize: "18px" }}>List</div>
    </div>
  );
}

function RequirementsContent(props: { degree: Degree }){

  return (
    <div className={styles.reqsList}>
      {
      props.degree.requirements.map((req, reqIndex) => (
        <div key={`req-${reqIndex}`}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.subsectionHeader} style={{ marginBottom: "4px" }}>
              {req.name}
            </div>
            <div style={{ color: "grey" }}>
              {":("}/{Object.values(req.subsections).reduce((sum, subsection) => sum + subsection.courses.length, 0)}
            </div>
          </div>
          {req.description && (
            <div style={{ fontSize: "9px", fontStyle: "italic", marginBottom: "8px" }}>
              {req.description}
            </div>
          )}

          {/* Line of Courses */}
          {req.subsections.map((sub, subIndex) => (
            <div key={subIndex} style={{ marginBottom: subIndex === req.subsections.length - 1 ? "14px" : "4px" }}>
              {sub.name && (
                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "13px", fontStyle: "semibold", marginBottom: "4px" }}>
                    {sub.name}
                  </div>
                  {sub.description && (<InfoButton text={sub.description} size={13}/>)}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {sub.courses.map((course, courseIndex) => (
                  <div key={courseIndex} style={{ display: "flex", marginBottom: "4px", marginRight: courseIndex % 3 === 2 ? "10px" : "0" }}>
										<AmbiCourseIcon ambiCourse={course}/>
                    {courseIndex < sub.courses.length - 1 && (courseIndex % 3 === 2 ? <br/> : <div>/</div>)}
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

function ProgramRequirementsBox(props: { degree: Degree }) {
  return (
    <div className={styles.reqsContainer}>
      <RequirementsTopshelf {...props.degree}/>
      <RequirementsContent degree={props.degree}/>
    </div>
  );
}

export default ProgramRequirementsBox;
