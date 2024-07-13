
import React from "react";
import chroma from "chroma-js"
import { skillsAreasColors } from '../../utilities/constants';

type Props = {
  readonly text: string;
};

export default function DistributionBox({ text }: Props) {
  const textColor = skillsAreasColors[text];
  return (
    <div
      style={{
        borderRadius: "5px",
        color: textColor,
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
