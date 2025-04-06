
// login/page.tsx

"use client";
import Style from "./Login.module.css";
import NavBar from "../../components/navbar/NavBar";
import Image from "next/image";

function Login() 
{
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
            <li className={Style.featureItemStyle}>Explore 80+ Majors</li>
            <li className={Style.featureItemStyle}>Check Distributional Requirements</li>
            <li className={Style.featureItemStyle}>Plan Four-Year Plan</li>
            <li className={Style.featureItemStyle}>March Madness</li>
          </ul>
          <div className={Style.loginButtons}>
            <div onClick={handleLogin} className={Style.btn}>
              Beta Release 04/07
            </div>
          </div>
        </div>
        <Image src="/ma.png" alt="Landing Page" priority width={450} height={400}/>
      </div>
    </div>
  );
}

export default Login;
