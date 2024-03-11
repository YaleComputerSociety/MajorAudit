
import React from "react";
import { List } from "lodash";
import DistributionsCircle from "../../pages/Graduation/components/DistributionsCircle";
import "./CourseBox.css"

type Props = {
  readonly text: string;
  readonly semesters?: string;
  readonly hasCheck?: boolean;
  readonly distributions: List<string>;
};

export default function ClassBox({ text, semesters, hasCheck, distributions }: Props) {
  return (
    <div className="CourseBox">
      {hasCheck ? "✓ " : ""}
      {text}
      {distributions.length > 0 ? (<DistributionsCircle distributions={distributions}/>) : ("")}
    </div>
  );
}
