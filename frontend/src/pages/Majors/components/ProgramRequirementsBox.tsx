
import { useState, useRef } from "react";
import styles from "./../Majors.module.css";

import InfoButton from "../../../navbar/InfoButton";

import { User } from "../../../commons/types/TypeUser";
import { Degree } from "../../../commons/types/TypeProgram";
import { StudentCourse } from "../../../commons/types/TypeCourse";
import { AmbiCourseIcon } from "../../../commons/components/icons/CourseIcon";

import SatisfyCourseButton from "./SatisfyCourseButton";

function RequirementsContent(props: { edit: boolean, degree: Degree, user: User, setUser: Function }) {

  const addCourseToSubsection = (course: StudentCourse, reqIndex: number, subIndex: number) => {
    const newRequirements = [...props.degree.requirements];
    newRequirements[reqIndex].subsections[subIndex].courses.push(course);
    props.setUser({ ...props.user, requirements: newRequirements });
  };

  return (
    <div className={styles.reqsList}>
      {props.degree.requirements.map((req, reqIndex) => (
        <div key={`req-${reqIndex}`}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.subsectionHeader} style={{ marginBottom: "4px" }}>
              {req.name}
            </div>
            <div style={{ color: "grey" }}>
              {/* {":("}/{Object.values(req.subsections).reduce((sum, subsection) => sum + subsection.courses.length, 0)} */}
            </div>
          </div>
          {req.description && (
            <div style={{ fontSize: "9px", fontStyle: "italic", marginBottom: "8px" }}>
              {req.description}
            </div>
          )}

          {req.subsections.map((sub, subIndex) => (
            <div key={subIndex} style={{ marginBottom: subIndex === req.subsections.length - 1 ? "14px" : "4px" }}>
              {sub.name && (
                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "13px", fontStyle: "semibold", marginBottom: "4px" }}>
                    {sub.name}
                  </div>
                  {sub.description && (<InfoButton text={sub.description} size={13} />)}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {sub.courses.map((course, courseIndex) => (
                  <div key={courseIndex} style={{ display: "flex", marginBottom: "4px", marginRight: courseIndex % 3 === 2 ? "10px" : "0" }}>
                    <AmbiCourseIcon ambiCourse={course} />
                    {/* {courseIndex < sub.courses.length - 1 && (courseIndex % 3 === 2 ? <br /> : <div>/</div>)} */}
                  </div>
                ))}
                {props.edit && (
                  <SatisfyCourseButton
                    user={props.user}
                    addCourseToSubsection={(course: StudentCourse) => addCourseToSubsection(course, reqIndex, subIndex)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProgramRequirementsBox(props: { user: User, setUser: Function, degree: Degree }) {
  
	const [edit, setEdit] = useState(false);
	const updateEdit = () => {
		console.log("updateEdit")
    setEdit(!edit);
  };
	
  const resetDegree = () => {
    // Functionality for reset icon click
  };

  return (
    <div className={styles.reqsContainer}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <div style={{ fontSize: "30px" }}>
          Requirements
        </div>
        <div className={styles.row}>
          {/* {edit && 
						(<div onClick={resetDegree} style={{ cursor: "pointer", fontSize: "30px" }}>
					 		⟳
          	</div>)
					} */}
          <div onClick={updateEdit} style={{ cursor: "pointer", fontSize: "30px" }}>
						⚙
          </div>
        </div>
      </div>
      <RequirementsContent edit={edit} degree={props.degree} user={props.user} setUser={props.setUser} />
    </div>
  );
}

export default ProgramRequirementsBox;
