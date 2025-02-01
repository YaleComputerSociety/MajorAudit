
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { User } from "../../../types/TypeUser";
import { Degree, DegreeMetadata } from "../../../types/TypeProgram";
import { pinProgram, addProgram } from "./MetadataUtils";

import Style from "./Metadata.module.css";
import lgsIcon from "../../../commons/images/little_guys.png";
import img_plus from "../../../commons/images/plus.png";
import illegal_pin from "../../../commons/images/illegal_pin.png"

function MetadataTopshelf(props: { 
	user: User, 
	setUser: Function, 
	programIndex: number, 
	degreeMetadata: DegreeMetadata 
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <div className={Style.thumbtack} onClick={() => pinProgram(props.programIndex, 0, props.user, props.setUser)}>
        <img src={illegal_pin} alt="Add Program" style={{ width: "30px" }}/>
      </div>
      <div className={Style.thumbtack} onClick={() => addProgram(props.programIndex, 0, props.user, props.setUser)}>
        <img src={img_plus} alt="Add Program" style={{ width: "30px" }}/>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "12px" }}>{props.degreeMetadata.name}</div>
          <img src={lgsIcon} alt="" style={{ width: "35px", height: "auto", marginTop: "4px" }} />
          <div className={Style.countBox} style={{ marginRight: "10px", marginTop: "4px" }}>
						{props.degreeMetadata.students}
					</div>
          <div className={Style.pinkMajorBox} style={{ fontSize: "16px", marginTop: "2px" }}>
						MAJOR
					</div>
        </div>
        <div>
					{props.degreeMetadata.abbr}
				</div>
      </div>
    </div>
  );
}

function MetadataStats(props: { degreeMetadata: DegreeMetadata }){
  return(
    <div style={{ color: "grey", marginBottom: "12px" }}>
      <div className={Style.subsectionHeader} style={{ marginBottom: "4px" }}>
				STATS
			</div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>
						COURSES
					</div>
          <div className={Style.countBox}>
						{props.degreeMetadata.stats.courses}
					</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>
						RATING
					</div>
          <div className={Style.evaluateBox}>{props.degreeMetadata.stats.rating}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>
						WORKLOAD
					</div>
          <div className={Style.evaluateBox}>{props.degreeMetadata.stats.workload}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px" }}>
						TYPE
					</div>
          <div className={Style.countBox}>{props.degreeMetadata.stats.type}</div>
        </div>
      </div>
    </div>
  );
}

function MetadataContent(props: { 
	user: User, 
	setUser: Function, 
	degreeMetadata: DegreeMetadata, 
	programIndex: number, 
}){
  return (
    <div className={Style.majorContainer}>
      <MetadataTopshelf user={props.user} setUser={props.setUser} degreeMetadata={props.degreeMetadata} programIndex={props.programIndex}/>
			<div style={{ marginLeft: "79px" }}>
				<MetadataStats degreeMetadata={props.degreeMetadata}/>
				<div className={Style.subsectionHeader}>
					ABOUT
				</div>
				<div style={{ fontSize: "12px", marginBottom: "12px" }}>
					{props.degreeMetadata.about}
				</div>
				<div className={Style.subsectionHeader}>
					DUS
				</div>
				<div style={{ fontSize: "12px", marginBottom: "12px" }}>
					{props.degreeMetadata.dus.name}; {props.degreeMetadata.dus.address}
				</div>

				<div style={{ display: "flex" }}>
					<div className={Style.linkBox}><Link className={Style.link} to={props.degreeMetadata.catologLink} target="_blank">MAJOR CATALOG</Link></div>
					<div className={Style.linkBox}><Link className={Style.link} to={props.degreeMetadata.wesbiteLink} target="_blank">MAJOR WEBSITE</Link></div>
				</div>
			</div>
    </div>
  );
}

function MetadataScrollButton(props: {
	shiftProgramIndex: Function, 
	peekProgram: Function, 
	dir: number
}){
  return(
    <Button style={{ backgroundColor: "white", border: "none", cursor: "pointer" }} onClick={() => props.shiftProgramIndex(props.dir)}>
      <div style={{ display: "flex" }}>
        <div style={{ textAlign: "left", color: "gray" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {props.peekProgram(props.dir).name}
          </div>
          <div style={{ fontSize: "10px" }}>
            {props.peekProgram(props.dir).abbr}
          </div>
        </div>
      </div>
    </Button>
  );
}

function Metadata(props: { 
  user: User, 
  setUser: Function, 
	programMetadatas: DegreeMetadata[],
	programIndex: number,
	shiftProgramIndex: Function,
	peekProgram: Function
}) {
  return (
    <div>
      <MetadataScrollButton shiftProgramIndex={props.shiftProgramIndex} peekProgram={props.peekProgram} dir={1}/>
      <MetadataContent user={props.user} setUser={props.setUser} degreeMetadata={props.programMetadatas[0]} programIndex={props.programIndex}/>
      <MetadataScrollButton shiftProgramIndex={props.shiftProgramIndex} peekProgram={props.peekProgram} dir={-1}/>
    </div>
  );
}

export default Metadata;
