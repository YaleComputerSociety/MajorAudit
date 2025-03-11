
import { useState } from "react";
import Style from "./Requirements.module.css";

import { Course } from "@/types/type-user";
import { ConcentrationSubrequirement, ConcentrationRequirement, DegreeConcentration } from "@/types/type-program";
import { CourseIcon } from "@/components/course-icon/CourseIcon";


function RenderSubrequirementCourse(props: { edit?: boolean, course: Course | null, subreq: ConcentrationSubrequirement }){

	if(props.course === null){
    return(
      <div className={Style.EmptyCourse} style={{ marginRight: "2px" }}>
				{props.edit ? (<div>e</div>) : (<div></div>)}
			</div>
    );
  }

	const matchingStudentCourse = props.subreq.student_courses_satisfying.find(
    (studentCourse) => studentCourse.course === props.course
  );

	return(
		<div style={{ marginRight: "2px", marginBottom: "2px" }}>
			<CourseIcon course={props.course} studentCourse={matchingStudentCourse}/>
		</div>
	)
}

function RenderSubrequirement(props: { edit: boolean, subreq: ConcentrationSubrequirement }) {
  const [showAll, setShowAll] = useState(false);

  // Separate null and non-null courses
  const nullCourses = props.subreq.courses_options.filter((course) => course === null);
  const nonNullCourses = props.subreq.courses_options.filter((course) => course !== null) as Course[];
  const satisfiedCourses = props.subreq.student_courses_satisfying.map((studentCourse) => studentCourse.course);

  // Determine which courses to show
  const isSatisfied = props.subreq.student_courses_satisfying.length === props.subreq.courses_required;
  const displayedNonNullCourses = showAll
    ? nonNullCourses
    : isSatisfied
    ? satisfiedCourses
    : nonNullCourses.slice(0, 4);

  // Ensure null courses are always displayed
  const displayedCourses = [...nullCourses, ...displayedNonNullCourses];

  return (
    <div className={Style.Column} style={{ marginBottom: "12px" }}>
      <div className={Style.SubHeader} style={{ marginBottom: "2px" }}>
        {props.subreq.student_courses_satisfying.length}|{props.subreq.courses_required} {props.subreq.subreq_name}
      </div>
      <div className={Style.SubDesc}>
				{props.subreq.subreq_desc}
			</div>
      <div className={Style.Row} style={{ flexWrap: "wrap", marginLeft: "20px" }}>
        {displayedCourses.map((course, index) => (
          <div key={index}>
            <RenderSubrequirementCourse 
							course={course} 
							subreq={props.subreq}
							{...(props.subreq.courses_any_bool ? { edit: props.edit } : {})} 
						/>
          </div>
        ))}
        {/* Toggle Button to Expand / Collapse */}
        {nonNullCourses.length > 4 && (
          <div className={Style.ToggleButton} onClick={() => setShowAll(!showAll)}>
            {showAll ? "<<" : ">>"}
          </div>
        )}
      </div>
    </div>
  );
}

