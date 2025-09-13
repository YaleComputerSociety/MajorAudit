// login/page.tsx

"use client";
import Style from "./Login.module.css";
import NavBar from "../../components/navbar/NavBar";
import Image from "next/image";

function Login() 
{
  const handleLogin = () => {
    // window.location.href = "/api/auth/cas/login";
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
            <div onClick={handleLogin} className={Style.btn} style={{ color: "white", marginTop: "22px" }}>
							Pre-Alpha 5/1
            </div>
          </div>
        </div>
        <Image src="/ma.svg" alt="Landing Page" priority width={450} height={400}/>
      </div>
    </div>
  );
}

export default Login;
