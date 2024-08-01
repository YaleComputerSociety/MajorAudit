
import { useState, useEffect } from "react";
import { Year } from "./../../commons/types/TypeStudent";

import styles from "./Courses.module.css";

import YearBox from "./components/YearBox";
import nav_styles from "./../../navbar/NavBar.module.css";
import logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";

import { User } from "./../../commons/types/TypeStudent";
// import { StudentCourse } from "../../commons/types/TypeCourse";

import { yearTreeify } from "./utils/CoursesUtils";

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

function Courses(props: { user: User, setUser: Function }){

  const [yearTree, setYearTree] = useState<Year[]>([]);
  const [renderedYears, setRenderedYears] = useState<JSX.Element[]>([]);
  const [edit, setEdit] = useState(false);

  const updateEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    const transformedData = yearTreeify(props.user.studentCourses);
    setYearTree(transformedData);
  }, [props.user.studentCourses]);

  useEffect(() => {
    const newRenderedYears = yearTree.map((year, index) => (
      <YearBox key={index} year={year} edit={edit} user={props.user} setUser={props.setUser}/>
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