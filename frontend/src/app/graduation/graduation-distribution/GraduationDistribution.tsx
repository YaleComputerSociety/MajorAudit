
import React from "react";
import Table from "react-bootstrap/Table";

import styles from "./GraduationDistribution.module.css";

import DistributionBox from "./DistributionBoxLarge";
import { StudentCourseIcon } from "../../../components/course-icon/CourseIcon";
import InfoButton from "./InfoButton";

import { StudentCourse } from "@/types/type-user";


// account for credit/d taking

function getRequirements(type: string, year: number) {
  if (type === "Areas") {
    if (year === 1) {
      return 0;
    } else if (year === 2) {
      return 1;
    } else if (year === 3) {
      return 1;
    } else if (year === 4) {
      return 2;
    }
  } else if (type === "Skills") {
    if (year === 1) {
      return 1;
    } else if (year === 2) {
      return 1;
    } else if (year === 3) {
      return 2;
    } else if (year === 4) {
      return 2;
    }
  }
  return 0;
}

function RenderRowLanguage(year: number, LList: Array<StudentCourse>){

  if(year === 2){
    return(
      RenderRow("L - Language", 1, LList)
    );
  }

  const storedLanguagePlacement = localStorage.getItem("languagePlacement");
  let languagePlacement: string | null;
  if(storedLanguagePlacement) {
    languagePlacement = storedLanguagePlacement;
  }else{
    return <div></div>
  }

  // if 3 or 4
  let required: number = 0;
  if(languagePlacement === "L1" || languagePlacement === "L2"){
    required = 3;
  }else{
    required = 2;
  }


  return(
    <tr key={"L - Language"}>
      <td>
        <DistributionBox text={"L - Language"} />
      </td>
      <td style={{ color: LList.length >= required ? "green" : "red"}}>
      {`${LList.length}/${required}`}

      </td>
      <td style={{ display: "flex", flexDirection: "row", gap: "3px" }}>
        {LList.slice(0, required).map((course, index) => (
          <StudentCourseIcon key={index} studentCourse={course} />
        ))}
      </td>
    </tr>
  );
}

function RenderRow(text: string, required: number, classList: Array<StudentCourse> ) {

  if(required === 0){
    return(
    <tr key={text}>
      <td ><DistributionBox text={text} /></td>
      <td style={{ color: "green", paddingLeft: "20px"}}>0/0{/*<span>&#10003;</span>*/}</td>
      <td></td>
    </tr>
    )
  }

  const displayValue = (value: number) => {
    switch (value) {
      case 0.5:
        return "½";
      case 2 / 3:
        return "⅔";
      default:
        return value;
    }
  };

  return(
    <tr key={text}>
      <td>
        <DistributionBox text={text} />
      </td>
      <td style={{ color: classList.length >= required ? "green" : "red" , paddingLeft: "20px"}}>
      {`${displayValue(classList.length)}/${displayValue(required)}`}

      </td>
      <td style={{ display: "flex", flexDirection: "row", gap: "3px" }}>
        {classList.slice(0, required).map((course, index) => (
          <StudentCourseIcon key={index} studentCourse={course} />
        ))}
      </td>
    </tr>
  );
}

