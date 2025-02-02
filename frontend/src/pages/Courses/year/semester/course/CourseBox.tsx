
import Style from "./CourseBox.module.css";
import "react-tooltip/dist/react-tooltip.css";

import img_fall from "./../../../../../commons/images/fall.png";
import img_spring from "./../../../../../commons/images/spring.png";
import DistributionsCircle from "./../../../../../commons/components/icons/DistributionsCircle"

import { StudentCourse } from "../../../../../commons/types/TypeCourse";
import { User } from "../../../../../commons/types/TypeUser";
// import { useModal } from "../../../hooks/modalContext";

function RemoveCourse(props: { SC: StudentCourse, user: User, setUser: Function }){

	const remove = () => {
    // const updatedStudentCourses = props.user.FYP.studentCourses.filter(
    //   (course) => course.course.title !== props.SC.course.title || course.term !== props.SC.term
    // );

    const updatedDegreeConfigurations = props.user.FYP.degreeConfigurations.map((configurationList) =>
			configurationList.map((configuration) => {
				// const updatedRequirements = configuration.degreeRequirements.map((requirement) => {
				// 	const updatedSubsections = requirement.subsections.map((subsection) => {
				// 		const updatedCourses = subsection.courses.filter(
				// 			(course) => course.course.title !== props.SC.course.title
				// 		);
				// 		return { ...subsection, courses: updatedCourses };
				// 	});
		
				// 	return { ...requirement, subsections: updatedSubsections };
				// });
		
				const newCodesAdded = configuration.codesAdded.filter(
					(code) => !props.SC.course.codes.includes(code)
				);
		
				return {
					...configuration,
					codesAdded: newCodesAdded
				};
			})
		);

    const updatedUser = {
			...props.user,
			FYP: {
				...props.user.FYP,
				degreeConfigurations: updatedDegreeConfigurations
			}
		};

    props.setUser(updatedUser);
  };

	return( 
		<div className={Style.RemoveButton} onClick={remove}>
			
		</div>
	)
}

function CourseBox(props: {edit: boolean, SC: StudentCourse, user: User, setUser: Function  }) {
    
    // const { setModalOpen } = useModal();
    // function openModal() {
    //   setModalOpen(props.SC.course)
    // }

		const { status, term, course } = props.SC;

		const renderMark = () => {
			if(status === "DA_COMPLETE" || status === "DA_PROSPECT"){
				return (
					<div className={Style.checkmark}>
						✓
					</div>
				);
			}else if(status === "MA_HYPOTHETICAL" || "MA_VALID"){
				const mark = (status === "MA_HYPOTHETICAL") ? "⚠" : "☑";
				return (
					<div className={Style.row}>
						{props.edit && <RemoveCourse SC={props.SC} user={props.user} setUser={props.setUser} />}
						<div className={Style.checkmark}>
							{mark}
						</div>
					</div>
				);
			}
			return <div></div>;
		};
	
		const getBackgroundColor = () => (status === "DA_COMPLETE" ? "#E1E9F8" : "#F5F5F5");
		const getSeasonImage = () => (String(term).endsWith("3") ? img_fall : img_spring);
	
		return (
			<div className={Style.courseBox}  style={{ backgroundColor: getBackgroundColor() }}> 
			{/* onClick={openModal} */}

				<div className={Style.row} style={{ alignItems: "center" }}>
					{renderMark()}
					<img style={{ width: "15px", height: "15px", marginRight: "6px" }} src={getSeasonImage()} alt="" />
					<div>
						<div style={{ fontSize: "12px", fontWeight: "500" }}>
							{course.codes[0]}
						</div>
						<div style={{ fontSize: "8px", fontWeight: "500" }}>
							{course.title}
						</div>
					</div>
				</div>
				<div>
					<div className={Style.row} style={{ alignItems: "center" }}>
						<DistributionsCircle distributions={course.dist} />
					</div>
				</div>
			</div>
		);
}

export default CourseBox;
