import React from "react";
import { GoInfo } from "react-icons/go";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import styles from "./InfoButton.module.css";

export default function InfoButton(props: { text: string, size?: number}) {
    return (
        <div className={styles.infoButton}>
        <div
            data-tooltip-id="info-tooltip"
            data-tooltip-content={props.text}
            data-tooltip-place="top"
          >
            <GoInfo style={{ fontSize: props.size ? props.size : 16 }}/>
          </div>
          <Tooltip id="info-tooltip" openOnClick={true} style={{ 
            backgroundColor: "#444444",
            borderRadius: "3px"}}/>
        </div>
      );
  }