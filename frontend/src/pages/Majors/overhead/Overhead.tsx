
import Style from "./Overhead.module.css";
import { User } from "../../../commons/types/TypeUser";

import MajorSearchBar from "./search/MajorSearch";
import Pinned from "./pinned/Pinned";

function Overhead(props: { user: User, setCurrdex: Function }) {
  return (
		<div className={Style.Row}>
			<MajorSearchBar user={props.user} setCurrdex={props.setCurrdex}/>
			<div className={Style.Pinned}>
				PINNED
			</div>
			<Pinned user={props.user} setCurrdex={props.setCurrdex}/>
		</div>
  );
}

export default Overhead;
