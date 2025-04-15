
import Style from "./Overhead.module.css";
import FYPSelector from "./fypSelector/FYPselector";

function Overhead() 
{
  return (
		<div className={Style.Row}>
			<FYPSelector/>
		</div>
  );
}

export default Overhead;
