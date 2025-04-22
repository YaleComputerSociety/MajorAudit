// frontend/app/courses/overhead/Overhead.tsx

import Style from "./Overhead.module.css";
import PlanSelector from "./selector/PlanSelector";

function Overhead(props: { edit: boolean, toggleEdit: () => void }) 
{
  return (
		<div className={Style.Row}>
			<PlanSelector/>
			<button
				className={Style.EditButton}
				onClick={() => props.toggleEdit()}
			/>
		</div>
  );
}

export default Overhead;
