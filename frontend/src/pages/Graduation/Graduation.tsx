
import { useState } from "react";
import styles from "./Graduation.module.css";

import { syncData, getData } from "../../api/api";

import GraduationDistribution from "./components/Distribution";
import GraduationOverview from "./components/Overview";

import { CPSC, CGSC } from "./../../commons/mock/MockProgram";
import { ECON } from "./../../commons/mock/programs/Econ";
// import MeDropdown from "../../navbar/account/MeDropdown";
import nav_styles from "./../../navbar/NavBar.module.css";
import img_logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";

import { ryan } from "../../commons/mock/MockStudent"

function NavBar() {
  return (
    <div className={nav_styles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={img_logo} alt="" style={{ width: "150px", height: "auto", marginRight: "10px" }}/>
      </div>
      <PageLinks/>
      {/* <MeDropdown/> */}
    </div>
  );
}

function Recommendations() {
  return(
    <div>
      <div style={{ fontSize: "30px", fontWeight: "500" }}>Hello, Ryn!</div>
    </div>
  );
}

function Graduation(){

  const UserYear = () => {
    return 2;
  };
  const [currYear, setCurrYear] = useState(UserYear());
  const alterCurrYear = (num: number) => {
    setCurrYear(num);
  };

  const initLocalStorage = async () => {
    try {
      const allData = ryan;
      // const allData = await getData();
      // if (!allData) {
      //   console.error("No Data Returned By getData()");
      //   return;
      // }
  
      const jsonData = typeof allData === "object" ? JSON.stringify(allData) : allData;
  
      let parsedData;
      try {
        parsedData = JSON.parse(jsonData);
        console.log("Parsed JSON Data: ", parsedData);
      } catch (error) {
        console.error("Failed To Parse JSON Data From getData: ", error);
        return;
      }

      localStorage.setItem("name", JSON.stringify(parsedData?.name));
      localStorage.setItem("studentCourses", JSON.stringify(parsedData?.studentCourses));
      localStorage.setItem("yearTree", JSON.stringify(parsedData?.yearTree));
      localStorage.setItem("programs", JSON.stringify([CPSC, ECON, CGSC]));

    }catch(error){
      console.error("initLocalStorage Error: ", error);
    }
  };


  return (
    <div>
      <NavBar/>
      <div className={styles.GraduationPage}>
        <div className={styles.row}>
          <div className={styles.column} style={{ marginRight: "60px" }}>
            <Recommendations/>
            <div onClick={initLocalStorage} className={styles.btn}>
              Init Local
            </div>
            <GraduationDistribution currYear={currYear} alterCurrYear={alterCurrYear}/>
          </div>
          <GraduationOverview degree={CPSC.degrees[0]}/>
        </div>
      </div>
    </div>
  );
}

export default Graduation;
