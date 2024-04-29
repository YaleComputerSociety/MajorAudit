
import React, { useState, useEffect } from "react";
import styles from "./../Majors.module.css";

import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { MdPeople } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { SlArrowUp , SlArrowDown } from "react-icons/sl";

import { Program, Degree } from "../../../commons/types/TypeProgram";

import { useTheme } from "../../../hooks/themeContext";
import { getThemeColor } from "../../../commons/utilities/themeSchemas";

function MetadataTopshelf(degree: Degree){
  const { currentTheme } = useTheme();
  return(
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <Button style={{ width: '28px', height: '28px', padding: 0, border: 'none', marginRight: "8px" }}>
        <FaPlus style={{ color: '#6A8FF4', backgroundColor: getThemeColor(currentTheme, 'backgroundColor'), width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "8px" }}>{degree.metadata.name}</div>
          <MdPeople style={{ width: "25px", height: "auto", marginTop: "4px", marginRight: "6px"}}/>
          <div className={styles.countBox} style={{ marginRight: "10px", marginTop: "4px" }}>{degree.metadata.students}</div>
          <div className={styles.pinkMajorBox}>MAJOR</div>
        </div>
        <div>{degree.metadata.abbreviation}</div>
      </div>
    </div>
  );
}

function MetadataDegree(props: {program: Program, whichDegree: number, alterCurrDegree: Function}){

  const [activeDegree, setActiveDegree] = useState(props.whichDegree);
  const { currentTheme } = useTheme();

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
          backgroundColor: activeDegree === index ? '#3184FF' : getThemeColor(currentTheme, 'courseBoxColor'),
          color: activeDegree === index ? 'white' : getThemeColor(currentTheme, 'color'),
          borderRadius: "5px",
          padding: "5px 10px",
          border: "1px solid " + getThemeColor(currentTheme, 'color'),
          cursor: "pointer",
          transition: "0.3s ease",
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
          <div className={styles.countBox}>{degree.metadata.stats.courses}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>RATING</div>
          <div className={styles.evaluateBox}>{degree.metadata.stats.rating}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>WORKLOAD</div>
          <div className={styles.evaluateBox}>{degree.metadata.stats.workload}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px" }}>TYPE</div>
          <div className={styles.countBox}>{degree.metadata.stats.type}</div>
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

function MetadataScrollButton(props: {scrollProgram: Function, seeProgram: Function, dir: number}){
  const { currentTheme } = useTheme();
  return(
    <Button style={{ backgroundColor: getThemeColor(currentTheme, 'backgroundColor'), border: "none", cursor: "pointer" }} onClick={() => props.scrollProgram(props.dir)}>
      <div style={{ display: "flex" }}>
        <div style={{paddingRight: "6px"}}>
          {props.dir > 0 ? <SlArrowUp size={26} color="gray"/> : <SlArrowDown size={26} color="gray"/>}
        </div>
        <div style={{ textAlign: "left", color: "gray" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {props.seeProgram(props.dir).name}
          </div>
          <div style={{ fontSize: "10px" }}>
            {props.seeProgram(props.dir).abbreviation}
          </div>
        </div>
      </div>
    </Button>
  );
}

function ProgramMetadataBox(props: {program: Program, scrollProgram: Function, seeProgram: Function, whichDegree: number, alterCurrDegree: Function}){
  return (
    <div>
      <MetadataScrollButton scrollProgram={props.scrollProgram} seeProgram={props.seeProgram} dir={1}/>
      <div style={{ marginLeft: "10px" }}>
        <MetadataContent {...props} />
      </div>
      <MetadataScrollButton scrollProgram={props.scrollProgram} seeProgram={props.seeProgram} dir={-1}/>
    </div>
  );
}

export default ProgramMetadataBox;
