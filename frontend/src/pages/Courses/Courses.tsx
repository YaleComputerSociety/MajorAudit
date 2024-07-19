import { useState, useEffect } from "react";
import { Year } from "./../../commons/types/TypeStudent";

import styles from "./Courses.module.css";

import YearBox from "./components/YearBox";
import nav_styles from "./../../navbar/NavBar.module.css";
import logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";

import { StudentCourse } from "../../commons/types/TypeCourse";

function NavBar() {
  return (
    <div className={nav_styles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={logo} alt="" style={{ width: "150px", height: "auto", marginRight: "10px" }}/>
      </div>
      <PageLinks/>
    </div>
  );
}

// export interface DisplaySetting {
//   rating: boolean;
//   workload: boolean;
// }

// const defaultDisplaySetting = { rating: true, workload: true };

// function Settings(props: {
//   displaySetting: DisplaySetting;
//   updateDisplaySetting: Function;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const throwBack = (key: string) => {
//     if (key === "rating") {
//       const newSetting = {
//         ...props.displaySetting,
//         rating: !props.displaySetting.rating,
//       };
//       props.updateDisplaySetting(newSetting);
//     } else if (key === "workload") {
//       const newSetting = {
//         ...props.displaySetting,
//         workload: !props.displaySetting.workload,
//       };
//       props.updateDisplaySetting(newSetting);
//     }
//   };

//   return (
//     <div className={styles.row} style={{ alignItems: "center" }}>
//       <button
//         className={`${styles.optionsButton} ${
//           isOpen ? styles.activeButton : ""
//         }`}
//         onClick={toggleDropdown}
//       >
//         Options
//       </button>
//       {isOpen && (
//         <div style={{ display: "flex" }}>
//           <button
//             className={`${styles.optionsChoice} ${
//               props.displaySetting.rating ? styles.activeButton : ""
//             }`}
//             onClick={() => throwBack("rating")}
//           >
//             Rating
//           </button>
//           <button
//             className={`${styles.optionsChoice} ${
//               props.displaySetting.workload ? styles.activeButton : ""
//             }`}
//             onClick={() => throwBack("workload")}
//           >
//             Workload
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

  // const [displaySetting, setDisplaySetting] = useState(defaultDisplaySetting);
  // const updateDisplaySetting = (newSetting: DisplaySetting) => {
  //   setDisplaySetting(newSetting);
  // };
  // useEffect(() => {}, [displaySetting]);

  // yearTree


function Courses(props: { GlobalSC: StudentCourse[], setGlobalSC: Function }){

  const [yearTree, setYearTree] = useState<Year[]>([]);
  const [renderedYears, setRenderedYears] = useState<JSX.Element[]>([]);
  const [edit, setEdit] = useState(false);

  const updateEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    const transformedData = yearTreeify(props.GlobalSC);
    setYearTree(transformedData);
  }, [props.GlobalSC]);

  const yearTreeify = (courses: StudentCourse[]) => {
    const academicYears: { [key: number]: Year } = {};

    courses.forEach(course => {
      const year = Math.floor(course.term / 100);
      const seasonCode = course.term % 100;
      const academicYearKey = seasonCode === 3 ? year : year - 1;

      if (!academicYears[academicYearKey]) {
        academicYears[academicYearKey] = {
          grade: 0,
          terms: [academicYearKey * 100 + 3, (academicYearKey + 1) * 100 + 1],
          fall: [],
          spring: [],
        };
      }

      if (seasonCode === 3) {
        academicYears[academicYearKey].fall.push(course);
      } else {
        academicYears[academicYearKey].spring.push(course);
      }
    });

    const sortedYears = Object.keys(academicYears)
      .map(key => parseInt(key))
      .sort((a, b) => a - b)
      .map((key, idx) => {
        academicYears[key].grade = idx + 1;
        return academicYears[key];
      });

    const lastYearKey = parseInt(Object.keys(academicYears).pop()!);
    for (let i = sortedYears.length; i < 4; i++) {
      const nextYearKey = lastYearKey + i - sortedYears.length + 1;
      sortedYears.push({
        grade: sortedYears.length + 1,
        terms: [nextYearKey * 100 + 3, (nextYearKey + 1) * 100 + 1],
        fall: [],
        spring: [],
      });
    }

    return sortedYears;
  };

  useEffect(() => {
    const newRenderedYears = yearTree.map((year, index) => (
      <YearBox key={index} year={year} edit={edit} GlobalSC={props.GlobalSC} setGlobalSC={props.setGlobalSC}/>
    ));
    setRenderedYears(newRenderedYears);
  }, [edit, yearTree]);

  return(
    <div>
      <NavBar/>
      <div className={styles.CoursesPage}>
        <button className={styles.AddCourseButton} onClick={updateEdit}>

				</button>
        <div className={styles.column}>
          {renderedYears}
        </div>
      </div>
    </div>
  );
}

export default Courses;
