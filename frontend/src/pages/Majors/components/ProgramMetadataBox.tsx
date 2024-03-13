
import React, { useState, useEffect } from "react";
import styles from "./../Majors.module.css";

import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import lgsIcon from "../../../commons/images/little_guys.png";
import plus from "../../../commons/images/plus.png";
import upMajor from "../../../commons/images/up_major.png";
import downMajor from "../../../commons/images/down_major.png";

import { Program } from "../../../commons/types";
import { Degree } from "../../../commons/types";


function MetadataTopshelf(degree: Degree){
  return(
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <Button style={{ width: '30px', height: '30px', padding: 0, border: 'none', marginRight: "8px" }}>
        <img src={plus} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "12px" }}>{degree.metadata.name}</div>
          <img src={lgsIcon} alt="" style={{ width: "35px", height: "auto", marginTop: "4px" }}/>
          <div className={styles.coursesBox} style={{ marginRight: "10px", marginTop: "4px" }}>{degree.metadata.students}</div>
          <div className={styles.pinkMajorBox} style={{ marginLeft: "auto", fontSize: "16px" }}>MAJOR</div>
        </div>
        <div>{degree.metadata.abbreviation}</div>
      </div>
    </div>
  );
}

function MetadataDegree(props: {program: Program, whichDegree: number, alterCurrDegree: Function}){

  const [activeDegree, setActiveDegree] = useState(props.whichDegree);

  useEffect(() => {
    setActiveDegree(props.whichDegree);
  }, [props.whichDegree]);

  const handleDegreeClick = (degree: number) => {
    setActiveDegree(degree);
    props.alterCurrDegree(degree);
  };

  return (
    <div style={{ marginBottom: "12px" }}>
      {props.program.degrees.map((degree, index) => (
        <button key={index} onClick={() => handleDegreeClick(index)} 
        style={{
          marginRight: "0px",
          backgroundColor: activeDegree === index ? '#3184FF' : 'white',
          color: activeDegree === index ? 'white' : 'black',
          borderRadius: "5px",
          padding: "5px 10px",
          border: "1px solid #ccc",
          cursor: "pointer"
        }}>
          {degree.metadata.degreeType === "BACH_ART" ? "B.A." : 
           degree.metadata.degreeType === "BACH_SCI" ? "B.S." : 
           degree.metadata.degreeType}
        </button>
      ))}
    </div>
  );
}

function MetadataStats(degree: Degree){
  return(
    <div style={{ color: "grey", marginBottom: "12px" }}>
      <div className={styles.subsectionHeader} style={{ marginBottom: "4px" }}>STATS</div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>COURSES</div>
          <div className={styles.coursesBox}>{degree.metadata.stats.courses}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>RATING</div>
          <div className={styles.ratingBox}>{degree.metadata.stats.rating}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>WORKLOAD</div>
          <div className={styles.workloadBox}>{degree.metadata.stats.workload}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px" }}>TYPE</div>
          <div className={styles.coursesBox}>{degree.metadata.stats.type}</div>
        </div>
      </div>
    </div>
  );
}

function MetadataContent(props: {program: Program, whichDegree: number, alterCurrDegree: Function}){
  let currDegree = props.program.degrees[props.whichDegree];
  return (
    <div className={styles.majorContainer}>
      <MetadataTopshelf {...currDegree}/>
      <MetadataDegree {...props}/>
      <MetadataStats {...currDegree}/>

      <div className={styles.subsectionHeader}>ABOUT</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{currDegree.metadata.about}</div>

      <div className={styles.subsectionHeader}>DUS</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{currDegree.metadata.dus.name}; {currDegree.metadata.dus.address}</div>

      <div style={{ display: "flex" }}>
        <div className={styles.linkBox}><Link className={styles.link} to={currDegree.metadata.catologLink} target="_blank">MAJOR CATALOG</Link></div>
        <div className={styles.linkBox}><Link className={styles.link} to={currDegree.metadata.wesbiteLink} target="_blank">MAJOR WEBSITE</Link></div>
      </div>
    </div>
  );
}

function MetadataAbove(props: {scrollProgram: Function, seeProgram: Function}){
  return(
    <div style={{ display: "flex", padding: "15px" }}>
      <Button style={{ width: '30px', height: "auto", padding: 0, border: 'none', marginRight: "8px", cursor: "pointer" }} onClick={() => props.scrollProgram(1)}>
            <img src={upMajor} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div style={{ color: "gray" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>{props.seeProgram(1).name}</div>
          <div style={{ fontSize: "10px" }}>{props.seeProgram(1).abbreviation}</div>
      </div>
    </div>
  );
}

function MetadataBelow(props: {scrollProgram: Function, seeProgram: Function}){
  return(
    <div style={{ display: "flex", padding: "15px" }}>
      <Button style={{ width: '30px', height: "auto", padding: 0, border: 'none', marginRight: "8px", cursor: "pointer" }} onClick={() => props.scrollProgram(-1)}>
        <img src={downMajor} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div style={{ color: "gray" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>{props.seeProgram(-1).name}</div>
          <div style={{ fontSize: "10px" }}>{props.seeProgram(-1).abbreviation}</div>
      </div>
    </div>
  );
}

function ProgramMetadataBox(props: {program: Program, scrollProgram: Function, seeProgram: Function, whichDegree: number, alterCurrDegree: Function}){
  return (
    <div>
      <MetadataAbove {...props}/>
      <MetadataContent {...props} />
      <MetadataBelow {...props}/>
    </div>
  );
}

export default ProgramMetadataBox;
