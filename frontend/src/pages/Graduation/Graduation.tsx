import React from "react";
import DistributionBox from "./components/DistributionBox";
import CourseBox from "./components/CourseBox";
import Navbar from "./components/Navbar";

export default function Graduation() {
  return (
    <div>
      <Navbar />
      <DistributionBox text="Hu - Humanities & Arts" />
      <DistributionBox text="So - Social Sciences" />
      <DistributionBox text="Sc - Sciences" />
      <DistributionBox text="QR - Quantitative Reasoning" />
      <DistributionBox text="WR - Writing" />
      <DistributionBox text="L - Language" />
      <CourseBox text="LING 191" hasCheck={true} distributions={["Hu"]} />
      <CourseBox text="CGSC 274" distributions={["QR", "Sc", "So"]} />
      <CourseBox text="CPSC 419" distributions={[]} />
    </div>
  );
}
