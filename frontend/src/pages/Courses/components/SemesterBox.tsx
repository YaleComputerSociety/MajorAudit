
import { useRef, useState, useEffect } from "react";
import styles from "./../Courses.module.css";
import CourseBox from "./CourseBox";
import { StudentCourse } from "../../../commons/types/TypeCourse";
import { User } from "../../../commons/types/TypeStudent";
import { getCTCourses } from "./../../../api/api";

const termMappings: { [key: string]: number } = {
	"Fall 2022": 202203,
	"Spring 2023": 202301,
	"Fall 2023": 202303,
	"Spring 2024": 202401,
	"Fall 2024": 202403,
	"Spring 2025": 202501,
	"Fall 2025": 202503,
	"Spring 2026": 202601,
};
const terms = Object.keys(termMappings);

function TermSelector(props: { selectedTerm: number, onSelectTerm: Function }){

  const [dropVis, setDropVis] = useState(false);
  const termSelectRef = useRef<HTMLDivElement>(null);

  const toggleDrop = () => {
    setDropVis(!dropVis);
  };

  const selectTerm = (term: string) => {
    props.onSelectTerm(termMappings[term]);
    setDropVis(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (termSelectRef.current && !termSelectRef.current.contains(event.target as Node)) {
      setDropVis(false);
    }
  };

  useEffect(() => {
    if (dropVis) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropVis]);

  return (
    <div ref={termSelectRef} className={styles.TermSelect} onClick={toggleDrop}>
      {Object.keys(termMappings).find(key => termMappings[key] === props.selectedTerm)}
      {dropVis && (
        <div className={styles.TermDrop}>
          {terms.map((term, index) => (
            <div key={index} onClick={() => selectTerm(term)}>
              {term}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddButton(props: { term: number, user: User, setUser: Function }) {
		
	const inputRef = useRef<HTMLInputElement>(null);
	const [active, setActive] = useState(false);
	const [searchData, setSearchData] = useState<any[]>([]);
	const [selectedTerm, setSelectedTerm] = useState(props.term);
	
	useEffect(() => {
		if(active){
			inputRef.current?.focus();
			getCTCourses(selectedTerm.toString()).then(data => {
				setSearchData(data);
				console.log("Retrieved");
			}).catch(error => {
				console.error(error);
			});
		}
	}, [active, selectedTerm]);

	const activate = () => {
		setActive(true);
	};

	const deactivate = () => {
		setActive(false);
	};
	
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		
		if(event.key === "Enter" && inputRef.current){
			
			const code = inputRef.current.value;
			const offering = searchData.find(course => course["course_code"] === code);

			if(offering){
				console.log("Offered");

				const codes = offering["course"]["listings"].map((l: any) => l["course_code"]);
				const title = offering["course"]["title"];
				const credit = 1;
				const areas = offering["course"]["areas"];
				const skills = offering["course"]["skills"];
				const seasons = ["Fall", "Spring"];

				const course = { codes, title, credit, areas, skills, seasons };

				const status = (selectedTerm === props.term) ? "MA_VALID" : "MA_HYPOTHETICAL";
				const term = props.term;
				const newCourse: StudentCourse = { course, term, status };

				const isDuplicate = props.user.studentCourses.some(existingCourse =>
          existingCourse.course.title === newCourse.course.title &&
          existingCourse.term === newCourse.term
        );

        if(isDuplicate){
					console.log("Duplicate.");
        }else{
          props.setUser((prevUser: User) => ({
						...prevUser,
						studentCourses: [...prevUser.studentCourses, newCourse]
					}));
					deactivate();
        }
			}
		}
	};
	
		return (
			<div>
				{!active ? (
					<div className={styles.addCourseButton} onClick={activate}>
						+
					</div>
				) : (
					<div className={styles.AddCourseBox}>
						<div className={styles.row} style={{ alignItems: "center" }}>

							<div onClick={deactivate} style={{ fontSize: '24px', cursor: 'pointer', padding: '5px' }}>
								-
							</div>
							<TermSelector selectedTerm={selectedTerm} onSelectTerm={setSelectedTerm}/>
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
				)}
			</div>
		);
	}


function SemesterBox(props: { edit: boolean, user: User, setUser: Function; term: number, TermSC: StudentCourse[] }) {
    
	let SCBoxes = props.TermSC.map((SC, index) => (
		<CourseBox key={index} edit={props.edit} SC={SC} user={props.user} setUser={props.setUser}/>
	));

	return (
		<div className={styles.column}>
			<div style={{ marginBottom: "6px" }}>

			</div>
			{SCBoxes}
			{props.edit && 
				(!props.TermSC.length || props.TermSC[0].status !== "DA_COMPLETE") && 
				(<AddButton term={props.term} user={props.user} setUser={props.setUser}/>)
			}
		</div>
	);
}

export default SemesterBox;




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
