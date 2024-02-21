import React from "react";
import DistributionBox from "./components/DistributionBox";
import Navbar from "./components/Navbar";
import { skillsAreasColors } from './utilities/constants';

export default function Graduation() {
  return (
    <div>
      <Navbar />
      <DistributionBox
        text="Hu - Humanities & Arts"
        textColor={skillsAreasColors["Hu"]}
      />
      <DistributionBox
        text="So - Social Sciences"
        textColor={skillsAreasColors["So"]}
      />
      <DistributionBox
        text="Sc - Sciences"
        textColor={skillsAreasColors["Sc"]}
      />
      <DistributionBox
        text="QR - Quantitative Reasoning"
        textColor={skillsAreasColors["QR"]}
      />
      <DistributionBox
        text="WR - Writing"
        textColor={skillsAreasColors["WR"]}
      />
      <DistributionBox
        text="L - Language"
        textColor={skillsAreasColors["L"]}
      />
    </div>
  );
}
