
import Style from "./Overhead.module.css";
import PlanSelector from "./selector/PlanSelector";

function Overhead() 
{
  return (
		<div className={Style.Row}>
			<PlanSelector/>
		</div>
  );
}

export default Overhead;
