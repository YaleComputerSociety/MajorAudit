
import { useState } from "react";

import styles from "./Majors.module.css";

import NavStyle from "./../../navbar/NavBar.module.css";
import logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";


import ProgramRequirementsBox from "./components/ProgramRequirementsBox";
import ProgramMetadataBox from "./components/ProgramMetadataBox";

import { User } from "../../commons/types/TypeStudent";
import { Program } from "./../../commons/types/TypeProgram";
import { StudentCourse } from "./../../commons/types/TypeCourse";

// import NavBar from "./components/NavBar"

function NavBar() {
  return (
    <div className={NavStyle.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={logo} alt="" style={{ width: "150px", height: "auto", marginRight: "10px" }}/>
      </div>
      <PageLinks/>
    </div>
  );
}

function Majors(props: { user: User, setUser: Function }){

  /************************************************************************/

  const [currdex, setCurrdex] = useState(0);
  const [currDegree, setCurrDegree] = useState(0);
  
  const alterCurrdex = (dir: number) => {
    if(programs && programs.length > 0){
      setCurrdex((currdex + dir + programs.length) % programs.length);
      setCurrDegree(0);
    }
  };

  const seeProgram = (dir: number) => {
    if(programs && programs.length > 0){
      return programs[(currdex + dir + programs.length) % programs.length];
    }
    return null;
  };

  const alterCurrDegree = (num: number) => {
    setCurrDegree(num);
  };

  /************************************************************************/

  const storedPrograms = localStorage.getItem("programs");
  let programs: Program[] | null = null;
  if(storedPrograms){
    programs = JSON.parse(storedPrograms) as Program[];
  }

  const storedStudentCourses = localStorage.getItem("studentCourses");
  let studentCourses: StudentCourse[] = [];
  let studentCodes: Set<string> = new Set();
  if (storedStudentCourses) {
    studentCourses = JSON.parse(storedStudentCourses) as StudentCourse[];
    studentCodes = new Set(studentCourses.flatMap(studentCourse => studentCourse.course.codes));
  }

  if(!programs || programs.length === 0){
    return(
      <div><NavBar/><div>Empty Programs</div></div>
    ) 
  }

  /************************************************************************/

  return (
    <div>
      <NavBar/>
      <div className={styles.MajorsPage}>
        <ProgramMetadataBox
          program={programs[currdex]}
          scrollProgram={alterCurrdex}
          seeProgram={seeProgram}
          whichDegree={currDegree}
          alterCurrDegree={alterCurrDegree}
        />
        <ProgramRequirementsBox
          degree={programs[currdex].degrees[currDegree]}
          studentCourses={studentCourses}
          studentCodes={studentCodes}
        />
      </div>
    </div>
  );
}

export default Majors;
