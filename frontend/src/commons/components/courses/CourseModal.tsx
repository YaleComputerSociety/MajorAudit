import React from "react";
import styles from "./CourseModal.module.css";

import { Course } from "../../types/TypeCourse";

export default function CourseModal() {
  return (
    <div style={{position: "fixed", width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.2)"}}>
        <div
        style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "15vh 20vh 27vw 27vw",
            height: "65vh",
            width: "46vw",
            border: "4px solid black",
            borderRadius: "8px",
            backgroundColor: "red"
        }}
        >
            <h1>The Content</h1>
            <p>Once upon a midnight dreary...</p>
        </div>
    </div>
  );
}
