
"use client";
import Image from "next/image";
import Style from "./NavBar.module.css";
import PageLinks from "./PageLinks";

function NavBar({utility}: {utility?: React.ReactNode}) {
  return(
    <div className={Style.NavBar}>
      <div className={Style.Row}>
			<Image src="/logo.png" alt="" width={150} height={45} className={Style.Logo} priority/>        
        {utility}
      </div>
      <PageLinks/>
    </div>
  );
}

export default NavBar;
