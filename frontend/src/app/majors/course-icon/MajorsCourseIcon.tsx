
import { useState, useRef, useEffect } from "react";
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

function MajorsCourseIcon(props: { 
  edit: boolean; 
  course: Course; 
  subreq: ConcentrationSubrequirement; 
  onRemoveCourse: Function;
}) {
  return (
    <div className={Style.Icon}>
      {props.edit && (
        <RemoveButton onClick={() => props.onRemoveCourse(props.course, props.subreq, false)} />
      )}
      <CourseSeasonIcon seasons={props.course.seasons || []}/>
      {props.course.codes[0]}
      <DistributionCircle distributions={props.course.dist}/>
    </div>
  );
}

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

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <div className={Style.RemoveButton} onClick={onClick}>

    </div>
  );
}

function MajorsEmptyIcon(props: { edit: boolean, onAddCourse: Function }) 
{
  const [isAdding, setIsAdding] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsAdding(false);
				setCourseCode("");
      }
    }

    if(isAdding){
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding]);

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

	function handleAddCourse() {
    const success = props.onAddCourse(courseCode);
    if(success){
      setIsAdding(false);
      setCourseCode("");
    }
  }

  return(
    <div className={Style.IconContainer}>
      {props.edit ? (
        <>
          <div className={Style.EmptyIcon} style={{ background: "grey" }} onClick={() => setIsAdding(true)}>
						
					</div>

          {isAdding && (
            <div ref={popupRef} className={Style.AddCoursePopup}>
              <input ref={inputRef} type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}/>
							<div className={Style.ConfirmButton} onClick={handleAddCourse}>✔</div>
            </div>
          )}
        </>
      ) : (
        <div className={Style.EmptyIcon}>

				</div>
      )}
    </div>
  );
}

export function MajorsIcon(props: { 
  edit: boolean; 
  contentCourse: Course | StudentCourse | null; 
  subreq: ConcentrationSubrequirement; 
  onRemoveCourse: Function;
	onAddCourse: Function;
}) {
  if (!props.contentCourse) {
    return <MajorsEmptyIcon edit={props.edit} onAddCourse={props.onAddCourse}/>;
  }

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
