import React from "react";
import YearBox from "./components/YearBox";
import { MockStudent } from "./test";

export default function Courses() {

  const yearboxComponents = [];
  for (let i=0; i <MockStudent["metadata"].length; i++) {
    yearboxComponents.push(<YearBox grade={MockStudent["metadata"][i]}/>); 
  }

  return (
    <div>
      {yearboxComponents}
    </div>
  );
}
