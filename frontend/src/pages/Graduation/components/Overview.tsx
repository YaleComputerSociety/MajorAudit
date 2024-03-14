
import React from "react";
import styles from "./../Graduation.module.css";

function OverviewMajor(){
    return(
        <div style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "20px", fontWeight: "540", color: "grey" }}>MAJOR</div>
        </div>
    );
}

function DistributionAreas(){
    return(
        <div style={{ marginRight: "14px" }}>
            <div style={{ fontSize: "16px", fontWeight: "540", color: "grey", marginBottom: "4px" }}>
                AREAS
            </div>
            <div style={{ display: "flex", textAlign: "center" }}>
                <div style={{ marginRight: "8px" }}>
                    <div className={styles.overviewDistBox} style={{ backgroundColor: "#E6CFF4", color: "#9970AB" }}>Hu</div>
                    <div style={{ fontSize: "14px", fontWeight: "530" }}>1/2</div>
                </div>
                <div style={{ marginRight: "8px" }}>
                    <div className={styles.overviewDistBox} style={{ backgroundColor: "#CFE0F4", color: "#5493C4" }}>So</div>
                    <div style={{ fontSize: "14px", fontWeight: "530" }}>0/2</div>
                </div>
                <div style={{ marginRight: "8px" }}>
                    <div className={styles.overviewDistBox} style={{ backgroundColor: "#D0F4CF", color: "#67AE5E" }}>Sc</div>
                    <div style={{ fontSize: "14px", fontWeight: "530" }}>2/2</div>
                </div>
            </div>
        </div>
    );
}

function DistributionSkills(){
    return(
        <div style={{ marginRight: "14px" }}>
            <div style={{ fontSize: "16px", fontWeight: "540", color: "grey", marginBottom: "4px" }}>
                SKILLS
            </div>
            <div style={{ display: "flex", textAlign: "center" }}>
                <div style={{ marginRight: "8px" }}>
                    <div className={styles.overviewDistBox} style={{ backgroundColor: "#F4CFCF", color: "#C1320A" }}>QR</div>
                    <div style={{ fontSize: "14px", fontWeight: "530" }}>0/2</div>
                </div>
                <div style={{ marginRight: "8px" }}>
                    <div className={styles.overviewDistBox} style={{ backgroundColor: "#F4DCCF", color: "#E37F1D" }}>WR</div>
                    <div style={{ fontSize: "14px", fontWeight: "530" }}>2/2</div>
                </div>
                <div style={{ marginRight: "8px" }}>
                    <div className={styles.overviewDistBox} style={{ backgroundColor: "#D2CEDB", color: "#231861" }}>L</div>
                    <div style={{ fontSize: "14px", fontWeight: "530" }}>2/2</div>
                </div>
            </div>
        </div>
    );
}

function OverviewDistributions(){
    return(
        <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", fontSize: "20px", fontWeight: "540", color: "grey", marginBottom: "8px", justifyContent: "space-between" }}>
                <div>DISTRIBUTIONS</div>
                <div>7/12</div>
            </div>
            <div style={{ display: "flex" }}>
                <DistributionAreas/>
                <DistributionSkills/>
            </div>
        </div>
    );
}

function TotalSemester(){
    return(
        <div style={{ marginRight: "10px" }}>
            <div style={{ fontSize: "12px", fontWeight: "540", color: "grey" }}>F1</div>
            <div style={{ fontSize: "12px", fontWeight: "540", color: "black" }}>4.5</div>
        </div>
    )
}

function OverviewTotal(){
    return(
        <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", fontSize: "20px", fontWeight: "540", color: "grey", marginBottom: "8px", justifyContent: "space-between" }}>
                <div>TOTAL</div>
                <div>36/36</div>
            </div>
            <div style={{ display: "flex" }}>
                <TotalSemester/>
                <TotalSemester/>
                <TotalSemester/>
                <TotalSemester/>
                <TotalSemester/>
                <TotalSemester/>
                <TotalSemester/>
                <TotalSemester/>
            </div>
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