function RenderRequirement(props: { edit: boolean, req: ConcentrationRequirement }){

	// const { user, setUser } = useAuth();
  // const { req, programIndex, degreeIndex } = props;
  const { subreqs_list, subreqs_required_count } = props.req;

  // // Get the correct degree configuration (assumes only one degree per program)
  // const degreeConfig = user.FYP.degreeConfigurations[programIndex][0];

  // Find the corresponding requirement in `degreeConfig`
  // const requirement = degreeConfig[0].reqs_list.find((r: DegreeRequirement) => r.req_name === req.req_name);

  // if (!requirement) return null; // Fail-safe, shouldn't happen

  // Move clicked subreq to the front if it's beyond the first `subreqs_required_count`
  // const handleSubreqClick = (subreq: DegreeSubrequirement) => {
  //   if (!subreqs_required_count) return; // Ignore clicks if not applicable

  //   setUser((prevUser: User) => {
  //     const newUser = { ...prevUser };

  //     // Get the degree and requirement again inside state update
  //     const updatedDegree = newUser.FYP.degreeConfigurations[programIndex][degreeIndex];
  //     const updatedRequirement = updatedDegree[0].reqs_list.find((r) => r.req_name === req.req_name); // FIXXX

  //     if (!updatedRequirement) return prevUser; // Failsafe

  //     const updatedSubreqs = [...updatedRequirement.subreqs_list];
  //     const index = updatedSubreqs.findIndex((s) => s.subreq_name === subreq.subreq_name);

  //     if (index >= subreqs_required_count) {
  //       // Move it to the front
  //       updatedSubreqs.splice(index, 1);
  //       updatedSubreqs.unshift(subreq);
  //     }

  //     // Update the requirement's subreqs_list in user state
  //     updatedRequirement.subreqs_list = updatedSubreqs;

  //     return newUser;
  //   });
  // };


  return (
    <div className={Style.Column}>
      <div className={Style.Row} style={{ marginBottom: "2px", justifyContent: "space-between" }}>
        <div className={Style.ReqHeader}>
					{props.req.req_name}
				</div>
        <div className={Style.ReqHeader} style={{ marginRight: "20px" }}>
          {props.req.checkbox !== undefined ? props.req.courses_satisfied_count === props.req.courses_required_count ? "✅" : "❌" : `${props.req.courses_satisfied_count}|${props.req.courses_required_count}`}
        </div>
      </div>

			<div className={Style.SubDesc} style={{ marginBottom: "4px" }}>
					{props.req.req_desc}
			</div>

			{/* Subreq Toggle Buttons - Only show if subreqs_required_count exists and < total subreqs */}
      {/* {subreqs_required_count && subreqs_list.length > subreqs_required_count && (
        <div className={Style.ButtonRow}>
          {subreqs_list.map((subreq, index) => (
            <div key={subreq.subreq_name} className={`${Style.SubreqButton} ${index < subreqs_required_count ? Style.Selected : ""}`} onClick={() => handleSubreqClick(subreq)}>
              {subreq.subreq_name}
            </div>
          ))}
        </div>
      )} */}

      {/* Display Selected Subreqs - Enforce subreqs_required_count if present */}
      <div style={{ marginLeft: "30px" }}>
        {subreqs_required_count
          ? subreqs_list.slice(0, subreqs_required_count).map((subreq, index) => (
              <RenderSubrequirement key={index} edit={props.edit} subreq={subreq}/>
            ))
          : subreqs_list.map((subreq, index) => (
              <RenderSubrequirement key={index} edit={props.edit} subreq={subreq}/>
            ))}
      </div>
    </div>
  );
}

function RequirementsContent(props: { edit: boolean, conc: DegreeConcentration })
{
  return(
    <div className={Style.ReqsList}>
			{props.conc.conc_reqs.map((req, index) => (
				<RenderRequirement key={index} edit={props.edit} req={req}/>
			))}
    </div>
  );
}

function Requirements(props: { conc: DegreeConcentration | null })
{
	const [edit, setEdit] = useState(false);

	if(props.conc == null){
		return(
			<div className={Style.RequirementsContainer}>
				<div className={Style.RequirementsContainerHeader}>
          Requirements
        </div>
			</div>
		)
	}

	return(
    <div className={Style.RequirementsContainer}>
      <div className={`${Style.RequirementsContainerHeader} ${props.conc.user_status == 1 ? Style.GoldBackground : ""}`}>
        <div>Requirements</div>
				{props.conc.user_status == 1 ? (<div className={Style.EditButton} onClick={() => setEdit(!edit)}>⚙</div>) : (<div/>)}
      </div>
			<div style={{ marginLeft: "10px" }}>
				<RequirementsContent edit={edit} conc={props.conc}/>
			</div>
    </div>
  );
}

export default Requirements;
