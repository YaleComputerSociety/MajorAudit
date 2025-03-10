
import { useState, useEffect } from "react";
import Link from 'next/link';

import { User } from "@/types/type-user";
import { Program } from "@/types/type-program";
import { pinProgram, addProgram } from "./MetadataUtils";

import Style from "./Metadata.module.css";

function MetadataTopshelf(props: { 
	user: User, 
	setUser: Function, 
	programIndex: number, 
	degreeMetadata: DegreeMetadata 
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <div className={Style.thumbtack} onClick={() => pinProgram(props.programIndex, 0, props.user, props.setUser)}>
        <img src="./illegal_pin.png" alt="" style={{ width: "30px" }}/>
      </div>
      <div className={Style.thumbtack} onClick={() => addProgram(props.programIndex, 0, props.user, props.setUser)}>
        <img src="./plus.png" alt="" style={{ width: "30px" }}/>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "12px" }}>{props.degreeMetadata.name}</div>
          <img src="./little_guys.png" alt="" style={{ width: "35px", height: "auto", marginTop: "4px" }} />
          <div className={Style.countBox} style={{ marginRight: "10px", marginTop: "4px" }}>
						{props.degreeMetadata.info.students}
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

function MetadataStats(props: { concMetadata: ConcMetadata }){
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
						{props.concMetadata.stats.courses}
					</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>
						RATING
					</div>
          <div className={Style.evaluateBox}>{props.concMetadata.stats.rating}</div>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ fontSize: "12px" }}>
						WORKLOAD
					</div>
          <div className={Style.evaluateBox}>{props.concMetadata.stats.workload}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px" }}>
						TYPE
					</div>
          <div className={Style.countBox}>{props.concMetadata.stats.type}</div>
        </div>
      </div>
    </div>
  );
}

function MetadataBody(props: { concIndex: number, degreeMetadata: DegreeMetadata }){

	const { concIndex, degreeMetadata } = props;

	return(
		<div style={{ marginLeft: "80px" }}>
			<MetadataStats concMetadata={degreeMetadata.concs[concIndex]}/>
			<div className={Style.subsectionHeader}>
				ABOUT
			</div>
			<div style={{ fontSize: "12px", marginBottom: "12px" }}>
				{degreeMetadata.concs[concIndex].about}
			</div>
			<div className={Style.subsectionHeader}>
				DUS
			</div>
			<div style={{ fontSize: "12px", marginBottom: "12px" }}>
				{degreeMetadata.info.dus.name}; {degreeMetadata.info.dus.address}
			</div>
			<div style={{ display: "flex" }}>
				<div className={Style.linkBox}><Link className={Style.link} href={degreeMetadata.info.catologLink} target="_blank">MAJOR CATALOG</Link></div>
				<div className={Style.linkBox}><Link className={Style.link} href={degreeMetadata.info.wesbiteLink} target="_blank">MAJOR WEBSITE</Link></div>
			</div>
		</div>
	);
}

function MetadataToggle(props: { degreeMetadatas: DegreeMetadata[], degreeIndex: number, setDegreeIndex: Function, concIndex: number, setConcIndex: Function }){
	// TODO
	// If the currently selected degreeMetadata's concs attribute has length greater than 1, then 
	// display an additional set of identical toggle buttons below the current set where
	// each divs content is now conc.conc_name and clicking on one calls setConcIndex for the newly clicked one.

	return (
		<div className={Style.Column}>
			<div className={Style.ToggleContainer}>
				{props.degreeMetadatas.map((metadata, index) => (
					<div key={index} className={`${Style.ToggleOption} ${props.degreeIndex === index ? Style.active : ""}`} onClick={() => props.setDegreeIndex(index)}>
						{metadata.degreeType}
					</div>
				))}
			</div>

			{props.degreeMetadatas[props.degreeIndex].concs.length > 1 && (
				<div className={Style.ToggleContainer}>
					{props.degreeMetadatas[props.degreeIndex].concs.map((conc, index) => (
						<div key={index} className={`${Style.ToggleOption} ${props.concIndex === index ? Style.active : ""}`} onClick={() => props.setConcIndex(index)}>
							{conc.conc_name}
						</div>
					))}
				</div>
			)}
		</div>
		
	);
}

function MetadataContent(props: { 
	user: User, 
	setUser: Function, 
	programIndex: number, 
	degreeMetadatas: DegreeMetadata[], 
	degreeIndex: number,
	setDegreeIndex: Function
	concIndex: number,
	setConcIndex: Function
}){
  return (
    <div className={Style.MajorContainer}>
      <MetadataTopshelf user={props.user} setUser={props.setUser} degreeMetadata={props.degreeMetadatas[props.degreeIndex]} programIndex={props.programIndex}/>
			<MetadataToggle 
				degreeMetadatas={props.degreeMetadatas} 
				degreeIndex={props.degreeIndex} 
				setDegreeIndex={props.setDegreeIndex} 
				concIndex={props.concIndex} 
				setConcIndex={props.setConcIndex}
			/>
			<MetadataBody degreeMetadata={props.degreeMetadatas[props.degreeIndex]} concIndex={props.concIndex}/>
    </div>
  );
}

function MetadataScrollButton(props: { shiftProgramIndex: Function; peekProgram: Function; dir: number }) 
{
  return (
    <div className={Style.ScrollButton} onClick={() => props.shiftProgramIndex(props.dir)}>
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
    </div>
  );
}


function Metadata(props: { 
	program: Program,
	index: { conc: number, deg: number, prog: number }
	peekProgram: Function
}) {
  return (
    <div className={Style.MetadataContainer}>
      <MetadataScrollButton shiftProgramIndex={props.shiftProgramIndex} peekProgram={props.peekProgram} dir={1}/>
      <MetadataContent 
				
			
				
			/>
      <MetadataScrollButton shiftProgramIndex={props.shiftProgramIndex} peekProgram={props.peekProgram} dir={-1}/>
    </div>
  );
}

export default Metadata;
