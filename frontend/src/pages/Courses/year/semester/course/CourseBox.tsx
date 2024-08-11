
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
    const updatedStudentCourses = props.user.studentCourses.filter(
      (course) => course.course.title !== props.SC.course.title || course.term !== props.SC.term
    );

    const updatedPrograms = props.user.programs.map((program) => {
      const updatedDegrees = program.degrees.map((degree) => {
        const isCoreCode = props.SC.course.codes.some(code => degree.codesCore.includes(code));
        const isAddedCode = props.SC.course.codes.some(code => degree.codesAdded.includes(code));

        if (isCoreCode || isAddedCode) {
          const updatedRequirements = degree.requirements.map((req) => {
            const updatedSubsections = req.subsections.map((sub) => {
              const updatedCourses = sub.courses.filter(
                (course) => course.course.title !== props.SC.course.title
              );
              return { ...sub, courses: updatedCourses };
            });
            return { ...req, subsections: updatedSubsections };
          });

          const newCodesAdded = degree.codesAdded.filter(code => !props.SC.course.codes.includes(code));

          return {
            ...degree,
            requirements: updatedRequirements,
            codesAdded: newCodesAdded
          };
        }
        return degree;
      });
      return { ...program, degrees: updatedDegrees };
    });

    const updatedUser = {
      ...props.user,
      studentCourses: updatedStudentCourses,
      programs: updatedPrograms
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
						<DistributionsCircle distributions={[...course.areas, ...course.skills]} />
					</div>
				</div>
			</div>
		);
}

export default CourseBox;
