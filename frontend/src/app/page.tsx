
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./providers";

export default function MajorAudit() 
{
  const router = useRouter();
  const { auth } = useAuth(); 

  useEffect(() => {
    if(!auth.loggedIn){
      router.push("/login");
    }else if(!auth.onboard){
      router.push("/onboard");
    }else{
      router.push("/graduation");
    }
  }, [auth, router]);

  return(
    <div>
			Loading...
    </div>
  );
}
