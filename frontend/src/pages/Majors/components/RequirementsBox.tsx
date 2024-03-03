import React from "react";
import styles from "./../Majors.module.css";
import { MockData } from "../mock/mock";
import { Major } from "../../../commons/types";

function ReqBoxSub(props: { maj: Major }) {
  return (
    <div className={styles.SubSection}>
      <ul>
        {props.maj.requirements.map((req) => (
          <div style={{ lineHeight: "0", marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{req.name}</h3>
              <div>
                <h3>
                  {req.coursesCompleted}/{req.coursesTotal}
                </h3>
              </div>
            </div>
            <p>{req.description}</p>
            {req.subsections.map((sub) => (
              <div>
                <p>{sub.name}</p>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {sub.courses.map((course) => (
                    <p style={{ marginRight: "10px", marginBottom: "2px" }}>
                      {course.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
}

function ReqBoxAll() {
  return (
    <div className={styles.reqsContainer}>
      <div>
        <h1>Requirements</h1>
        <div>
          <ReqBoxSub maj={MockData} />
        </div>
      </div>
    </div>
  );
}

export default ReqBoxAll;
