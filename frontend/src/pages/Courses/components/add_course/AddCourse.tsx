
import React from "react";
import styles from "./AddCourse.module.css";

import CourseBoxSmall from "./../../../../commons/components/courses/CourseBoxSmall";

import { MockCourses } from "../../../../commons/mock/MockCourses";

function AddCourseMenu(){
    return(
        <div className={styles.CourseMenuContainer}>
            <input type="text" placeholder="Search Courses..." className={styles.SearchBar}/>
            <div>
                <div className={styles.SectionHeader}>
                    Pinned Courses
                </div>
                {MockCourses.map(course => (
                    <div style={{ marginBottom: "4px" }}>
                        <CourseBoxSmall course={course} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddCourseMenu;

