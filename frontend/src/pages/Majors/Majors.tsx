
import { useState } from "react";

import Style from "./Majors.module.css";
import NavStyle from "./../../navbar/NavBar.module.css";

import Logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";

import ProgramRequirementsBox from "./components/ProgramRequirementsBox";
import ProgramMetadataBox from "./components/ProgramMetadataBox";

import { User } from "../../commons/types/TypeUser";
import { Program } from "./../../commons/types/TypeProgram";

function NavBar() {
  return (
    <div className={NavStyle.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={Logo} alt="" style={{ width: "150px", height: "auto", marginRight: "10px" }}/>
      </div>
      <PageLinks/>
    </div>
  );
}

function Majors(props: { user: User, setUser: Function }){

  const [currdex, setCurrdex] = useState(0);
  const [currDegree, setCurrDegree] = useState(0);

	let programs: Program[] = props.user.programs;
  
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

  return (
    <div>
      <NavBar/>
      <div className={Style.MajorsPage}>
        <ProgramMetadataBox
          program={programs[currdex]}
          scrollProgram={alterCurrdex}
          seeProgram={seeProgram}
          whichDegree={currDegree}
          alterCurrDegree={alterCurrDegree}
        />
        <ProgramRequirementsBox
					user={props.user}
					setUser={props.setUser}
          degree={programs[currdex].degrees[currDegree]}
        />
      </div>
    </div>
  );
}

export default Majors;
