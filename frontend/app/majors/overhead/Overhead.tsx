
import Style from "./Overhead.module.css";
// import { User } from "@/types/type-user";
// import { MajorsIndex } from "@/types/type-user";

// import MajorSearchBar from "./major-search/MajorSearch";
// import Pinned from "./pinned/Pinned";

// function Overhead(props: { user: User, setIndex: React.Dispatch<React.SetStateAction<MajorsIndex | null>> }) 
function Overhead(props: { listView: boolean, setListView: Function }) 
{
  return (
		<div className={Style.Row}>
			{/* <MajorSearchBar user={props.user} setProgramIndex={props.setProgramIndex}/> */}
			<button 
				className={`${Style.ListButton} ${props.listView ? Style.ListButtonActive : ''}`}
				style={{ marginRight: "10px" }}
				onClick={() => props.setListView((prev: boolean) => !prev)}
			>
				List
			</button>
			<div className={Style.Pinned}>
				PINNED
			</div>
			{/* <Pinned user={props.user} setIndex={props.setIndex}/> */}
		</div>
  );
}

export default Overhead;
