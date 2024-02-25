import React from "react";
import YearBox from "./components/YearBox";

export default function Courses() {
  return (
    <div>
      <YearBox grade="First Year"/>
      <YearBox grade="Sophomore"/>
      <YearBox grade="Junior"/>
      <YearBox grade="Senior"/>
    </div>
  );
}
