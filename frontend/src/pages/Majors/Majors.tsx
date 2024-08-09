
import { useState } from "react";
import Style from "./Majors.module.css";
import { User } from "../../commons/types/TypeUser";

import NavBar from "./../../navbar/NavBar"
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors(props: { user: User, setUser: Function }){

  const [currdex, setCurrdex] = useState(0);
  const [currDegree, setCurrDegree] = useState(0);

	const alterCurrdex = (dir: number) => {
    setCurrdex((currdex + dir + props.user.programs.length) % props.user.programs.length);
    setCurrDegree(0);
  };

  const seeProgram = (dir: number) => {
    return props.user.programs[(currdex + dir + props.user.programs.length) % props.user.programs.length];
  };

  const alterCurrDegree = (num: number) => {
    setCurrDegree(num);
  };

  return (
    <div>
      <NavBar utility={<Overhead user={props.user} setCurrdex={setCurrdex}/>}/>
      <div className={Style.MajorsPage}>
        <Metadata
					user={props.user}
					setUser={props.setUser}
					currProgram={currdex}
          program={props.user.programs[currdex]}
          scrollProgram={alterCurrdex}
          seeProgram={seeProgram}
          whichDegree={currDegree}
          alterCurrDegree={alterCurrDegree}
        />
        <Requirements
					user={props.user}
					setUser={props.setUser}
          degree={props.user.programs[currdex].degrees[currDegree]}
        />
      </div>
    </div>
  );
}

export default Majors;
