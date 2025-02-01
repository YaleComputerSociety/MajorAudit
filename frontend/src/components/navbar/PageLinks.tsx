
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Style from "./NavBar.module.css";

function PageLinks()
{
  const pathname = usePathname();

  return(
    <div className={Style.row} style={{ marginRight: "20px" }}>
      <Link href="/graduation" className={pathname === "/graduation" ? Style.activeLink : Style.dormantLink}>
        Graduation
      </Link>
      <Link href="/courses" className={pathname === "/courses" ? Style.activeLink : Style.dormantLink}>
        Courses
      </Link>
      <Link href="/majors" className={pathname === "/majors" ? Style.activeLink : Style.dormantLink}>
        Majors
      </Link>
    </div>
  );
}

export default PageLinks;
