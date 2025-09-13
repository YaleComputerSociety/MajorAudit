
"use client";
import Style from "./NavBar.module.css";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider"; // ✅ import auth provider

function AccountButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { logout } = useAuth(); // ✅ get logout from auth provider
  const router = useRouter();   // ✅ use Next.js router for redirect

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();         // ✅ clear client-side supabase auth
    router.push('/login');   // ✅ redirect to /login after logout
  };

  return (
    <div style={{ position: "relative", marginLeft: "13px", marginRight: "35px" }} ref={ref}>
      <div
        className={Style.Circle}
        onClick={() => setOpen(prev => !prev)}
        style={{ cursor: "pointer" }}
      >
        <Image src="/profile.png" alt="profile" width={22} height={22} />
      </div>

			{open && (
				<div className={Style.Dropdown}>
					<button 
						onClick={handleLogout}
						className={Style.DropdownItem}
						style={{ textAlign: "center", cursor: "pointer" }} // 🔥 magic line
					>
						Logout
					</button>
				</div>
			)}	

    </div>
  );
}

function PageLinks()
{
  const pathname = usePathname();

  return(
    <div className={Style.Row} style={{ alignItems: "center" }}>
      <Link href="/courses" className={pathname === "/courses" ? Style.activeLink : Style.dormantLink}>
        Courses
      </Link>
      <Link href="/majors" className={pathname === "/majors" ? Style.activeLink : Style.dormantLink}>
        Majors
      </Link>
			<AccountButton/>
    </div>
  );
}


function NavBar({utility, loggedIn = true }: { utility?: React.ReactNode; loggedIn?: boolean }) {
  return(
    <div className={Style.NavBar}>
      <div className={Style.Row}>
			<Image src="/ma.svg" alt="" width={40} height={40} style={{ marginRight: "20px" }} className={Style.Logo} priority/>        
        {utility}
      </div>
      {loggedIn && <PageLinks/>}
    </div>
  );
}

export default NavBar;
