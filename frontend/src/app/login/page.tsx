
"use client";
import Style from "./Login.module.css";
import NavBar from "@/components/navbar/NavBar";

function Login() 
{
  const handleLogin = () => {
    window.location.href = "/api/auth/cas/login";
  };
	
  return (
    <div>
			<NavBar loggedIn={false}/>
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
