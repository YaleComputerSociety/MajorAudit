
import React from "react";
import styles from "./../Majors.module.css"

function MajorBoxSub(props: { category: string }) 
{
  return (
    <div className={styles.SubSection}>
      <h3>{props.category}</h3>
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
          <MajorBoxSub category="STATS"/>
          <MajorBoxSub category="ABOUT"/>
          <MajorBoxSub category="DUS"/>
        </div>
      </div>
    </div>
  );
}
  
export default MajorBox;