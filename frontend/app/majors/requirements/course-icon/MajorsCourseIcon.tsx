
import { useState, useRef, useEffect } from "react";
import Style from "./MajorsCourseIcon.module.css"

import Image from "next/image";

import { Subrequirement } from "@/types/program";
import { StudentCourse, AbstractCourse } from "@/types/user";

import DistributionCircle from "../../../../components/distribution-circle/DistributionsCircle";

function SeasonComp(props: { seasons: string[] }) 
{
  const seasonImageMap: { [key: string]: string } = {
    "Fall":  "/fall.svg",
    "Spring": "/spring.svg",
  };

  return (
    <div style={{ display: "flex", marginRight: "2px", marginTop: "3px" }}>
      {props.seasons.map((szn, index) => (
        <div key={index} style={{ marginLeft: index > 0 ? "-7.5px" : 0 }}>
          {seasonImageMap[szn] && (
            <Image
              src={seasonImageMap[szn]}
              alt={szn}
              width={15}
              height={15}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function CourseIcon(props: { 
  edit: boolean; 
  course: AbstractCourse; 
  subreq: Subrequirement; 
  // onRemoveCourse: Function;
}){
  return (
    <div className={Style.Icon}>
      {/* {props.edit && (
        <RemoveButton onClick={() => props.onRemoveCourse(props.course, props.subreq, false)} />
      )} */}
      <SeasonComp seasons={[]}/>
      {props.course.codes[0]}
			<div style={{ marginLeft: "2px", marginTop: "5px" }}>
				<DistributionCircle distributions={props.course.distributions}/>
			</div>
    </div>
  );
}

function StudentCourseIcon(props: { 
  edit: boolean; 
  studentCourse: StudentCourse; 
  subreq: Subrequirement; 
  // onRemoveCourse: void;
}) {
  return (
    <div className={`${Style.Icon} ${Style.StudentCourseIcon}`}>
      {/* ✅ Only show remove button in edit mode */}
      {/* {props.edit && (
        <RemoveButton onClick={() => props.onRemoveCourse(props.studentCourse.course, props.subreq, true)} />
      )} */}
      ✓ {props.studentCourse.pref_code}
    </div>
  );
}

// function RemoveButton({ onClick }: { onClick: () => void }) {
//   return (
//     <div 
// 			className={Style.RemoveButton} 
// 			style={{ background: "#ffaaaa" }}
// 			onClick={onClick}
// 		/>
//   );
// }

function EmptyIcon(props: { 
  edit: boolean, 
  // onAddCourse: void, 
}){
  const [isAdding, setIsAdding] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        deactivate();
      }
    }

    if (isAdding) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding]);

  function activate() {
    setIsAdding(true);
  }

  function deactivate() {
    setIsAdding(false);
    setCourseCode("");
  }

  function handleAddCourse() {
    // const success = props.onAddCourse(courseCode.trim().toUpperCase());
    // if (success) {
    //   deactivate();
    // }
  }

  if (!props.edit) {
    return <div className={Style.Icon}/>;
  }

  return (
    <div>
      {!isAdding ? (
        <div className={Style.Icon} onClick={activate}>
          +
        </div>
      ) : (
        <div ref={popupRef} className={Style.Icon}>
          <button 
						className={Style.RemoveButton}
						style={{ background: "#ffaaaa" }}
						onClick={deactivate}
					/>
          <input 
            ref={inputRef} 
            type="text" 
            value={courseCode} 
            onChange={(e) => setCourseCode(e.target.value)}
            maxLength={9} 
            className={Style.CodeSearch}
          />
          <button 
						className={Style.RemoveButton}
						style={{ background: "#a4ffaf" }}
						onClick={handleAddCourse}
					/>
        </div>
      )}
    </div>
  );
}

export function MajorsIcon(props: { 
  edit: boolean; 
  contentCourse: AbstractCourse | StudentCourse | null; 
  subreq: Subrequirement; 
  // onRemoveCourse: void;
	// onAddCourse: void;
}) {
  if (!props.contentCourse) {
    // return <EmptyIcon edit={props.edit} onAddCourse={props.onAddCourse}/>;
		return <EmptyIcon edit={props.edit}/>;
  }

  const isStudentCourse = "course" in props.contentCourse;

  return isStudentCourse ? (
    <StudentCourseIcon 
      edit={props.edit} 
      studentCourse={props.contentCourse as StudentCourse} 
      subreq={props.subreq}
      // onRemoveCourse={props.onRemoveCourse} 
    />
  ) : (
    <CourseIcon 
      edit={props.edit} 
      course={props.contentCourse as AbstractCourse} 
      subreq={props.subreq}
      // onRemoveCourse={props.onRemoveCourse} 
    />
  );
}
