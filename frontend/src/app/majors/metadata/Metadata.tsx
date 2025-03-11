
import { useState, useEffect } from "react";
import Link from 'next/link';

import { User } from "@/types/type-user";
import { MajorsIndex, Program } from "@/types/type-program";
import { pinProgram, addProgram } from "./MetadataUtils";

import Style from "./Metadata.module.css";

function MetadataTopshelf(props: { program: Program }) 
{
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      {/* <div className={Style.thumbtack} onClick={() => pinProgram(props.programIndex, 0, props.user, props.setUser)}>
        <img src="./illegal_pin.png" alt="" style={{ width: "30px" }}/>
      </div>
      <div className={Style.thumbtack} onClick={() => addProgram(props.programIndex, 0, props.user, props.setUser)}>
        <img src="./plus.png" alt="" style={{ width: "30px" }}/>
      </div> */}
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", marginRight: "12px" }}>
						{props.program.prog_data.prog_name}
					</div>
          <img src="./little_guys.png" alt="" style={{ width: "35px", height: "auto", marginTop: "4px" }} />
          <div className={Style.countBox} style={{ marginRight: "10px", marginTop: "4px" }}>
						{props.program.prog_data.prog_stud_count}
					</div>
          <div className={Style.pinkMajorBox} style={{ fontSize: "16px", marginTop: "2px" }}>
						MAJOR
					</div>
        </div>
        <div>
					{props.program.prog_data.prog_abbr}
				</div>
      </div>
    </div>
  );
}

// function MetadataStats(props: { concMetadata: ConcMetadata }){
//   return(
//     <div style={{ color: "grey", marginBottom: "12px" }}>
//       <div className={Style.subsectionHeader} style={{ marginBottom: "4px" }}>
// 				STATS
// 			</div>
//       <div style={{ display: "flex" }}>
//         <div style={{ marginRight: "15px" }}>
//           <div style={{ fontSize: "12px" }}>
// 						COURSES
// 					</div>
//           <div className={Style.countBox}>
// 						{props.concMetadata.stats.courses}
// 					</div>
//         </div>
//         <div style={{ marginRight: "15px" }}>
//           <div style={{ fontSize: "12px" }}>
// 						RATING
// 					</div>
//           <div className={Style.evaluateBox}>{props.concMetadata.stats.rating}</div>
//         </div>
//         <div style={{ marginRight: "15px" }}>
//           <div style={{ fontSize: "12px" }}>
// 						WORKLOAD
// 					</div>
//           <div className={Style.evaluateBox}>{props.concMetadata.stats.workload}</div>
//         </div>
//         <div>
//           <div style={{ fontSize: "12px" }}>
// 						TYPE
// 					</div>
//           <div className={Style.countBox}>{props.concMetadata.stats.type}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

function MetadataBody(props: { program: Program, index: MajorsIndex }){

	return(
		<div style={{ marginLeft: "80px" }}>
			{/* <MetadataStats concMetadata={degreeMetadata.concs[concIndex]}/> */}
			<div className={Style.subsectionHeader}>
				ABOUT
			</div>
			<div style={{ fontSize: "12px", marginBottom: "12px" }}>
				{props.program.prog_degs[props.index.deg].deg_concs[props.index.conc].conc_desc}
			</div>
			<div className={Style.subsectionHeader}>
				DUS
			</div>
			<div style={{ fontSize: "12px", marginBottom: "12px" }}>
				{props.program.prog_data.prog_dus.dus_name}; {props.program.prog_data.prog_dus.dus_email}
			</div>
			<div style={{ display: "flex" }}>
				<div className={Style.linkBox}><Link className={Style.link} href={props.program.prog_data.prog_catolog} target="_blank">MAJOR CATALOG</Link></div>
				<div className={Style.linkBox}><Link className={Style.link} href={props.program.prog_data.prog_website} target="_blank">MAJOR WEBSITE</Link></div>
			</div>
		</div>
	);
}

function MetadataToggle(props: { program: Program, index: MajorsIndex, setIndex: Function })
{
	return (
		<div className={Style.Column}>
			<div className={Style.ToggleContainer}>
				{props.program.prog_degs.map((deg, index) => (
					<div 
						key={index} 
						className={`${Style.ToggleOption} ${props.index.deg === index ? Style.active : ""}`} 
						onClick={() => props.setIndex({ prog: props.index.prog, deg: index, conc: props.index.conc })}
					>
						{deg.deg_type}
					</div>
				))}
			</div>

			{props.program.prog_degs[props.index.deg].deg_concs.length > 1 && (
				<div className={Style.ToggleContainer}>
					{props.program.prog_degs[props.index.deg].deg_concs.map((conc, index) => (
						<div 
							key={index} 
							className={`${Style.ToggleOption} ${props.index.conc === index ? Style.active : ""}`} 
							onClick={() => props.setIndex({ prog: props.index.prog, deg: props.index.deg, conc: index })}
						>
							{conc.conc_name}
						</div>
					))}
				</div>
			)}
		</div>
		
	);
}

function MetadataContent(props: { program: Program, index: MajorsIndex, setIndex: Function })
{
  return (
    <div className={Style.MajorContainer}>
      <MetadataTopshelf program={props.program}/>
			<MetadataToggle program={props.program} index={props.index} setIndex={props.setIndex}/>
			<MetadataBody program={props.program} index={props.index}/>
    </div>
  );
}

function MetadataScrollButton(props: { index: MajorsIndex, setIndex: Function; peekProgram: Function; dir: number }) 
{
  return (
    <div className={Style.ScrollButton} onClick={() => props.setIndex({ conc: 0, deg: 0, prog: props.index.prog + props.dir  })}>
      <div style={{ display: "flex" }}>
        <div style={{ textAlign: "left", color: "gray" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {props.peekProgram(props.dir).prog_name}
          </div>
          <div style={{ fontSize: "10px" }}>
            {props.peekProgram(props.dir).prog_abbr}
          </div>
        </div>
      </div>
    </div>
  );
}


function Metadata(props: { program: Program, index: MajorsIndex, setIndex: Function, peekProgram: Function}) 
{
  return (
    <div className={Style.MetadataContainer}>
      <MetadataScrollButton index={props.index} setIndex={props.setIndex} peekProgram={props.peekProgram} dir={1}/>
      <MetadataContent program={props.program} index={props.index} setIndex={props.setIndex}/>
      <MetadataScrollButton index={props.index} setIndex={props.setIndex} peekProgram={props.peekProgram} dir={-1}/>
    </div>
  );
}

export default Metadata;
