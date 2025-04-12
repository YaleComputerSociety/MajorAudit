
"use client";
import React, { useState, useEffect } from "react";
import Style from "./Graduation.module.css";

import { useAuth } from "../providers";
import { StudentSemester } from "@/types/type-user";

import NavBar from "@/components/navbar/NavBar";
import GraduationDistribution from "./graduation-distribution/GraduationDistribution";
import Recommendation from "./recommendation/Recommendation";

function Graduation()
{
  const {user, setUser} = useAuth();

  const UserYear = () => {
    return 2;
  };
  const [currYear, setCurrYear] = useState(UserYear());
  const alterCurrYear = (num: number) => {
    setCurrYear(num);
  };

return (
  <div>
    <NavBar/>
    <div className={Style.GraduationPage}>
      <div className={Style.row}>
        <div className={Style.column} style={{ marginRight: "60px" }}>
          {/* <Recommendations/> */}
          <Recommendation user={user} currYear={currYear}/>
          <GraduationDistribution currYear={currYear} alterCurrYear={alterCurrYear}/>
        </div>
      </div>
    </div>
  </div>
);
}

export default Graduation;