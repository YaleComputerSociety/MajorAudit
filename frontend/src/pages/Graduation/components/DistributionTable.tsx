
import React from "react";
import { List } from "lodash";
import Table from "react-bootstrap/Table";

import DistributionBox from "./DistributionBox";

import { Course, ClassLists } from "./../../../commons/types";
import CourseBox from "../../../commons/components/courses/CourseBox";

function getRequirements({ type, year }: { readonly type: "Areas" | "Skills"; readonly year: number }) {
  switch (type) {
    case "Areas":
      switch (year) {
        case 1:
          return 0;
        case 2:
        case 3:
          return 1;
        case 4:
          return 2;
      }
      break;
    case "Skills":
      switch (year) {
        case 1:
        case 2:
          return 1.33;
        case 3:
        case 4:
          return 2;
      }
      break;
  }
  return 0;
}

function RenderRow(text: string, classList: Array<Course>, type: "Areas" | "Skills", year: number) {
  const req = getRequirements({ type, year });
  return (
    <tr key={text}>
      <td>
        <DistributionBox text={text} />
      </td>
      <td style={{ color: classList.length >= req ? "green" : "red" }}>
        {classList.length}/{req}
      </td>
      <td style={{ display: "flex", flexDirection: "row" }}>
        {classList.map((course, index) => (
          <CourseBox key={index} {...course} />
        ))}
      </td>
    </tr>
  );
}

function DistributionTable({ year, cls }: { year: number; cls: ClassLists }) {
  return (
    <div>
      <Table style={{ borderSpacing: "5px" }}>
        <thead>
          <tr>
            <th>AREAS</th><th>CREDITS</th><th>COURSES</th>
          </tr>
        </thead>
        <tbody>
          {RenderRow("Hu - Humanities & Arts", cls.clHu, "Areas", year)}
          {RenderRow("So - Social Sciences", cls.clSo, "Areas", year)}
          {RenderRow("Sc - Sciences", cls.clSc, "Areas", year)}
          <tr>
            <th>SKILLS</th><th>CREDITS</th><th>COURSES</th>
          </tr>
          {RenderRow("WR - Writing", cls.clWR, "Skills", year)}
          {RenderRow("QR - Quantitative Reasoning", cls.clQR, "Skills", year)}
          {RenderRow("L - Language", cls.clL, "Skills", year)}
        </tbody>
      </Table>
    </div>
  );
}

export default DistributionTable;