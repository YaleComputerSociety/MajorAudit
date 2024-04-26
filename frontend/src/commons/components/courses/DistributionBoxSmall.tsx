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
    <div className={styles.distributionBox} style={{ 
        backgroundColor: chroma(textColor).alpha(0.32).css(), 
        color: textColor,
     }}>{text}</div>
  );
}

