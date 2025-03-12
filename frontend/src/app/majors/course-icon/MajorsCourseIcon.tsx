
"use client";
import React from "react";
import Style from "./MajorsCourseIcon.module.css"

import { ConcentrationSubrequirement } from "@/types/type-program";
import { StudentCourse, Course } from "@/types/type-user";

import DistributionCircle from "@/components/distribution-circle/DistributionsCircle";


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

// ✅ Modify `MajorsCourseIcon` to handle remove clicks
function MajorsCourseIcon(props: { 
  edit: boolean; 
  course: Course; 
  subreq: ConcentrationSubrequirement; 
  onRemoveCourse: Function;
}) {
  return (
    <div className={`${Style.Icon} ${Style.CourseIcon}`}>
      {/* ✅ Only show remove button in edit mode */}
      {props.edit && (
        <RemoveButton onClick={() => props.onRemoveCourse(props.course, props.subreq, false)} />
      )}
      <CourseSeasonIcon seasons={props.course.seasons || []} />
      {props.course.codes[0]}
      <DistributionCircle distributions={props.course.dist} />
    </div>
  );
}

// ✅ Modify `MajorsStudentCourseIcon` to handle remove clicks
function MajorsStudentCourseIcon(props: { 
  edit: boolean; 
  studentCourse: StudentCourse; 
  subreq: ConcentrationSubrequirement; 
  onRemoveCourse: Function;
}) {
  return (
    <div className={`${Style.Icon} ${Style.StudentCourseIcon}`}>
      {/* ✅ Only show remove button in edit mode */}
      {props.edit && (
        <RemoveButton onClick={() => props.onRemoveCourse(props.studentCourse.course, props.subreq, true)} />
      )}
      ✓ {props.studentCourse.course.codes[0]}
    </div>
  );
}

// ✅ Modify `RemoveButton` to accept an `onClick` prop
function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <div className={Style.RemoveButton} onClick={onClick}>
      ❌ {/* Placeholder remove icon */}
    </div>
  );
}

function MajorsEmptyIcon({ edit }: { edit: boolean }) {
  return (
    <div className={`${Style.Icon} ${Style.EmptyIcon}`}>
      {edit && (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

export function MajorsIcon(props: { 
  edit: boolean; 
  contentCourse: Course | StudentCourse | null; 
  subreq: ConcentrationSubrequirement; 
  onRemoveCourse: Function;
}) {
  // If no course exists, render the "Add" icon
  if (!props.contentCourse) {
    return <MajorsEmptyIcon edit={props.edit} />;
  }

  // ✅ Determine if `contentCourse` is a StudentCourse (i.e., has a `course` field inside)
  const isStudentCourse = "course" in props.contentCourse;

  return isStudentCourse ? (
    <MajorsStudentCourseIcon 
      edit={props.edit} 
      studentCourse={props.contentCourse as StudentCourse} 
      subreq={props.subreq}
      onRemoveCourse={props.onRemoveCourse} 
    />
  ) : (
    <MajorsCourseIcon 
      edit={props.edit} 
      course={props.contentCourse as Course} 
      subreq={props.subreq}
      onRemoveCourse={props.onRemoveCourse} 
    />
  );
}
