
import React from "react";
import styles from "./../Majors.module.css"

function ReqBoxSub(props: { category: string; credits: number; total: number }) 
{
  return (
    <div className={styles.SubSection}>
      <h3>{props.category}  {props.credits}/{props.total}</h3>
    </div>
  );
}

function ReqBoxAll() 
{
  return (
    <div className={styles.reqsContainer}>
      <div>
        <h1>Requirements</h1>
        <div>
          <ReqBoxSub category="CORE" credits={2} total={5}/>
          <ReqBoxSub category="ELECTIVES" credits={2} total={5}/>
          <ReqBoxSub category="SENIOR REQUIREMENT" credits={2} total={5}/>
        </div>
      </div>
    </div>
  );
}
  
export default ReqBoxAll;