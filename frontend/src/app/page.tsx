
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function MajorAudit()
{
  const router = useRouter();
	const { auth } = useAuth();

  useEffect(() => {
    if (auth.loggedIn) {
      router.replace("/courses");
    } else {
      router.replace("/login");
    }
  }, [auth, router]);

  return(
    <div>
			Loading...
    </div>
  );
}
