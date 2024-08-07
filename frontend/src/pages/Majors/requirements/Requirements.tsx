import React, { useState } from "react";
import Style from "./Requirements.module.css";
import { User } from "../../../commons/types/TypeUser";
import { Degree } from "../../../commons/types/TypeProgram";
import { StudentCourse } from "../../../commons/types/TypeCourse";
import { StudentCourseIcon } from "../../../commons/components/icons/CourseIcon";
import AddableCourse from "./icons/AddableCourse";
import RemovableCourse from "./icons/RemovableCourse";
import { OrIcon } from "../../../commons/components/icons/CourseIcon";
import { addCourseToSubsection, removeCourseFromSubsection, resetDegree } from "./RequirementsUtils";

function RequirementsContent(props: { edit: boolean, degree: Degree, user: User, setUser: Function }) {

  const renderCourses = (sub: any, reqIndex: number, subIndex: number) => {
    // Filter out courses with status 'HIDDEN'
    const visibleCourses = sub.courses.filter((studentCourse: StudentCourse) => studentCourse.status !== 'HIDDEN');

    if (visibleCourses.length > 20) {
      return (
        <div style={{ marginBottom: "4px" }}>
          <OrIcon studentCourses={visibleCourses} />
        </div>
      );
    } else {
      return visibleCourses.map((studentCourse: StudentCourse, studentCourseIndex: number) => (
        <div key={studentCourseIndex} style={{ display: "flex", marginBottom: "4px" }}>
          {props.edit && sub.flexible ? (
            <RemovableCourse 
              studentCourse={studentCourse} 
              removeStudentCourse={(studentCourse: StudentCourse) => removeCourseFromSubsection(studentCourse, reqIndex, subIndex, props.degree, props.user, props.setUser)}
            />
          ) : (
            <StudentCourseIcon studentCourse={studentCourse} />
          )}
        </div>
      ));
    }
  };

  return (
    <div className={Style.reqsList}>
      {props.degree.requirements.map((req, reqIndex) => (
        <div key={`req-${reqIndex}`}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={Style.subsectionHeader} style={{ marginBottom: "4px" }}>
              {req.name}
            </div>
            <div style={{ color: "grey" }}>
              N/N
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
                  {/* {sub.description && (<InfoButton text={sub.description} size={13} />)} */}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {renderCourses(sub, reqIndex, subIndex)}
                {props.edit && sub.flexible && (
                  <AddableCourse
                    user={props.user}
                    addCourseToSubsection={(studentCourse: StudentCourse) => addCourseToSubsection(studentCourse, reqIndex, subIndex, props.degree, props.user, props.setUser)}
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

function Requirements(props: { user: User, setUser: Function, degree: Degree }) {
  
  const [edit, setEdit] = useState(false);
  const updateEdit = () => {
    setEdit(!edit);
  };
  
  const handleResetDegree = () => {
    resetDegree(props.degree, props.user, props.setUser);
  };

  return (
    <div className={Style.reqsContainer}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <div style={{ fontSize: "30px" }}>
          Requirements
        </div>
        <div className={Style.row}>
          {edit && 
            (<div onClick={handleResetDegree} style={{ cursor: "pointer", fontSize: "30px" }}>
              ⟳
            </div>)
          }
          <div onClick={updateEdit} style={{ cursor: "pointer", fontSize: "30px" }}>
            ⚙
          </div>
        </div>
      </div>
      <RequirementsContent edit={edit} degree={props.degree} user={props.user} setUser={props.setUser} />
    </div>
  );
}

export default Requirements;
