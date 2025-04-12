
// login/page.tsx

"use client";
import { useState, useEffect } from "react";
import Style from "./Login.module.css";
import NavBar from "../../components/navbar/NavBar";
import Image from "next/image";

function Login() 
{
	const [releaseDate, setReleaseDate] = useState("");
  
  useEffect(() => {
    const getFutureDate = () => {
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 2);
      
      const month = futureDate.getMonth() + 1; 
      const day = futureDate.getDate();
      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    };
    
    setReleaseDate(getFutureDate());
    
    const interval = setInterval(() => {
      setReleaseDate(getFutureDate());
    }, 86400000); 
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/cas/login";
  };
	
  return (
    <div className={Style.LoginPage}>
			<NavBar loggedIn={false}/>
      <div className={Style.Content}>
        <div style={{ width: "450px" }}>
          <h1>Plan Your Major @ Yale</h1>
          <ul className={Style.featureListStyle}>
            <li className={Style.featureItemStyle}>We Compile 87 Majors</li>
            <li className={Style.featureItemStyle}>You Construct 4 Year Plans</li>
						<li className={Style.featureItemStyle}>We Fill Out Your Major And Distributional Requirements</li>
            <li className={Style.featureItemStyle}>You Get Access Once We Add The New Programs</li>
          </ul>
          <div className={Style.loginButtons}>
            <div onClick={handleLogin} className={Style.btn}>
							Beta Release {releaseDate}
            </div>
          </div>
        </div>
        <Image src="/ma.png" alt="Landing Page" priority width={450} height={400}/>
      </div>
    </div>
  );
}

export default Login;
