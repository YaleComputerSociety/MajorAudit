
import React from "react";
import styles from "./../Majors.module.css";

import InfoButton from "../../../navbar/InfoButton";

import { Degree } from "../../../commons/types/TypeProgram";
import CourseBoxSmall from "../../../commons/components/courses/CourseBoxSmall";

import { Course, StudentCourse } from "../../../commons/types/TypeCourse";

function PairCourse(props: { studentCourses: StudentCourse[], studentCodes: Set<string>, course: Course }){

  let pairCode: string | undefined;
  const isInPropsCodes = props.course.codes.some((code: string) => {
    if (props.studentCodes.has(code)) {
      pairCode = code;
      return true;
    }
    return false;
  });


  let pairStudentCourse = undefined;
  if (isInPropsCodes && props.studentCourses) {
    pairStudentCourse = props.studentCourses.find(
      (studentCourse) => studentCourse.course.codes.some(
        (code: string) => code === pairCode
      )
    );
  }

  return(
    <CourseBoxSmall 
      course={!isInPropsCodes ? props.course as Course : undefined}
      studentCourse={isInPropsCodes ? pairStudentCourse : undefined}
    />
  )
}

function RequirementsTopshelf(major: Degree) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
      <div style={{ fontSize: "30px" }}>Requirements</div>
      <div style={{ fontSize: "18px" }}>List Graph</div>
    </div>
  );
}

function RequirementsContent(props: { degree: Degree, studentCourses: StudentCourse[], studentCodes: Set<string> }){
  return (
    <div className={styles.reqsList}>
      {props.degree.requirements.map((req, reqIndex) => (
        <div key={`req-${reqIndex}`}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.subsectionHeader} style={{ marginBottom: "4px" }}>
              {req.name}
            </div>
            <div style={{ color: "grey" }}>
              {req.coursesCompleted}/{req.coursesTotal}
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
                    <PairCourse studentCourses={props.studentCourses} studentCodes={props.studentCodes} course={course}/>
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

function ProgramRequirementsBox(props: { degree: Degree, studentCourses: StudentCourse[], studentCodes: Set<string> }) {
  return (
    <div className={styles.reqsContainer}>
      <RequirementsTopshelf {...props.degree} />
      <RequirementsContent degree={props.degree} studentCourses={props.studentCourses} studentCodes={props.studentCodes} />
    </div>
  );
}

export default ProgramRequirementsBox;
