import React from "react";
import { GoInfo } from "react-icons/go";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default function InfoButton(props: { text: string }) {
    return (
        <div style={{ display: "flex", marginLeft: "3px", marginTop: "2px"}}>
        <div
            data-tooltip-id="info-tooltip"
            data-tooltip-content={props.text}
            data-tooltip-place="top"
          >
            <GoInfo />
          </div>
          <Tooltip id="info-tooltip" border="1px solid black" style={{ 
            color: "black",
            backgroundColor: "white",
            borderRadius: "15px"}}/>
        </div>
      );
  }