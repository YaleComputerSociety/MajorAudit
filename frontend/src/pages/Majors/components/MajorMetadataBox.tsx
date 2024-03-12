
import React from "react";
import styles from "./../Majors.module.css";

import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import lgsIcon from "../../../commons/images/little_guys.png";
import plus from "../../../commons/images/plus.png";
import upMajor from "../../../commons/images/up_major.png";
import downMajor from "../../../commons/images/down_major.png";

import { Major } from "../../../commons/types";
import { MajorMetadataStats } from "../../../commons/types";
import { MockData } from "../mock/mock";

function TopShelf( major: Major){
  return(
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <Button style={{ width: '30px', height: '30px', padding: 0, border: 'none', marginRight: "8px" }}>
        <img src={plus} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "12px" }}>{major.metadata.name}</div>
          <img src={lgsIcon} alt="" style={{ width: "35px", height: "auto", marginTop: "4px" }}/>
          <div className={styles.coursesBox} style={{ marginRight: "160px", marginTop: "4px" }}>{major.metadata.students}</div>
          <div className={styles.pinkMajorBox} style={{ marginLeft: "auto", fontSize: "16px" }}>MAJOR</div>
        </div>
        <div>{major.metadata.abbreviation}</div>
      </div>
    </div>
  );
}

function Stats(stats: MajorMetadataStats ){
  return(
    <div style={{ color: "grey", marginBottom: "12px" }}>
      <div style={{ fontSize: "18px", marginBottom: "4px" }}>STATS</div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>COURSES</div>
          <div className={styles.coursesBox}>{stats.courses}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>RATING</div>
          <div className={styles.ratingBox}>{stats.rating}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>WORKLOAD</div>
          <div className={styles.workloadBox}>{stats.workload}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px" }}>TYPE</div>
          <div className={styles.coursesBox}>{stats.type}</div>
        </div>
      </div>
    </div>
  );
}

function MajorBoxSub(props: { major: Major }){
  return (
    <div className={styles.majorContainer}>
      <TopShelf {...props.major}/>
      
      <div style={{ marginBottom: "12px" }}>BA BS</div>
      
      <Stats {...props.major.metadata.stats} />

      <div style={{ color: "grey", fontSize: "18px" }}>ABOUT</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{props.major.metadata.about}</div>

      <div style={{ color: "grey", fontSize: "18px" }}>DUS</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{props.major.metadata.dus.name}; {props.major.metadata.dus.address}</div>

      <div style={{ display: "flex" }}>
        <div className={styles.linkBox}><Link className={styles.link} to={props.major.metadata.catologLink} target="_blank">MAJOR CATALOG</Link></div>
        <div className={styles.linkBox}><Link className={styles.link} to={props.major.metadata.wesbiteLink} target="_blank">MAJOR WEBSITE</Link></div>
      </div>
    </div>
  );
}

function MajorMetadataBox(props: {major: Major}){
  return (
    <div>
      <div style={{ display: "flex", padding: "15px" }}>
        <Button style={{ width: '40px', height: "auto", padding: 0, border: 'none' }}>
          <img src={upMajor} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </Button>
        <div style={{ color: "gray", fontWeight: "bold", fontSize: "18px" }}>Comparative Literature</div>
      </div>

      <MajorBoxSub major={MockData} />

      <div style={{ display: "flex", padding: "15px" }}>
        <Button style={{ width: '40px', height: "auto", padding: 0, border: 'none' }}>
          <img src={downMajor} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </Button>
        <div style={{ color: "gray", fontWeight: "bold", fontSize: "18px" }}>Computer Science and Economics</div>
      </div>
    </div>
  );
}

export default MajorMetadataBox;
