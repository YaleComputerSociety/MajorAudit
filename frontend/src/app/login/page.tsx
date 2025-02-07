
"use client";
import { useRouter } from "next/navigation";
import Style from "./Login.module.css";

import { useAuth } from "../providers";

function Login() 
{
  const router = useRouter();
  const { setAuth, setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", { method: "GET" });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setAuth({ loggedIn: true });
      setUser(data);

      router.push("/graduation");
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };
	

  return (
    <div>
      <div className={Style.centerDiv}>
        <div style={{ width: "450px" }}>
          <h1>Plan Your Major @ Yale</h1>
          <ul className={Style.featureListStyle}>
            <li className={Style.featureItemStyle}>Explore 80+ Majors</li>
            <li className={Style.featureItemStyle}>Check Distributional Requirements</li>
            <li className={Style.featureItemStyle}>Plan Four-Year Plan</li>
            <li className={Style.featureItemStyle}>Cool Guy</li>
          </ul>
          <div className={Style.loginButtons}>
            <div onClick={handleLogin} className={Style.btn}>
              Login w/ CAS
            </div>
          </div>
        </div>
        <img src="./guy.jpg" alt="Landing Page" width="450" />
      </div>
    </div>
  );
}

export default Login;
