
import React from "react";

import NavStyle from "./../../navbar/NavBar.module.css";
import LogoMA from "./../../commons/images/ma_logo.png";

import Style from "./Onboard.module.css";

function NavBar(){
  return(
    <div className={NavStyle.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={LogoMA} alt="" style={{ width: "150px", height: "auto" }}/>
      </div>
    </div>
  );
}

function OptionOne(){
	return(
		<div style={{ border: "1px solid red"}}>
			Scrape
		</div>
	)
}

function OptionTwo(){
	return(
		<div style={{ border: "1px solid green"}}>
			Input
		</div>
	)
}

function Onboard(props: { setAuth: Function }){
	
  return(
    <div>
			<NavBar/>
			<div className={Style.OnboardContainer} style={{ border: "1px solid blue"}}>
				Welsome To MajorAudit
				<div className={Style.Row}>
					<OptionOne/>
					<OptionTwo/>
				</div>
			</div>
    </div>
  );
}

export default Onboard;
