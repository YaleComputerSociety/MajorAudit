import React from "react";
import styles from "./Majors.module.css";

import { Major } from "./../../commons/types";
import { MockData } from "./mock/mock";

import MajorMetadataBox from "./components/MajorMetadataBox";
import MajorRequirementsBox from "./components/MajorRequirementsBox";

export const Majors = () => {
  return(
    <div className={styles.container}>
        <MajorMetadataBox major={MockData} />
        <MajorRequirementsBox major={MockData}/>
    </div>
  );
};

export default Majors;
