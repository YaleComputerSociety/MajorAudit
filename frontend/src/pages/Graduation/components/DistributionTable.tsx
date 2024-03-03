import React from "react";
import { List } from "lodash";
import Table from "react-bootstrap/Table";
import DistributionBox from "./DistributionBox";
import CourseBox from "./CourseBox";

type Props = {
  readonly year: number;
  readonly classListHu: List<string>;
  readonly classListSo: List<string>;
  readonly classListSc: List<string>;
  readonly classListQR: List<string>;
  readonly classListWR: List<string>;
  readonly classListL: List<string>;
};

function getRequirements({
  type,
  year,
}: {
  readonly type: string;
  readonly year: number;
}) {
  if (type === "Areas") {
    if (year === 1) {
      return 0;
    } else if (year === 2) {
      return 1;
    } else if (year === 3) {
      return 1;
    } else if (year === 4) {
      return 2;
    }
  } else if (type === "Skills") {
    if (year === 1) {
      return 1.33;
    } else if (year === 2) {
      return 1;
    } else if (year === 3) {
      return 2;
    } else if (year === 4) {
      return 2;
    }
  }
  return 0;
}

export default function Graduation({
  year,
  classListHu,
  classListSo,
  classListSc,
  classListQR,
  classListWR,
  classListL,
}: Props) {
  return (
    <div>
      <Table style={{ borderSpacing: "5px" }}>
        <tr>
          <th>AREAS</th>
          <th>CREDITS</th>
          <th>COURSES</th>
        </tr>
        <tr>
          <td>
            <DistributionBox text="Hu - Humanities & Arts" />
          </td>
          <td
            style={{
              color:
                getRequirements({ type: "Areas", year: year }) <=
                classListHu.length
                  ? "green"
                  : "red",
            }}
          >
            {classListHu.length +
              "/" +
              getRequirements({ type: "Areas", year: year })}
          </td>
          <td style={{ display: "flex", flexDirection: "row" }}>
            <CourseBox text="LING 191" hasCheck={true} distributions={["Hu"]} />
            <CourseBox
              text="ARCH 306"
              hasCheck={false}
              distributions={["Hu"]}
            />
          </td>
        </tr>
        <tr>
          <td>
            <DistributionBox text="So - Social Sciences" />
          </td>
          <td
            style={{
              color:
                getRequirements({ type: "Areas", year: year }) <=
                classListSo.length
                  ? "green"
                  : "red",
            }}
          >
            {classListSo.length +
              "/" +
              getRequirements({ type: "Areas", year: year })}
          </td>
          <td style={{ display: "flex", flexDirection: "row" }}></td>
        </tr>
        <tr>
          <td>
            <DistributionBox text="Sc - Sciences" />
          </td>
          <td
            style={{
              color:
                getRequirements({ type: "Areas", year: year }) <=
                classListSc.length
                  ? "green"
                  : "red",
            }}
          >
            {classListSc.length +
              "/" +
              getRequirements({ type: "Areas", year: year })}
          </td>
          <td style={{ display: "flex", flexDirection: "row" }}>
            <CourseBox text="CGSC 274" distributions={["QR", "Sc", "So"]} />
          </td>
        </tr>
        <tr>
          <th>SKILLS</th>
          <th>CREDITS</th>
          <th>COURSES</th>
        </tr>
        <tr>
          <td>
            <DistributionBox text="QR - Quantitative Reasoning" />
          </td>
          <td
            style={{
              color:
                getRequirements({ type: "Skills", year: year }) <=
                classListQR.length
                  ? "green"
                  : "red",
            }}
          >
            {classListQR.length +
              "/" +
              getRequirements({ type: "Skills", year: year })}
          </td>
          <td style={{ display: "flex", flexDirection: "row" }}>
            <CourseBox
              text="NSCI 258"
              hasCheck={true}
              distributions={["Sc", "QR"]}
            />
            <CourseBox text="CPSC 223" distributions={["QR"]} />
          </td>
        </tr>
        <tr>
          <td>
            <DistributionBox text="WR - Writing" />
          </td>
          <td
            style={{
              color:
                getRequirements({ type: "Skills", year: year }) <=
                classListWR.length
                  ? "green"
                  : "red",
            }}
          >
            {classListWR.length +
              "/" +
              getRequirements({ type: "Skills", year: year })}
          </td>
          <td style={{ display: "flex", flexDirection: "row" }}></td>
        </tr>
        <tr>
          <td>
            <DistributionBox text="L - Language" />
          </td>
          <td
            style={{
              color:
                getRequirements({ type: "Skills", year: year }) <=
                classListL.length
                  ? "green"
                  : "red",
            }}
          >
            {classListL.length +
              "/" +
              getRequirements({ type: "Skills", year: year })}
          </td>
          <td style={{ display: "flex", flexDirection: "row" }}>
            <CourseBox text="KREN 110" distributions={["L"]} />
            <CourseBox text="KREN 120" distributions={["L"]} />
          </td>
        </tr>
      </Table>
    </div>
  );
}