function DistributionTableFirstYear(props: { QRList: StudentCourse[], WRList: StudentCourse[], LList: StudentCourse[] }){

  let QRLen = props.QRList.length;
  let WRLen = props.WRList.length;
  let LLen = props.LList.length;

  let QRreq = 0;
  let WRreq = 0;
  let Lreq = 0;

  if (QRLen > 0 && WRLen > 0 && LLen > 0) {
    QRreq = 1;
    WRreq = 1;
    Lreq = 1;
  } else if ((QRLen > 0 && WRLen > 0 && LLen === 0) || 
             (QRLen > 0 && WRLen === 0 && LLen > 0) || 
             (QRLen === 0 && WRLen > 0 && LLen > 0)) {
    QRreq = QRLen > 0 ? 1 : 0;
    WRreq = WRLen > 0 ? 1 : 0;
    Lreq = LLen > 0 ? 1 : 0;
  } else if ((QRLen > 0 && WRLen === 0 && LLen === 0) || 
             (QRLen === 0 && WRLen > 0 && LLen === 0) || 
             (QRLen === 0 && WRLen === 0 && LLen > 0)) {
    QRreq = QRLen > 0 ? 1 : 0.5;
    WRreq = WRLen > 0 ? 1 : 0.5;
    Lreq = LLen > 0 ? 1 : 0.5;
  } else {
    QRreq = 2 / 3;
    WRreq = 2 / 3;
    Lreq = 2 / 3;
  }

  return(
    <div>
      <Table className = {styles.text} style={{ borderSpacing: "5px" }}>
        <thead>
          <tr >
            <th style={{ width: "40%", padding: "2px" }}>
              <div style={{ display: "flex", flexDirection: "row"}}>
              AREAS <InfoButton text="test areas" />
              </div>
              </th>
            <th style={{ width: "10%", padding: "2px" }}>CREDITS</th>
            <th style={{ width: "50%", padding: "2px" , textAlign: "left", paddingLeft:"40px"}}>COURSES</th>
          </tr>
        </thead>

        <tbody>
          {RenderRow("Hu - Humanities & Arts", 0, [])}
          {RenderRow("So - Social Sciences", 0, [])}
          {RenderRow("Sc - Sciences", 0, [])}

          <tr style={{ height: "10px" }}></tr>

          <tr>
            <th style={{ width: "40%", padding: "2px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
              SKILLS <InfoButton text="test skills" />
              </div></th>
            <th style={{ width: "10%", padding: "2px" }}>CREDITS</th>
            <th style={{ width: "50%", padding: "2px" , textAlign: "left", paddingLeft:"40px"}}>COURSES</th>
          </tr>
          {RenderRow("QR - Quantitative Reasoning", QRreq, props.QRList)}
          {RenderRow("WR - Writing", WRreq, props.WRList)}
          {RenderRow("L - Language", Lreq, props.LList)}
        </tbody>
      </Table>
    </div>
  );
}

function DistributionTable(props: { year: number; studentCourses: StudentCourse[] }){

  let HuList: StudentCourse[] = [];
  let SoList: StudentCourse[] = [];
  let ScList: StudentCourse[] = [];

  let QRList: StudentCourse[] = [];
  let WRList: StudentCourse[] = [];
  let LList: StudentCourse[] = [];

  props.studentCourses.forEach((studentCourse) => {
    const dist = studentCourse.course.dist;

    if (dist && dist.includes('Hu')) {
			HuList.push(studentCourse);
		}
		if (dist && dist.includes('So')) {
			SoList.push(studentCourse);
		}
		if (dist && dist.includes('Sc')) {
			ScList.push(studentCourse);
		}
		
		if (dist && dist.includes('QR')) {
			QRList.push(studentCourse);
		}
		if (dist && dist.includes('WR')) {
			WRList.push(studentCourse);
		}
		if (dist && dist.some(skill => skill.startsWith('L'))) {
			LList.push(studentCourse);
		}
  });

  if(props.year === 1){
    return (
      <DistributionTableFirstYear QRList={QRList} WRList={SoList} LList={LList}/>
    );
  }

  return (
    <div>
      <Table className={styles.text} style={{ borderSpacing: "5px" }}>
      <thead>
  <tr>
    <th style={{ width: "40%", padding: "2px" }}>
      <div style={{ display: "flex", flexDirection: "row"}}>
        AREAS <InfoButton text="test areas" />
      </div>
    </th>
    <th style={{ width: "10%", padding: "2px" }}>CREDITS</th>
    <th style={{ width: "50%", padding: "2px" , textAlign: "left", paddingLeft:"40px"}}>COURSES</th>
  </tr>
</thead>

        <tbody>
          {RenderRow("Hu - Humanities & Arts", getRequirements("Areas", props.year), HuList)}
          {RenderRow("So - Social Sciences", getRequirements("Areas", props.year), SoList)}
          {RenderRow("Sc - Sciences", getRequirements("Areas", props.year), ScList)}
          
          <tr style={{ height: "10px" }}></tr>

          <tr>
            <th style={{ width: "40%", padding: "2px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                SKILLS <InfoButton text="test skills" />
              </div>
            </th>
            <th style={{ width: "10%", padding: "2px" }}>CREDITS</th>
            <th style={{ width: "50%", padding: "2px" , textAlign: "left", paddingLeft:"40px"}}>COURSES</th>
          </tr>
          {RenderRow("QR - Quantitative Reasoning", getRequirements("Skills", props.year), QRList)}
          {RenderRow("WR - Writing", getRequirements("Skills", props.year), WRList)}
          {RenderRowLanguage(props.year, LList)}
        </tbody>
      </Table>
    </div>
  );
}

function Distribution(props: { currYear: number; alterCurrYear: Function; }){

  const storedStudentCourses = localStorage.getItem("studentCourses");
  let studentCourses: StudentCourse[] = [];
  if(storedStudentCourses) {
    studentCourses = JSON.parse(storedStudentCourses) as StudentCourse[];
  }

  return (
    <div className={styles.containerDistributions}>
      <div style={{ display: "flex", justifyContent: "flex-start", gap: "95px", marginBottom: "8px" }}>
        <div className={styles.title_text} style={{ fontSize: "30px"}}>
          Distributions
        </div>
        <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "5px" }} >
          {[1, 2, 3, 4].map((year) => (
            <button
              key={year}
              onClick={() => props.alterCurrYear(year)}
              style={{
                width: "100px", 
                backgroundColor: props.currYear === year ? "#1976d2" : "white",  
                color: props.currYear === year ? "white" : "black",  
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                marginRight: "0",  
                border: "1px solid white",  
              }}
            >
              {["Freshman", "Sophomore", "Junior", "Senior"][year - 1]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <DistributionTable year={props.currYear} studentCourses={studentCourses} />
      </div>
    </div>
  );
}

export default Distribution;
