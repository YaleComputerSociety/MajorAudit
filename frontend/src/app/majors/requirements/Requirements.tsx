
"use client";
import { useAuth } from "@/context/AuthProvider";
import { usePrograms } from "@/context/ProgramProvider";

import { useState, useEffect } from "react";
import Style from "./Requirements.module.css";

import { Course } from "@/types/type-user";
import { ConcentrationSubrequirement, ConcentrationRequirement, MajorsIndex, SubreqCourseOption } from "@/types/type-program";

import { getStudentConcentration, removeCourseInSubreq, addCourseInSubreq, toggleSubreqSelection } from "./RequirementsUtils";
import { MajorsIcon } from "../course-icon/MajorsCourseIcon";

function RenderSubrequirementCourse(props: { 
	edit?: boolean; 
	option: SubreqCourseOption; 
	subreq: ConcentrationSubrequirement; 
	onRemoveCourse: Function, 
	onAddCourse: Function 
}){
  return (
    <div style={{ marginRight: "2px", marginBottom: "2px" }}>
      <MajorsIcon 
        edit={props.edit ?? false} 
        contentCourse={props.option.s ?? props.option.o}  
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

	const satisfiedCount = props.subreq.subreq_options.filter(opt => opt.s !== null).length;
	const filteredCourses = satisfiedCount >= props.subreq.subreq_courses_req_count
		? props.subreq.subreq_options.filter(opt => opt.s !== null) 
		: props.subreq.subreq_options; 

  return(
    <div className={Style.Column} style={{ marginBottom: "12px" }}>
      <div className={Style.SubHeader} style={{ marginBottom: "2px" }}>
        {satisfiedCount}|{props.subreq.subreq_courses_req_count} {props.subreq.subreq_name}
      </div>
      <div className={Style.SubDesc}>
				{props.subreq.subreq_desc}
			</div>
      <div className={Style.Row} style={{ flexWrap: "wrap", marginLeft: "20px" }}>
        {filteredCourses.map((option, option_index) => (
          <RenderSubrequirementCourse 
						key={option_index}
						option={option} 
						subreq={props.subreq}
						edit={props.subreq.subreq_flex ? props.edit : false}
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
	const { user, setUser } = useAuth();
	const userConc = getStudentConcentration(user, props.majorsIndex);
	const selectedSubreqs = userConc?.selected_subreqs[props.reqIndex] ?? [];

	const visibleSubreqs = selectedSubreqs.length > 0 
    ? props.req.subreqs_list.filter((_, i) => selectedSubreqs.includes(i))
    : props.req.subreqs_list;

	function handleToggleSubreq(subreqIndex: number) {
		if(userConc && props.edit){
			toggleSubreqSelection(
				setUser, 
				props.majorsIndex, 
				props.reqIndex, 
				subreqIndex, 
				props.req.subreqs_required_count ?? props.req.subreqs_list.length
			);
		}
	}

	let dynamicRequiredCount: number | string = props.req.courses_required_count;
	if(props.req.courses_required_count === -1){
		dynamicRequiredCount = selectedSubreqs.length > 0 
			? selectedSubreqs.reduce((sum, idx) => sum + props.req.subreqs_list[idx].subreq_courses_req_count, 0)
			: "~"; 
	}

	const dynamicSatisfiedCount = props.req.subreqs_list.reduce(
		(sum, subreq) => sum + subreq.subreq_options.filter(option => option.s !== null).length,
		0
	);

  return(
    <div className={Style.Column}>
      <div className={Style.Row} style={{ marginBottom: "2px", justifyContent: "space-between" }}>
        <div className={Style.ReqHeader}>
					{props.req.req_name}
				</div>
				<div className={Style.ReqHeader} style={{ marginRight: "20px" }}>
					{props.req.checkbox !== undefined 
            ? dynamicSatisfiedCount === dynamicRequiredCount ? "✅" : "❌" 
            : `${dynamicSatisfiedCount}|${dynamicRequiredCount}`
          }         
				</div>
      </div>
			<div className={Style.SubDesc}>
					{props.req.req_desc}
			</div>

			{(props.req.subreqs_required_count !== undefined && props.req.subreqs_required_count < props.req.subreqs_list.length) && (
        <div className={Style.SubreqSelectionRow}>
          {props.req.subreqs_list.map((subreq, i) => (
            <button 
              key={i} 
              className={`${Style.SubreqOption} ${selectedSubreqs.includes(i) ? Style.Selected : ""}`}
							style={{ cursor: props.edit ? "pointer" : "default" }}
              onClick={() => handleToggleSubreq(i)}
            >
              {subreq.subreq_name}
            </button>
          ))}
        </div>
      )}

			<div className={Style.SubreqsList}>
        {visibleSubreqs.map((subreq, subreqIndex) => (
          <RenderSubrequirement 
						key={subreqIndex} 
						edit={props.edit} 
						majorsIndex={props.majorsIndex}
						reqIndex={props.reqIndex} 
						subreqIndex={subreqIndex} 
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
	const { progDict } = usePrograms();

	useEffect(() => {
		setEdit(false);
	}, [props.majorsIndex]);

	const userConc = getStudentConcentration(user, props.majorsIndex);
	const program = progDict[props.majorsIndex.prog];
	const conc = userConc 
		? userConc.user_conc 
		: program?.prog_degs[props.majorsIndex.deg].deg_concs[props.majorsIndex.conc];

	return(
    <div className={Style.RequirementsContainer}>
      <div className={Style.RequirementsContainerHeader}>
        <div>
					Requirements
				</div>
				{userConc && 
					<button className={Style.EditButton} onClick={() => setEdit(!edit)}>
						⚙
					</button>
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
