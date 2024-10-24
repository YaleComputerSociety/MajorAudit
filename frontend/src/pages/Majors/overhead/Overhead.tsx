
import Style from "./Overhead.module.css";
import { User } from "../../../commons/types/TypeUser";

import MajorSearchBar from "./search/MajorSearch";
import Pinned from "./pinned/Pinned";

function Overhead(props: { user: User, setProgramIndex: Function }) {
  return (
		<div className={Style.Row}>
			<MajorSearchBar user={props.user} setProgramIndex={props.setProgramIndex}/>
			<div className={Style.Pinned}>
				PINNED
			</div>
			<Pinned user={props.user} setProgramIndex={props.setProgramIndex}/>
		</div>
  );
}

export default Overhead;
