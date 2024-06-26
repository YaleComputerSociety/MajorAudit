
import React from "react";
import styles from "./../Graduation.module.css";

import CourseBoxSmall from "../../../commons/components/courses/CourseBoxSmall";
import { Degree } from "../../../commons/types/TypeProgram"

import { Course, StudentCourse } from "../../../commons/types/TypeCourse";


function DegreeTopshelf(props: { degree: Degree }) {
    return(
        <div style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "500" }}>
            Degree ⚙
        </div>
    );
}

function DegreeContent(props: { degree: Degree }) {
    return (
        <div>
            <div>
                <div style={{ marginBottom: "16px", fontSize: "26px", fontWeight: "500" }}>
                    {props.degree.metadata.degreeType === "BACH_ART" ? (
                        <span style={{ fontStyle: "italic" }}>B.A.</span>
                    ) : (
                        props.degree.metadata.degreeType
                    )}
                    {props.degree.metadata.name}
                </div>
            </div>
            <div>
                {props.degree.requirements.map((req) => (
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={styles.subsectionHeader} style={{ marginBottom: "4px" }}>
                                {req.name}
                            </div>
                            <div style={{ color: "grey" }}>
                                {req.coursesCompleted}/{req.coursesTotal}
                            </div>
                        </div>
                        {req.description && (
                            <div style={{ fontSize: "10px", fontStyle: "italic", marginBottom: "8px" }}>
                                {req.description}
                            </div>
                        )}

                        {/* Line of Courses */}
                        {req.subsections.map((sub, subIndex) => (
                            sub.name !== "POPULAR" && (
                                <div key={subIndex} style={{ marginBottom: subIndex === req.subsections.length - 1 ? "14px" : "4px" }}>
                                    {sub.name && <div style={{ fontSize: "12px", marginBottom: "4px" }}>{sub.name}</div>}
                                    <div style={{ display: "flex", flexWrap: "wrap"  }}>
                                        {sub.courses.map((course, courseIndex) => (
                                            <div
                                                key={courseIndex}
                                                style={{
                                                display: "flex",
                                                marginBottom: "4px",
                                                marginRight: courseIndex % 3 === 2 ? "10px" : "0",
                                                }}
                                            >
                                            <CourseBoxSmall 
                                                course={(course as StudentCourse).course ? undefined : course as Course}
                                                studentCourse={(course as StudentCourse).course ? course as StudentCourse : undefined}
                                              />
                                              {courseIndex < sub.courses.length - 1 && (
                                                courseIndex % 3 === 2 ? <br /> : <div>/</div>
                                              )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function DegreeOverview(props: { degree: Degree }){
    return(
        <div className={styles.reqsContainer}>
            <DegreeTopshelf degree={props.degree}/>
            <DegreeContent degree={props.degree}/>
        </div>
    );
}

export default DegreeOverview;
