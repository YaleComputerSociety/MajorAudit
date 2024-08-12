
import { useState } from "react";
import styles from "./Graduation.module.css";

import GraduationDistribution from "./components/Distribution";
import GraduationOverview from "./components/Overview";

import nav_styles from "./../../navbar/NavBar.module.css";
import img_logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";

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

  return (
    <div>
      <NavBar/>
      <div className={styles.GraduationPage}>
        <div className={styles.row}>
          <div className={styles.column} style={{ marginRight: "60px" }}>
            <Recommendations/>
            <GraduationDistribution currYear={currYear} alterCurrYear={alterCurrYear}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graduation;
