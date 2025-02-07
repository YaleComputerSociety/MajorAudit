
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function NotFoundPage() {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.loggedIn) {
      router.replace("/graduation");
    } else {
      router.replace("/login");
    }
  }, [auth.loggedIn, router]);

  return <div>Redirecting...</div>;
}
