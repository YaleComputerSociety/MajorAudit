
import React from "react";
import styles from "./../Majors.module.css";

import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import lgsIcon from "../../../commons/images/little_guys.png";
import plus from "../../../commons/images/plus.png";
import upMajor from "../../../commons/images/up_major.png";
import downMajor from "../../../commons/images/down_major.png";

import { Major } from "../../../commons/types";


function MetadataTopshelf( major: Major){
  return(
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <Button style={{ width: '30px', height: '30px', padding: 0, border: 'none', marginRight: "8px" }}>
        <img src={plus} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "12px" }}>{major.metadata.name}</div>
          <img src={lgsIcon} alt="" style={{ width: "35px", height: "auto", marginTop: "4px" }}/>
          <div className={styles.coursesBox} style={{ marginRight: "10px", marginTop: "4px" }}>{major.metadata.students}</div>
          <div className={styles.pinkMajorBox} style={{ marginLeft: "auto", fontSize: "16px" }}>MAJOR</div>
        </div>
        <div>{major.metadata.abbreviation}</div>
      </div>
    </div>
  );
}

function MetadataStats(major: Major){
  return(
    <div style={{ color: "grey", marginBottom: "12px" }}>
      <div className={styles.subsectionHeader} style={{ marginBottom: "4px" }}>STATS</div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>COURSES</div>
          <div className={styles.coursesBox}>{major.metadata.stats.courses}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>RATING</div>
          <div className={styles.ratingBox}>{major.metadata.stats.rating}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>WORKLOAD</div>
          <div className={styles.workloadBox}>{major.metadata.stats.workload}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px" }}>TYPE</div>
          <div className={styles.coursesBox}>{major.metadata.stats.type}</div>
        </div>
      </div>
    </div>
  );
}

function MetadataContent(major: Major ){
  return (
    <div className={styles.majorContainer}>
      <MetadataTopshelf {...major}/>
      
      <div style={{ marginBottom: "12px" }}>BA BS</div>
      
      <MetadataStats {...major} />

      <div className={styles.subsectionHeader}>ABOUT</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{major.metadata.about}</div>

      <div className={styles.subsectionHeader}>DUS</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{major.metadata.dus.name}; {major.metadata.dus.address}</div>

      <div style={{ display: "flex" }}>
        <div className={styles.linkBox}><Link className={styles.link} to={major.metadata.catologLink} target="_blank">MAJOR CATALOG</Link></div>
        <div className={styles.linkBox}><Link className={styles.link} to={major.metadata.wesbiteLink} target="_blank">MAJOR WEBSITE</Link></div>
      </div>
    </div>
  );
}

function MetadataAbove(props: {ferrisMajor: Function, seeMajor: Function}){
  return(
    <div style={{ display: "flex", padding: "15px" }}>
      <Button style={{ width: '40px', height: "auto", padding: 0, border: 'none', marginRight: "4px" }} onClick={() => props.ferrisMajor(1)}>
            <img src={upMajor} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div style={{ color: "gray" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>{props.seeMajor(1).metadata.name}</div>
          <div style={{ fontSize: "10px" }}>{props.seeMajor(1).metadata.abbreviation}</div>
      </div>
    </div>
  );
}

function MetadataBelow(props: {ferrisMajor: Function, seeMajor: Function}){
  return(
    <div style={{ display: "flex", padding: "15px" }}>
      <Button style={{ width: '40px', height: "auto", padding: 0, border: 'none', marginRight: "4px" }} onClick={() => props.ferrisMajor(-1)}>
        <img src={downMajor} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div style={{ color: "gray" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>{props.seeMajor(-1).metadata.name}</div>
          <div style={{ fontSize: "10px" }}>{props.seeMajor(1).metadata.abbreviation}</div>
      </div>
    </div>
  );
}

function MajorMetadataBox(props: {major: Major, ferrisMajor: Function, seeMajor: Function}){
  return (
    <div>
      <MetadataAbove {...props} />
      <MetadataContent {...props.major} />
      <MetadataBelow {...props} />
    </div>
  );
}

export default MajorMetadataBox;
