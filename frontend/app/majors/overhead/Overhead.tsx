
import Style from "./Overhead.module.css";
// import { User } from "@/types/type-user";
// import { MajorsIndex } from "@/types/type-user";

// import MajorSearchBar from "./major-search/MajorSearch";
// import Pinned from "./pinned/Pinned";

// function Overhead(props: { user: User, setIndex: React.Dispatch<React.SetStateAction<MajorsIndex | null>> }) 
function Overhead() 
{
  return (
		<div className={Style.Row}>
			{/* <MajorSearchBar user={props.user} setProgramIndex={props.setProgramIndex}/> */}
			<div className={Style.Pinned}>
				PINNED
			</div>
			{/* <Pinned user={props.user} setIndex={props.setIndex}/> */}
		</div>
  );
}

export default Overhead;
