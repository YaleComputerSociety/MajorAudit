import { List } from "lodash";
import DistributionsCircle from "./DistributionsCircle";
import React from "react";

type Props = {
  readonly text: string;
  readonly semesters?: string;
  readonly hasCheck?: boolean;
  readonly distributions: List<string>;
};

export default function ClassBox({
  text,
  semesters,
  hasCheck,
  distributions,
}: Props) {
  return (
    <div
      style={{
        borderRadius: "15px",
        backgroundColor: "#E4E9F8",
        width: "max-content",
        padding: "2px 4px",
        fontSize: "14px",
        fontWeight: "bold",
        position: "relative",
        verticalAlign: "center"
      }}
    >
      {hasCheck ? "✓ " : ""}
      {text}
      {distributions.length > 0 ? (
        <DistributionsCircle distributions={distributions} />
      ) : (
        ""
      )}
    </div>
  );
}
