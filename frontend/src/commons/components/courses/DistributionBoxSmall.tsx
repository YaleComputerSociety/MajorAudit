import React from "react";
import chroma from "chroma-js"
import styles from "./DistributionBoxSmall.module.css";
import { skillsAreasColors } from '../../utilities/constants';

type Props = {
  readonly text: string;
};

export default function DistributionBox({ text }: Props) {
  const textColor = skillsAreasColors[text];
  return (
    <div className={styles.overviewDistBox} style={{ 
        backgroundColor: chroma(textColor).alpha(0.16).css(), 
        color: textColor,
        fontWeight: "bold"
     }}>{text}</div>
  );
}

