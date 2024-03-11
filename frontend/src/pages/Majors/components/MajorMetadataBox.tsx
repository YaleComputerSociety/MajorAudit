
import React from "react";
import styles from "./../Majors.module.css";

import { Major } from "../../../commons/types";
import { MajorMetadataStats } from "../../../commons/types";

import { MockData } from "../mock/mock";

function Stats(stats: MajorMetadataStats ) {
  return(
    <div style={{ color: "grey" }}>
        <div>STATS</div>
        <div style={{ display: "flex" }}>
          <div>
            <div>COURSES</div>
            <div className={styles.smallBox}>{stats.courses}</div>
          </div>
          <div>
            <div>RATING</div>
            <div className={styles.smallBox}>{stats.rating}</div>
          </div>
          <div>
            <div>WORKLOAD</div>
            <div className={styles.smallBox}>{stats.workload}</div>
          </div>
          <div>
            <div>TYPE</div>
            <div className={styles.smallBox}>{stats.type}</div>
          </div>
        </div>
      </div>
  );
}

function MajorBoxSub(props: { maj: Major }) {
  return (
    <div>

      <div style={{ display: "flex" }}>
        <div className={styles.containerHeader}>{props.maj.metadata.name}</div>
      </div>

      <div style={{ color: "grey", marginLeft: "4vw", marginTop: "-5vh" }}>
        <h3>{props.maj.metadata.abbreviation}</h3>
      </div>

      <Stats {...props.maj.metadata.stats} />
      
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

function MajorMetadataBox(props: {major: Major}) {
  return (
    <div className={styles.majorContainer}>
      <MajorBoxSub maj={MockData} />
    </div>
  );
}

export default MajorMetadataBox;
