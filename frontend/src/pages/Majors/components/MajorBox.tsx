import React from "react";
import styles from "./../Majors.module.css";
import { Major } from "./../../../commons/types";
import { MockData } from "../mock/mock";

function MajorBoxSub(props: { maj: Major }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginRight: "3vw", marginLeft: "4vw" }}>
          {props.maj.metadata.name}
        </h1>
        <div
          style={{
            borderRadius: "10px",
            borderStyle: "solid",
            width: "2vw",
            height: "2.5vh",
            marginTop: "3.5vh",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "auto" }}>{props.maj.metadata.students}</p>
        </div>
      </div>
      <div style={{ color: "grey", marginLeft: "4vw", marginTop: "-5vh" }}>
        <h3>{props.maj.metadata.abbreviation}</h3>
      </div>
      <div style={{ color: "grey", marginLeft: "1vw", marginTop: "6vh" }}>
        <h2>STATS</h2>
        <div style={{ display: "flex", marginTop: "-2vh" }}>
          <div style={{ marginRight: "1vw" }}>
            <h4>COURSES</h4>
            <div className={styles.smallBox} style={{ borderRadius: "10px" }}>
              <p style={{ margin: "auto" }}>
                {props.maj.metadata.stats.courses}
              </p>
            </div>
          </div>
          <div style={{ marginRight: "1vw" }}>
            <h4>RATING</h4>
            <div className={styles.smallBox} style={{ borderRadius: "10px" }}>
              <p style={{ margin: "auto" }}>
                {props.maj.metadata.stats.rating}
              </p>
            </div>
          </div>
          <div style={{ marginRight: "1vw" }}>
            <h4>WORKLOAD</h4>
            <div className={styles.smallBox} style={{ borderRadius: "10px" }}>
              <p style={{ margin: "auto" }}>
                {props.maj.metadata.stats.workload}
              </p>
            </div>
          </div>
          <div>
            <h4>TYPE</h4>
            <div className={styles.smallBox} style={{ borderRadius: "10px" }}>
              <p style={{ margin: "auto" }}>{props.maj.metadata.stats.type}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "1vw", marginTop: "2vh" }}>
        <h2 style={{ color: "grey" }}>ABOUT</h2>
        <p style={{ marginTop: "-1vh" }}>{props.maj.metadata.about}</p>
      </div>
      <div style={{ marginLeft: "1vw", marginTop: "2vh" }}>
        <h2 style={{ color: "grey" }}>DUS</h2>
        <p style={{ marginTop: "-1vh" }}>
          {props.maj.metadata.dus.name};{props.maj.metadata.dus.address},
        </p>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "5vh",
          marginLeft: "1vw",
          color: "grey",
        }}
      >
        <div
          className={styles.wideBox}
          style={{ borderRadius: "10px", marginRight: "1vw" }}
        >
          <h5 style={{ margin: "auto" }}>MAJOR CATALOG</h5>
        </div>
        <div className={styles.wideBox} style={{ borderRadius: "10px" }}>
          <h5 style={{ margin: "auto" }}>MAJOR WEBSITE</h5>
        </div>
      </div>
    </div>
  );
}

function MajorBox() {
  return (
    <div className={styles.majorContainer}>
      <div>
        <MajorBoxSub maj={MockData} />
      </div>
    </div>
  );
}

export default MajorBox;
