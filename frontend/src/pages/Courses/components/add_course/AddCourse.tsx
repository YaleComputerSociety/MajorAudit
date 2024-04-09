
import React from "react";
import styles from "./AddCourse.module.css";

function AddCourseMenu(){
    return(
        <div>
            <input type="text" placeholder="Search Courses..." className={styles.SearchBar}/>
        </div>
    );
}

export default AddCourseMenu;

