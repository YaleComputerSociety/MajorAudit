
import { useState } from "react";
import { User } from "../../types/TypeUser";
import { DegreeMetadata } from "../../types/TypeProgram";
import { ALL_PROGRAM_METADATAS } from "../../commons/mock/MockDegreeMetadata";

import Style from "./Majors.module.css";
import NavBar from "./../../navbar/NavBar"
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors(props: { user: User, setUser: Function }){

  const [programIndex, setProgramIndex] = useState(0);

	const allProgramMetadatas: DegreeMetadata[][] = ALL_PROGRAM_METADATAS;

	const shiftProgramIndex = (dir: number) => {
    setProgramIndex((programIndex + dir + allProgramMetadatas.length) % allProgramMetadatas.length);
  };

  const peekProgram = (dir: number) => {
    return allProgramMetadatas[(programIndex + dir + allProgramMetadatas.length) % allProgramMetadatas.length][0];
  };

  return(
    <div>
      <NavBar utility={<Overhead user={props.user} setProgramIndex={setProgramIndex}/>}/>
      <div className={Style.MajorsPage}>
        <Metadata
					user={props.user} 
					setUser={props.setUser}
          programMetadatas={allProgramMetadatas[programIndex]}
					programIndex={programIndex}
					shiftProgramIndex={shiftProgramIndex}
					peekProgram={peekProgram}
        />
        <Requirements
					user={props.user}
					setUser={props.setUser}
          degreeConfiguration={props.user.FYP.degreeConfigurations[programIndex][0]}
        />
      </div>
    </div>
  );
}

export default Majors;
