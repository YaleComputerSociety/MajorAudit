
import React from "react";
import styles from "./Courses.module.css";
import YearBox from "./components/YearBox";
import { MockStudent } from "./test";

export default function Courses() {

  const yearboxComponents = [];
  for (let i=0; i <MockStudent["metadata"].length; i++) {
    yearboxComponents.push(<YearBox {...MockStudent["metadata"][i]}/>); 
  }

  return(
    <div className={styles.container}>
      <div>
        {yearboxComponents}
      </div>
    </div>
  );
}
