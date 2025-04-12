
import React from "react";
// import chroma from "chroma-js"
//import { skillsAreasColors } from '../../utilities/constants';

type Props = {
  readonly text: string;
};

const skillsAreasColors: Record<string, [string, string]> = {
  "Hu - Humanities & Arts": ["#7b1fa2", "#f3e5f5"],
  "So - Social Sciences": ["#0288d1", "#e1f5fe"],
  "Sc - Sciences": ["#43a047", "#e8f5e9"],
  "QR - Quantitative Reasoning": ["#c2185b", "#fce4ec"],
  "WR - Writing": ["#f57c00", "#fff3e0"],
  "L - Language": ["#6d4c41", "#efebe9"],
};
export default function DistributionBox({ text }: Props) {
  const textColor = skillsAreasColors[text][0];
  const backgroundColor = skillsAreasColors[text][1]

  return (
    <div
      style={{
        borderRadius: "5px",
        color: textColor,
        backgroundColor: backgroundColor,
        // backgroundColor: chroma(textColor).alpha(0.16).css(),
        width: "max-content",
        padding: "2px 4px",
        fontWeight: "bold"
      }}
    >
      {text}
    </div>
  );
}
