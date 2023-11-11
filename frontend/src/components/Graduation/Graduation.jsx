import React from "react";
import GraduationOverview from "./GraduationOverview";
import GraduationDistributions from "./GraduationDistributions";

function Graduation() {
  return (
    <div classname="graduation">
      <h1>Graduation</h1>
      <GraduationOverview />
      <GraduationDistributions />
    </div>
  );
}

export default Graduation;