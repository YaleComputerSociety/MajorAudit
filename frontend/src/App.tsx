
import React, { useState } from 'react';
import styles from "./App.module.css";

import Graduation from "./pages/Graduation";
import Courses from "./pages/Courses";

import malogo from "./commons/images/malogo.png";

function NavBar(props: { setShowCourses: Function }) {
  return (
    <div className={styles.NavBar}>

      <div className={styles.column} style={{ alignItems: "center" }}>

        <img src={malogo} alt="" style={{ width: "40px", height: "auto", marginTop: "10px" }}/>
        
        <button className={styles.NavButton} onClick={() => props.setShowCourses((prev: boolean) => !prev)}>
          C
        </button>
      </div>

    </div>
  );
}

function App() {
  const [slideCourses, setSlideCourses] = useState(false);

  return (
    <div className={styles.row}>
      <NavBar setShowCourses={setSlideCourses}/>
      <div className={styles.Page}>
        <Graduation />
        <div className={`${styles.coursesContainer} ${slideCourses ? styles.coursesEnter : styles.coursesExit}`}>
          <Courses />
        </div>
      </div>
    </div>
  );
}

export default App;
