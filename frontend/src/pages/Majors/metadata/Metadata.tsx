
import React, { useState, useEffect } from "react";
import Style from "./Metadata.module.css";

import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import lgsIcon from "../../../commons/images/little_guys.png";
// import img_plus from "../../../commons/images/plus.png";
// import img_arrowup from "../../../commons/images/arrowup.png";
// import img_arrowdown from "../../../commons/images/arrowdown.png";

import { Program, Degree } from "../../../commons/types/TypeProgram";


function MetadataTopshelf(props: { program: Program, degree: Degree }){
  return(
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      {/* <Button style={{ width: '28px', height: '28px', padding: 0, border: 'none', marginRight: "8px" }}>
        <img src={img_plus} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Button> */}
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "12px" }}>{props.degree.metadata.name}</div>
          <img src={lgsIcon} alt="" style={{ width: "35px", height: "auto", marginTop: "4px" }}/>
          <div className={Style.countBox} style={{ marginRight: "10px", marginTop: "4px" }}>{props.degree.metadata.students}</div>
          <div className={Style.pinkMajorBox} style={{ fontSize: "16px", marginTop: "2px" }}>MAJOR</div>
        </div>
        <div>{props.program.abbreviation}</div>
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
      <div className={Style.subsectionHeader} style={{ marginBottom: "4px" }}>STATS</div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>
						COURSES
					</div>
          <div className={Style.countBox}>
						{degree.metadata.stats.courses}
					</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>RATING</div>
          <div className={Style.evaluateBox}>{degree.metadata.stats.rating}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>WORKLOAD</div>
          <div className={Style.evaluateBox}>{degree.metadata.stats.workload}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px" }}>TYPE</div>
          <div className={Style.countBox}>{degree.metadata.stats.type}</div>
        </div>
      </div>
    </div>
  );
}

function MetadataContent(props: {program: Program, whichDegree: number, alterCurrDegree: Function}){
  let currDegree = props.program.degrees[props.whichDegree];
  return (
    <div className={Style.majorContainer}>
      <MetadataTopshelf program={props.program} degree={currDegree}/>
      <MetadataDegree {...props}/>
      <MetadataStats {...currDegree}/>

      <div className={Style.subsectionHeader}>ABOUT</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{currDegree.metadata.about}</div>

      <div className={Style.subsectionHeader}>DUS</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>{currDegree.metadata.dus.name}; {currDegree.metadata.dus.address}</div>

      <div style={{ display: "flex" }}>
        <div className={Style.linkBox}><Link className={Style.link} to={currDegree.metadata.catologLink} target="_blank">MAJOR CATALOG</Link></div>
        <div className={Style.linkBox}><Link className={Style.link} to={currDegree.metadata.wesbiteLink} target="_blank">MAJOR WEBSITE</Link></div>
      </div>
    </div>
  );
}

function MetadataScrollButton(props: {scrollProgram: Function, seeProgram: Function, dir: number}){
  return(
    <Button style={{ backgroundColor: "white", border: "none", cursor: "pointer" }} onClick={() => props.scrollProgram(props.dir)}>
      <div style={{ display: "flex" }}>
        {/* <img src={props.dir > 0 ? img_arrowup : img_arrowdown} alt="" style={{ width: "31px", height: "15px", marginTop: "8px", marginRight: "8px" }}/> */}
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

function Metadata(props: {program: Program, scrollProgram: Function, seeProgram: Function, whichDegree: number, alterCurrDegree: Function}){
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

export default Metadata;
