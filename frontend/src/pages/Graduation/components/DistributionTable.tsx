import React from "react";
import Table from "react-bootstrap/Table";

import styles from "./../Graduation.module.css";

import DistributionBox from "../../../commons/components/courses/DistributionBoxLarge";
import CourseBoxSmall from "../../../commons/components/courses/CourseBoxSmall";
import InfoButton from "../../../navbar/InfoButton";

import { StudentCourse, ClassLists } from "../../../commons/types/TypeCourse";

import { MockStudent } from "../../../commons/mock/MockStudent";


const EXABC: ClassLists = {
  clHu: [],
  clSo: [],
  clSc: [],
  clQR: [],
  clWR: [],
  clL: [],
};

// parse MockStudent to ClassLists
MockStudent.metadata.forEach((courseSet) => {
  let allCourses = [...courseSet.fall, ...courseSet.spring]
  for (let c of allCourses) {
    if (c.course.distribution.includes("WR") && EXABC.clWR.length < 2) {
      EXABC.clWR.push(c);
    } else if (c.course.distribution.includes("So") && EXABC.clSo.length < 2) {
      EXABC.clSo.push(c);
    } else if (c.course.distribution.includes("Sc") && EXABC.clSc.length < 2) {
      EXABC.clSc.push(c);
    } else if (c.course.distribution.includes("QR") && EXABC.clQR.length < 2) {
      EXABC.clQR.push(c);
    } else if (c.course.distribution.includes("Hu") && EXABC.clHu.length < 2) {
      EXABC.clHu.push(c);
    } else if (c.course.distribution.includes("L") && EXABC.clL.length < 2) {
      EXABC.clL.push(c);
    }
  }
});


function getRequirements({ type, year }: { type: string; year: number }) {
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
      return 1;
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

function RenderRow(
  text: string,
  classList: Array<StudentCourse>,
  type: string,
  year: number
) {
  let reqNum = getRequirements({ type, year });
  return (
    <tr key={text}>
      <td>
        <DistributionBox text={text} />
      </td>
      <td style={{ color: classList.length >= reqNum ? "green" : "red" }}>
        {classList.length}/{reqNum}
      </td>
      <td style={{ display: "flex", flexDirection: "row", gap: "3px" }}>
        {classList.map((course, index) => (
          <CourseBoxSmall key={index} studentCourse={course} />
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
            <th>
              <div style={{ display: "flex", flexDirection: "row"}}>
                AREAS <InfoButton text="test areas" />
              </div>
            </th>
            <th>CREDITS</th>
            <th>COURSES</th>
          </tr>
        </thead>
        <tbody>
          {RenderRow("Hu - Humanities & Arts", cls.clHu, "Areas", year)}
          {RenderRow("So - Social Sciences", cls.clSo, "Areas", year)}
          {RenderRow("Sc - Sciences", cls.clSc, "Areas", year)}
          <tr>
            <th>
              <div style={{ display: "flex", flexDirection: "row" }}>
                SKILLS <InfoButton text="test skills" />
              </div>
            </th>
            <th>CREDITS</th>
            <th>COURSES</th>
          </tr>
          {RenderRow("QR - Quantitative Reasoning", cls.clQR, "Skills", year)}
          {RenderRow("WR - Writing", cls.clWR, "Skills", year)}
          {RenderRow("L - Language", cls.clL, "Skills", year)}
        </tbody>
      </Table>
    </div>
  );
}

function GraduationDistribution(props: {
  currYear: number;
  alterCurrYear: Function;
}) {
  return (
    <div className={styles.containerDistributions}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <div
          style={{ fontSize: "30px", fontWeight: "500", marginRight: "20px" }}
        >
          Distributions
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          {[1, 2, 3, 4].map((year) => (
            <button
              key={year}
              onClick={() => props.alterCurrYear(year)}
              style={{
                backgroundColor: props.currYear === year ? "#1976d2" : "white", // Set active button to blue
                color: props.currYear === year ? "white" : "black", // Set text color based on button state
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                marginRight: "0", // Remove margin between buttons
                border: "1px solid white", // Add white border
              }}
            >
              {["First-Year", "Sophomore", "Junior", "Senior"][year - 1]}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DistributionTable year={props.currYear} cls={EXABC} />
      </div>
    </div>
  );
}

export default GraduationDistribution;
