
"use client";
import { useAuth } from "@/context/AuthProvider";
import { usePrograms } from "@/context/ProgramProvider";

import { useState, useEffect } from "react";
import Style from "./Requirements.module.css";

import { Course, StudentConc } from "@/types/type-user";
import { ConcentrationSubrequirement, ConcentrationRequirement, MajorsIndex } from "@/types/type-program";

import { removeCourseInSubreq, addCourseInSubreq } from "./RequirementsUtils";
import { MajorsIcon } from "../course-icon/MajorsCourseIcon";

function RenderSubrequirementCourse(props: { 
	edit?: boolean; 
	course: Course | null; 
	subreq: ConcentrationSubrequirement; 
	onRemoveCourse: Function, 
	onAddCourse: Function 
}){
  const matchingStudentCourse = props.subreq.student_courses_satisfying.find(
    (studentCourse) => studentCourse.course === props.course
  );

  return (
    <div style={{ marginRight: "2px", marginBottom: "2px" }}>
      <MajorsIcon 
        edit={props.edit ?? false} 
        contentCourse={matchingStudentCourse ?? props.course} 
        subreq={props.subreq} 
        onRemoveCourse={props.onRemoveCourse} 
				onAddCourse={props.onAddCourse} 
      />
    </div>
  );
}

function RenderSubrequirement(props: { 
	edit: boolean, 
	majorsIndex: MajorsIndex, 
	reqIndex: number, 
	subreqIndex: number, 
	subreq: ConcentrationSubrequirement 
}){
	const { setUser } = useAuth();

	function handleRemoveCourse(course: Course | null, isStudentCourse: boolean = false){
    removeCourseInSubreq(setUser, props.majorsIndex, props.reqIndex, props.subreqIndex, course, isStudentCourse);
  }

	function handleAddCourse(courseCode: string){
    return addCourseInSubreq(setUser, props.majorsIndex, props.reqIndex, props.subreqIndex, courseCode);
  }

	const filteredCourses = 
	props.subreq.student_courses_satisfying.length >= props.subreq.courses_required
		? props.subreq.courses_options.filter((course) => 
				props.subreq.student_courses_satisfying.some((sc) => sc.course === course)
			)
		: props.subreq.courses_options;

  return(
    <div className={Style.Column} style={{ marginBottom: "12px" }}>
      <div className={Style.SubHeader} style={{ marginBottom: "2px" }}>
        {props.subreq.student_courses_satisfying.length}|{props.subreq.courses_required} {props.subreq.subreq_name}
      </div>
      <div className={Style.SubDesc}>
				{props.subreq.subreq_desc}
			</div>
      <div className={Style.Row} style={{ flexWrap: "wrap", marginLeft: "20px" }}>
        {filteredCourses.map((course, course_index) => (
          <RenderSubrequirementCourse 
						key={course_index}
						course={course} 
						subreq={props.subreq}
						edit={props.subreq.courses_any_bool ? props.edit : false}
						onRemoveCourse={handleRemoveCourse}
						onAddCourse={handleAddCourse}
					/>
        ))}
      </div>
    </div>
  );
}

function RenderRequirement(props: { 
	edit: boolean, 
	majorsIndex: MajorsIndex, 
	reqIndex: number, 
	req: ConcentrationRequirement 
}){
  return(
    <div className={Style.Column}>
      <div className={Style.Row} style={{ marginBottom: "2px", justifyContent: "space-between" }}>
        <div className={Style.ReqHeader}>
					{props.req.req_name}
				</div>
        <div className={Style.ReqHeader} style={{ marginRight: "20px" }}>
          {props.req.checkbox !== undefined ? props.req.courses_satisfied_count === props.req.courses_required_count ? "✅" : "❌" : `${props.req.courses_satisfied_count}|${props.req.courses_required_count}`}
        </div>
      </div>
			<div className={Style.SubDesc}>
					{props.req.req_desc}
			</div>
			<div className={Style.SubreqsList}>
        {props.req.subreqs_list.map((subreq, i) => (
          <RenderSubrequirement 
						key={i} 
						edit={props.edit} 
						majorsIndex={props.majorsIndex}
						reqIndex={props.reqIndex} 
						subreqIndex={i} 
						subreq={subreq} 
					/>
        ))}
      </div>
    </div>
  );
}

function Requirements(props: { 
	majorsIndex: MajorsIndex | null
}){
	if(props.majorsIndex == null){
		return(
			<div className={Style.RequirementsContainer}/>
		)
	}

	const [edit, setEdit] = useState(false);
	const { user } = useAuth();
	const { progList } = usePrograms();

	useEffect(() => {
		setEdit(false);
	}, [props.majorsIndex]);

	const userConc = user.FYP.decl_list.find((sc: StudentConc) =>
		sc.conc_majors_index.prog === props.majorsIndex?.prog &&
		sc.conc_majors_index.deg === props.majorsIndex?.deg &&
		sc.conc_majors_index.conc === props.majorsIndex?.conc
	);

	const conc = userConc ? userConc.user_conc : progList[props.majorsIndex.prog].prog_degs[props.majorsIndex.deg].deg_concs[props.majorsIndex.conc];

	return(
    <div className={Style.RequirementsContainer}>
      <div className={Style.RequirementsContainerHeader}>
        <div>
					Requirements
				</div>
				{userConc && 
					<div className={Style.EditButton} onClick={() => setEdit(!edit)}>
						⚙
					</div>
				}
      </div>
			<div className={Style.ReqsList}>
					{conc.conc_reqs.map((req: ConcentrationRequirement, reqIndex: number) => (
						<RenderRequirement 
							key={reqIndex} 
							edit={edit} 
							majorsIndex={props.majorsIndex!} 
							reqIndex={reqIndex} 
							req={req}
						/>
					))}
				</div>
    </div>
  );
}

export default Requirements;
