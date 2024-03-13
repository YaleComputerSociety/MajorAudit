
import React from "react";
import styles from "./../Graduation.module.css";

function OverviewMajor(){
    return(
        <div style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "20px", fontWeight: "475", color: "grey" }}>Major</div>
        </div>
    );
}

function OverviewDistributions(){
    return(
        <div style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "20px", fontWeight: "475", color: "grey" }}>Distributions</div>
        </div>
    );
}

function OverviewTotal(){
    return(
        <div style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "20px", fontWeight: "475", color: "grey" }}>Total</div>
        </div>
    );
}

function GraduationOverview(){
    return(
      <div className={styles.containerOverview}>
        <div style={{ fontSize: "30px", fontWeight: "500" }}>Overview</div>
        <OverviewMajor/>
        <OverviewDistributions/>
        <OverviewTotal/>
      </div>
    );
}

export default GraduationOverview;
