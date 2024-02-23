
import React from "react";
import styles from "./../Majors.module.css"

function ReqBoxSub(props: { title: string; content: string }) {
  return (
    <div className={styles.ReqSub}>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  );
}
  
  export default ReqBoxSub;