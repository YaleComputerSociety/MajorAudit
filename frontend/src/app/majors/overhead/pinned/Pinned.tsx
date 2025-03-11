
import Style from "./Pinned.module.css";

import { User, StudentConc } from "@/types/type-user";

function ConcIcon(props: { user: User, setIndex: Function, studentConc: StudentConc }) {

  return(
    <div className={Style.DegreeIcon} onClick={() => props.setIndex(props.studentConc.majors_index)}>
      📌{props.user.FYP.prog_list[props.studentConc.majors_index.prog].prog_data.prog_abbr}
    </div>
  );
}

function Pinned(props: { user: User, setIndex: Function }) {
  return (
		<div>
			{props.user.FYP.decl_list.map((studentConc, index) => (
				<ConcIcon key={index} user={props.user} setIndex={props.setIndex} studentConc={studentConc}/>
			))}
		</div>
  );
}

export default Pinned;
