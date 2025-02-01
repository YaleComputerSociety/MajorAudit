
import Style from "./NavBar.module.css"
import LOGO from "./../commons/images/ma_logo.png";

import PageLinks from "./PageLinks";

function Bar(props: { utility?: React.ReactNode }) {
  return (
    <div className={Style.NavBar}>
			<div className={Style.Row}>
				<img src={LOGO} alt="" className={Style.Logo}/>
				{props.utility}
			</div>
      <PageLinks/>
    </div>
  );
}

export default Bar;
