import React from "react";

type Props = {
  readonly text: string;
  readonly textColor: string;
  readonly bgColor: string;
};

export default function DistributionBox({ text, textColor, bgColor }: Props) {
  return (
    <div
      style={{
        borderRadius: "5px",
        color: textColor,
        backgroundColor: bgColor,
        width: "max-content",
        padding: "2px 4px",
        fontWeight: "bold"
      }}
    >
      {text}
    </div>
  );
}
