
"use client";
// import { useAuth } from "@/context/AuthProvider";
import { usePrograms } from "../../../context/ProgramProvider";

import { useState, useEffect } from "react";
import Style from "./Requirements.module.css";

// import { Course } from "@/types/type-user";
import { Subrequirement, Requirement, Option } from "@/types/program";
import { MajorsIndex } from "@/types/user";

// import { getStudentConcentration, removeCourseInSubreq, addCourseInSubreq, toggleSubreqSelection } from "./RequirementsUtils";
import { MajorsIcon } from "./course-icon/MajorsCourseIcon";

function RenderSubrequirementCourse(props: { 
	edit?: boolean; 
	option: Option; 
	subreq: Subrequirement; 
	// onRemoveCourse: void, 
	// onAddCourse: void 
}){
  return (
    <div style={{ marginRight: "2px", marginBottom: "2px" }}>
      <MajorsIcon 
        edit={props.edit ?? false} 
        contentCourse={props.option.satisfier ?? props.option.option}  
        subreq={props.subreq} 
        // onRemoveCourse={props.onRemoveCourse} 
				// onAddCourse={props.onAddCourse} 
      />
    </div>
  );
}

function RenderSubrequirement(props: { 
	edit: boolean, 
	majorsIndex: MajorsIndex, 
	reqIndex: number, 
	subreqIndex: number, 
	subreq: Subrequirement 
}){
	// const { setUser } = useUser();

	// function handleRemoveCourse(course: Course | null, isStudentCourse: boolean = false){
  //   // removeCourseInSubreq(setUser, props.majorsIndex, props.reqIndex, props.subreqIndex, course, isStudentCourse);
  // }

	// function handleAddCourse(courseCode: string){
  //   // return addCourseInSubreq(setUser, props.majorsIndex, props.reqIndex, props.subreqIndex, courseCode);
  // }

	const satisfiedCount = props.subreq.options.filter(opt => opt.satisfier !== null).length;
	const filteredCourses = satisfiedCount >= props.subreq.courses_required_count
		? props.subreq.options.filter(opt => opt.satisfier !== null) 
		: props.subreq.options; 

  return(
    <div className={Style.Column} style={{ marginBottom: "12px" }}>
      <div className={Style.SubHeader} style={{ marginBottom: "2px" }}>
        {satisfiedCount}|{props.subreq.courses_required_count} {props.subreq.name}
      </div>
      <div className={Style.SubDesc}>
				{props.subreq.description}
			</div>
      <div className={Style.Row} style={{ flexWrap: "wrap", marginLeft: "20px" }}>
        {filteredCourses.map((option, option_index) => (
          <RenderSubrequirementCourse 
						key={option_index}
						option={option} 
						subreq={props.subreq}
						edit={props.edit}
						// onRemoveCourse={handleRemoveCourse}
						// onAddCourse={handleAddCourse}
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
	req: Requirement
}){
	// const { user, setUser } = useUser();
	// const userConc = getStudentConcentration(user, props.majorsIndex);
	// const selectedSubreqs = userConc?.selected_subreqs[props.reqIndex] ?? [];
	const selectedSubreqs: number[] = [];

	const visibleSubreqs = selectedSubreqs.length > 0 
    ? props.req.subrequirements.filter((_, i) => selectedSubreqs.includes(i))
    : props.req.subrequirements;

	// function handleToggleSubreq(subreqIndex: number){
	// 	// if(userConc && props.edit){
	// 	// 	toggleSubreqSelection(
	// 	// 		setUser, 
	// 	// 		props.majorsIndex, 
	// 	// 		props.reqIndex, 
	// 	// 		subreqIndex, 
	// 	// 		props.req.subreqs_required_count ?? props.req.subrequirements.length
	// 	// 	);
	// 	// }
	// }

	let dynamicRequiredCount: number | string = props.req.courses_required_count;
	if(props.req.courses_required_count === -1){
		dynamicRequiredCount = selectedSubreqs.length > 0 
			? selectedSubreqs.reduce((sum, idx) => sum + props.req.subrequirements[idx].courses_required_count, 0)
			: "~"; 
	}

	const dynamicSatisfiedCount = props.req.subrequirements.reduce(
		(sum, subreq) => sum + subreq.options.filter(option => option.satisfier !== null).length,
		0
	);

  return(
    <div className={Style.Column}>
      <div className={Style.Row} style={{ marginBottom: "2px", justifyContent: "space-between" }}>
        <div className={Style.ReqHeader}>
					{props.req.name}
				</div>
				<div className={Style.ReqHeader} style={{ marginRight: "20px" }}>
					{props.req.checkbox 
            ? dynamicSatisfiedCount === dynamicRequiredCount ? "✅" : "❌" 
            : `${dynamicSatisfiedCount}|${dynamicRequiredCount}`
          }         
				</div>
      </div>
			<div className={Style.SubDesc}>
					{props.req.description}
			</div>

			{(props.req.subreqs_required_count !== undefined && props.req.subreqs_required_count < props.req.subrequirements.length) && (
        <div className={Style.SubreqSelectionRow}>
          {props.req.subrequirements.map((subreq, i) => (
            <button 
              key={i} 
              className={`${Style.SubreqOption} ${selectedSubreqs.includes(i) ? Style.Selected : ""}`}
							style={{ cursor: props.edit ? "pointer" : "default" }}
              // onClick={() => handleToggleSubreq(i)}
            >
              {subreq.name}
            </button>
          ))}
        </div>
      )}

			<div className={Style.SubreqsList}>
        {visibleSubreqs.map((subreq: Subrequirement, subreqIndex: number) => (
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
	const [edit, setEdit] = useState(false);
	// const { user } = useUser();
	const { progDict } = usePrograms();

	useEffect(() => {
		setEdit(false);
	}, [props.majorsIndex]);

	if(props.majorsIndex == null){
		return(
			<div className={Style.RequirementsContainer}/>
		)
	}

	// const userConc = getStudentConcentration(user, props.majorsIndex);
	const program = progDict[props.majorsIndex.prog];
	const conc = program?.degrees[props.majorsIndex.deg].concentrations[props.majorsIndex.conc];
	
	// const conc = userConc 
	// 	? userConc.user_conc 
	// 	: program?.prog_degs[props.majorsIndex.deg].deg_concs[props.majorsIndex.conc];

	return(
    <div className={Style.RequirementsContainer}>
      <div className={Style.RequirementsContainerHeader}>
        <div>
					Requirements
				</div>
				{/* {userConc && 
					<button className={Style.EditButton} onClick={() => setEdit(!edit)}>
						⚙
					</button>
				} */}
      </div>
			<div className={Style.ReqsList}>
					{conc.requirements.map((req: Requirement, reqIndex: number) => (
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
