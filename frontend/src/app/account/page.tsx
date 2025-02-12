
import Style from "./Account.module.css";
import NavBar from "@/components/navbar/NavBar";

import FirstShelf from "./meta-inputs/MetaInputs";

function Account(){
  return(
    <div>
			<NavBar/>
			<div className={Style.AccountPage}>
				<div className={Style.AccountContent}>
					<div style={{ fontSize: "30px", fontWeight: "500", marginBottom: "8px" }}>
						Profile
					</div>
					<div style={{ fontStyle: "italic", marginBottom: "20px" }}>
						Configure basic degree data.
					</div>
					<FirstShelf/>
				</div>				
			</div>
    </div>
  )
}

export default Account;