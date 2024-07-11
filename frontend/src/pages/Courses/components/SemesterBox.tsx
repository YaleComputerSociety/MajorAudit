
import { useRef, useState, useEffect } from "react"
import styles from "./../Courses.module.css"
import CourseBox from "./CourseBox";
import { StudentCourse } from "../../../commons/types/TypeCourse";
import { getCTCourses } from "../../../api/api";

function MetadataAll(props: { studentCourses: Array<StudentCourse> }){
    // let totalRating = 0;
    // let totalWorkload = 0;

    if (props.studentCourses.length === 0) {
        return <div></div>;
    }

    const areaSet = new Set<string>();
    const skillSet = new Set<string>();

    props.studentCourses.forEach(studentCourse => {
        // totalRating += course.course.evaluation.rating;
        // totalWorkload += course.course.evaluation.workload;

        studentCourse.course.areas.forEach(value => { areaSet.add(value); });
        studentCourse.course.skills.forEach(value => { skillSet.add(value); });
    });

    // const averageRating = totalRating / props.courses.length;
    // const averageWorkload = totalWorkload;

    const areaArray = Array.from(areaSet);
    const skillArray = Array.from(skillSet);
    const styleMapping = {
        "Hu": { backgroundColor: "#E6CFF4", color: "#9970AB", marginRight: "4px" },
        "So": { backgroundColor: "#CFE0F4", color: "#5493C4", marginRight: "4px"  },
        "Sc": { backgroundColor: "#D0F4CF", color: "#67AE5E", marginRight: "4px"  },
        "QR": { backgroundColor: "#F4CFCF", color: "#C1320A", marginRight: "4px"  },
        "WR": { backgroundColor: "#F4DCCF", color: "#E37F1D", marginRight: "4px"  },
        "L" : { backgroundColor: "#D2CEDB", color: "#231861", marginRight: "4px"  }
    };

    return(
        <div className={styles.row} style={{ marginBottom: "10px" }}>
            <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                <div className={styles.MetadataHeading}>
                    Credits
                </div>
                <div className={styles.countBox}>
                    {props.studentCourses.length}
                </div>
            </div>
            {/* {props.displaySetting.rating && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>Rating</div>
                    <div className={styles.evaluateBox}>{averageRating.toFixed(1)}</div>
                </div>
            )} */}
            {/* {props.displaySetting.workload && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>Workload</div>
                    <div className={styles.evaluateBox}>{averageWorkload.toFixed(1)}</div>
                </div>
            )} */}
            {areaArray.length > 0 && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>
                        Areas
                    </div>
                    <div className={styles.row}>
                        {areaArray.map((value, index) => (
                            <div className={styles.evaluateBox} key={index} style={styleMapping[value as keyof typeof styleMapping]}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {skillArray.length > 0 && (
                <div className={styles.MetadataColumn} style={{ marginRight: "18px" }}>
                    <div className={styles.MetadataHeading}>
                        Skills
                    </div>
                    <div className={styles.row}>
                        {skillArray.map((value, index) => (
                            <div className={styles.evaluateBox} key={index} style={styleMapping[value as keyof typeof styleMapping]}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function CodeSearch(props: {}){

}



function AddButton(props: { term: number }){

	const inputRef = useRef<HTMLInputElement>(null);
	const [active, setActive] = useState(false);
	useEffect(() => { 
		if(active) {
			inputRef.current?.focus();
		}
	}, [active]);

	let searchData: any[] = []

	const activate = () => {
		// setActive(true)
		// const trueData = localStorage.getItem(props.term);
		// if(!trueData){
    //   getCTCourses(props.term)
    //     .then((data) => {
		// 			searchData = data;
    //       localStorage.setItem(props.term, JSON.stringify(data));
    //       setActive(true);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
	}

	const deactivate = () => {
		setActive(false)
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter" && inputRef.current){
      const val = inputRef.current.value;
			const match = searchData.find(course => course.course_code === val);
			// if(match){
			// 	const newStudentCourse = {
			// 		course: {

			// 		},
			// 		status: ,
			// 		season: ,
			// 		year: ,
			// 	}
			// }

    }
  };

	if(!active){
		return(
			<div className={styles.addCourseButton} onClick={activate}>
				+
			</div>
		)
	}else{
		return(
			<div className={styles.courseBox}>
				<div className={styles.row}>
					<div onClick={deactivate}>
						-
					</div>
					<input 
						ref={inputRef} 
						type="text" 
						placeholder="e.g. FREN 401" 
						maxLength={9} 
						onKeyPress={handleKeyPress}
						className={styles.CodeSearch}
					/>
				</div>
			</div>
		);
	}
}

function SemesterBox(props: { edit: boolean, term: number, studentCourses: Array<StudentCourse> }) {
    
	const studentCourses = props.studentCourses || [];
	const studentCourseComponents = studentCourses.map((studentCourses, index) => (
		<CourseBox key={index} course={studentCourses}/>
	));

	return (
		<div className={styles.column}>
			{/* <MetadataAll studentCourses={props.studentCourses} /> */}
			<div style={{ marginBottom: "6px" }}>

			</div>
			{studentCourseComponents}
			{props.edit && 
				(!props.studentCourses.length || props.studentCourses[0].status !== "COMPLETE") && 
				(<AddButton term={props.term}/>)
			}
		</div>
	);
}

export default SemesterBox;
