
"use client";
import Style from "./NavBar.module.css";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function AccountButton() {
  return(
    <div className={Style.Circle} style={{ marginLeft: "13px", marginRight: "35px" }}>
			<Image src="/profile.png" alt="" width={22} height={22}/>        
    </div>
  );
}

function PageLinks()
{
  const pathname = usePathname();

  return(
    <div className={Style.Row} style={{ alignItems: "center" }}>
      <Link href="/graduation" className={pathname === "/graduation" ? Style.activeLink : Style.dormantLink}>
        Graduation
      </Link>
      <Link href="/courses" className={pathname === "/courses" ? Style.activeLink : Style.dormantLink}>
        Courses
      </Link>
      <Link href="/majors" className={pathname === "/majors" ? Style.activeLink : Style.dormantLink}>
        Majors
      </Link>
			<Link href="/account">
				<AccountButton/>
      </Link>
    </div>
  );
}


function NavBar({utility, loggedIn = true }: { utility?: React.ReactNode; loggedIn?: boolean }) {
  return(
    <div className={Style.NavBar}>
      <div className={Style.Row}>
			<Image src="/logo.png" alt="" width={150} height={45} className={Style.Logo} priority/>        
        {utility}
      </div>
      {loggedIn && <PageLinks/>}
    </div>
  );
}

export default NavBar;
