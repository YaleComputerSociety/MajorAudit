
import { useState, useEffect } from "react";
import Style from "./Metadata.module.css";

import Link from 'next/link';
import { MajorsIndex, Program, ProgramDict } from "@/types/type-program";
import { usePrograms } from "@/context/ProgramProvider";
import { useAuth } from "@/context/AuthProvider";

import { toggleConcentrationPin } from "./MetadataUtils";

function MetadataTopshelf(props: { 
	program: Program;
	index: MajorsIndex;
}){
	const { setUser } = useAuth();
  const { progDict } = usePrograms();

  function handlePinClick() {
    toggleConcentrationPin(setUser, progDict, props.index);
  }

  return(
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
					<div style={{ fontSize: "30px", marginRight: "6px", cursor: "pointer" }} onClick={handlePinClick}>
						📌
					</div>
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

function MetadataToggle(props: { 
	program: Program, 
	index: MajorsIndex, 
	setIndex: Function 
}){
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

function MetadataBody(props: { 
	program: Program, 
	index: MajorsIndex 
}){
	return(
		// style={{ marginLeft: "80px" }}
		<div>
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

function MetadataScrollButton(props: { 
	programs: ProgramDict, 
	index: MajorsIndex, 
	setIndex: Function; 
	filteredProgKeys: string[];
	dir: number 
}){
  const currentProgIndex = props.filteredProgKeys.indexOf(props.index.prog);
  const nextProgIndex = (currentProgIndex + props.dir + props.filteredProgKeys.length) % props.filteredProgKeys.length;
  const nextProg = props.filteredProgKeys[nextProgIndex];

  return (
    <div className={Style.ScrollButton} onClick={() => props.setIndex({ prog: nextProg, conc: 0, deg: 0 })}>
      <div style={{ display: "flex" }}>
        <div style={{ textAlign: "left", color: "gray" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {props.programs[nextProg].prog_data.prog_name}
          </div>
          <div style={{ fontSize: "10px" }}>
            {props.programs[nextProg].prog_data.prog_abbr}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgramList(props: { 
	programs: ProgramDict, 
	setIndex: Function 
}){
	return (
		<div>
			{Object.entries(props.programs).map(([progCode, program]) => (
				<div 
					key={progCode} 
					className={Style.ProgramOption} 
					onClick={() => props.setIndex({ conc: 0, deg: 0, prog: progCode })}
				>
					{program.prog_data.prog_name} ({program.prog_data.prog_abbr})
				</div>
			))}
		</div>
	);
}

function Metadata(props: { 
	index: MajorsIndex, 
	setIndex: Function,
	filteredProgKeys: string[],
}){
	const { progDict } = usePrograms();
	const currProgram = progDict[props.index.prog];

	if (!currProgram) return null;

	return(
    <div className={Style.MetadataContainer}>
      {props.index.conc == -1 ? (
					<ProgramList programs={progDict} setIndex={props.setIndex}/>
				) : (
					<div>
						<MetadataScrollButton 
							programs={progDict} 
							index={props.index} 
							setIndex={props.setIndex} 
							filteredProgKeys={props.filteredProgKeys} 
							dir={1}
						/>
						<div className={Style.MajorContainer}>
							<MetadataTopshelf program={currProgram} index={props.index}/>
							<MetadataToggle program={currProgram} index={props.index} setIndex={props.setIndex}/>
							<MetadataBody program={currProgram} index={props.index}/>
						</div>
						<MetadataScrollButton 
							programs={progDict} 
							index={props.index} 
							setIndex={props.setIndex} 
							filteredProgKeys={props.filteredProgKeys} 
							dir={-1}
						/>
					</div>
				)
			}
    </div>
  );
}

export default Metadata;
