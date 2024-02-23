import React from "react";
import styles from "./Majors.module.css";
import ReqBoxAll from "./components/RequirementsBox";
import MajorBox from "./components/MajorBox";

export const Majors = () => 
{
  return(
    <div>
    <MajorBox/>
    <div>
      <ReqBoxAll/>
    </div>
    </div>
  );
};

export default Majors;
