
import React from "react";
import Style from "./SemesterBox.module.css"

import { StudentSemester, User } from "@/types/type-user";

import CourseBox from "./course/CourseBox";
import AddCourseButton from "./add-course/AddCourseButton";

function translateSemester(semesterCode: number) {
  let year = Math.floor(semesterCode/100);
  let seasonCode = semesterCode % 10;
  let season = seasonCode === 1 ? "Fall" : seasonCode === 3 ? "Spring" : "Summer";
  return `${season} ${year}`; 
}

function getCredits(semester: StudentSemester){
  let credit = 0
  for(const course of semester.studentCourses)
  {
    credit += course.course.credit;
  }

  return credit;
}

function updateStatus(semester : StudentSemester){
  const date = new Date()
  const currYear = date.getFullYear();
  const month_day = Number(String(date.getMonth() + 1) + String(date.getDate()))


  //when the semester ends according to month+day
  const semesterEnds: { [key: number]: number } = {    
    1: 1224,
    3: 515,
    5: 828
  };

  let semesterYear = Math.floor(semester.season / 100);
  const semesterSeasonCode = semester.season % 10;

  if(semesterSeasonCode == 3 || semesterSeasonCode == 5)
    semesterYear++;

  if(currYear > semesterYear || (currYear == semesterYear && month_day > semesterEnds[semesterSeasonCode]))
  {
    console.log(`curr Year ${currYear} > semesterYear ${semesterYear}, or month_day ${month_day} > semesterEnds ${semesterEnds[semesterSeasonCode]}`)
    for(const course of semester.studentCourses)
      course.status = "DA_COMPLETE";
  }
}

function SemesterBox(props: { edit: boolean, studentSemester: StudentSemester, user: User, setUser: Function, width?: string}) {

  updateStatus(props.studentSemester);
  const isEmpty = (props.studentSemester.studentCourses.length == 0) ? true : false;
  const width = props.width || "560px";

  const studentCourseBoxes = isEmpty ? (
		<div className={Style.courseBox} style={{width: width}}> 
					<div className={Style.CourseCode}>
						{"No Courses Added Yet"}
					</div>
    </div>
  ) : (
    props.studentSemester.studentCourses.map((studentCourse, index) => (
      <CourseBox key={index} edit={props.edit} studentCourse={studentCourse} user={props.user} setUser={props.setUser} width={width}/>
    ))
  );
  


  const infoData = [
    {name: "CREDITS", value: getCredits(props.studentSemester), color: "#d9deda", text_color: "#5e5f61"},
    {name: "RATING", value: "~4.0", color: "#D9F4CF", text_color: "#66C10A"},
    {name: "WORKLOAD", value: "~3.8", color: "#F4E3CF", text_color: "#CA7108"}
    /*{name: "DISTRIBUTIONALS"}*/
  ]

  return(
    <div className={Style.Column} style={{ marginBottom: "8px" }}>
      <div className={Style.SemesterCode} style={{ marginBottom: "10px" }}>
				{translateSemester(props.studentSemester.season)}
      </div>
      <div className={Style.InfoRow}>
      {infoData.map((item, index) => (
            <div key={index} className={Style.InfoBox}>
              <div className={Style.InfoTitle}>{item.name}</div>
              <div className={Style.InfoValue} style={{ backgroundColor: item.color, color: item.text_color}}>
                {item.value}
              </div>
            </div>
          ))}
      </div>
			<div style={{ marginLeft: "20px" }}>
				{studentCourseBoxes}
				{props.edit && <AddCourseButton term={props.studentSemester.season} user={props.user} setUser={props.setUser} width={width}/>}
			</div>
    </div>
  );
}

export default SemesterBox;
