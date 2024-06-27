import React, { useState, useEffect } from "react";
import styles from "./Courses.module.css";

import YearBox from "./components/YearBox";
// import AddCourseMenu from "./components/add_course/AddCourse";

// import MeDropdown from "../../navbar/account/MeDropdown";
import nav_styles from "./../../navbar/NavBar.module.css";
import img_logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";

function NavBar() {
  return (
    <div className={nav_styles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img
          src={img_logo}
          alt=""
          style={{ width: "150px", height: "auto", marginRight: "10px" }}
        />
      </div>
      <PageLinks/>
      {/* <MeDropdown/> */}
    </div>
  );
}

export interface DisplaySetting {
  rating: boolean;
  workload: boolean;
}

const defaultDisplaySetting = { rating: true, workload: true };

function Settings(props: {
  displaySetting: DisplaySetting;
  updateDisplaySetting: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const throwBack = (key: string) => {
    if (key === "rating") {
      const newSetting = {
        ...props.displaySetting,
        rating: !props.displaySetting.rating,
      };
      props.updateDisplaySetting(newSetting);
    } else if (key === "workload") {
      const newSetting = {
        ...props.displaySetting,
        workload: !props.displaySetting.workload,
      };
      props.updateDisplaySetting(newSetting);
    }
  };

  return (
    <div className={styles.row} style={{ alignItems: "center" }}>
      <button
        className={`${styles.optionsButton} ${
          isOpen ? styles.activeButton : ""
        }`}
        onClick={toggleDropdown}
      >
        Options
      </button>
      {isOpen && (
        <div style={{ display: "flex" }}>
          <button
            className={`${styles.optionsChoice} ${
              props.displaySetting.rating ? styles.activeButton : ""
            }`}
            onClick={() => throwBack("rating")}
          >
            Rating
          </button>
          <button
            className={`${styles.optionsChoice} ${
              props.displaySetting.workload ? styles.activeButton : ""
            }`}
            onClick={() => throwBack("workload")}
          >
            Workload
          </button>
        </div>
      )}
    </div>
  );
}

function Courses() {

  const [displaySetting, setDisplaySetting] = useState(defaultDisplaySetting);
  const updateDisplaySetting = (newSetting: DisplaySetting) => {
    setDisplaySetting(newSetting);
  };
  useEffect(() => {}, [displaySetting]);

  // yearTree
  const [yearTree, setYearTree] = useState([]);
  const syncCourses = () => {
    const localStorageYearTree = localStorage.getItem("yearTree");
    console.log(localStorageYearTree)
    if(localStorageYearTree){
      setYearTree(JSON.parse(localStorageYearTree));
    } else {
      setYearTree([]);
    }
  };

  useEffect(() => {
    syncCourses();
  }, []);


  const renderedYears = yearTree.map((year, index) => (
    <YearBox key={index} year={year} displaySetting={displaySetting}/>
  ));

  return (
    <div>
      <NavBar/>
      <Settings displaySetting={displaySetting} updateDisplaySetting={updateDisplaySetting}/>
      <div className={styles.CoursesPage}>
        <button className={styles.AddCourseButton} onClick={syncCourses}>+</button>
        <div className={styles.column}>{renderedYears}</div>
      </div>
    </div>
  );
}

export default Courses;