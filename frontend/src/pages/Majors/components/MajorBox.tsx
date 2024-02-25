
import React from "react";
import styles from "./../Majors.module.css"
import { Major } from "./../../../commons/types"

function MajorBoxSub(props: { maj: Major }) 
{
  return (
    <div className={styles.SubSection}>
      {/* <h3>{props.category}</h3> */}
    </div>
  );
}

function MajorBox() 
{
  return (
    <div className={styles.majorContainer}>
      <div>
        <h1>Political Science</h1>
        <div>
          {/* <MajorBoxSub maj="STATS"/>
          <MajorBoxSub category="ABOUT"/>
          <MajorBoxSub category="DUS"/> */}
        </div>
      </div>
    </div>
  );
}
  
export default MajorBox;