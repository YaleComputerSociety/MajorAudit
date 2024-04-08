import React from "react";
import { GoInfo } from "react-icons/go";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default function InfoButton(props: { text: string, size?: number}) {
    return (
        <div style={{ display: "flex", marginLeft: "3px", marginTop: "0px"}}>
        <div
            data-tooltip-id="info-tooltip"
            data-tooltip-content={props.text}
            data-tooltip-place="top"
          >
            <GoInfo style={{ fontSize: props.size ? props.size : 16 }}/>
          </div>
          <Tooltip id="info-tooltip" style={{ 
            backgroundColor: "#444444",
            borderRadius: "3px"}}/>
        </div>
      );
  }