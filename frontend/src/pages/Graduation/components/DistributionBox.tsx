import React from "react";
import chroma from "chroma-js"

type Props = {
  readonly text: string;
  readonly textColor: string;
};

export default function DistributionBox({ text, textColor }: Props) {
  return (
    <div
      style={{
        borderRadius: "5px",
        color: textColor,
        backgroundColor: chroma(textColor).alpha(0.16).css(),
        width: "max-content",
        padding: "2px 4px",
        fontWeight: "bold"
      }}
    >
      {text}
    </div>
  );
}
