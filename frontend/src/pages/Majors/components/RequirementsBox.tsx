
import React from "react";
import styles from "./../Majors.module.css"

function ReqBoxSub(props: { category: string; courses: string; credits: number; total: number }) 
{
  return (
    <div className={styles.ReqSub}>
      <h3>{props.category} <div style={{display: "inline-block", float: "right", marginRight: "-200px"}}>{props.credits}/{props.total}</div></h3>
      <p>{props.courses}</p>
    </div>
  );
}

function ReqBoxAll() 
{
  return (
    <div className={styles.FloatRight}>
      <div className={styles.Requirements}>
        <div>
          <h1>Requirements</h1>
          <div>
            <ReqBoxSub category="CORE" courses = "Classes" credits={2} total={5}/>
            <ReqBoxSub category="ELECTIVES" courses = "Classes" credits={2} total={5}/>
            <ReqBoxSub category="SENIOR REQUIREMENT" courses = "Classes" credits={2} total={5}/>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default ReqBoxAll;