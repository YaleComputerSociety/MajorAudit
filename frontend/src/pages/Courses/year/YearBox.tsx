
import React from "react";
import Style from "./YearBox.module.css";
import SemesterBox from "./semester/SemesterBox";
import { User, Year } from "../../../commons/types/TypeUser";

const convertGrade = (grade: number) => {
  switch (grade) {
    case 1:
      return "First-Year";
    case 2:
      return "Sophomore";
    case 3:
      return "Junior";
    case 4:
      return "Senior";
    default:
      return "";
  }
};

export default function YearBox(props: {year: Year, edit: boolean, user: User, setUser: Function }){

  return(
    <div className={Style.yearComponent}>

        <div className={Style.row} style={{ marginBottom: "4px" }}>
            <div className={Style.Grade}>
              {convertGrade(props.year["grade"])}
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#727272", alignSelf: "flex-end", marginBottom: "2.5px" }}>
							{props.year["terms"][0].toString().slice(0, 4)}-{props.year["terms"][1].toString().slice(0, 4)}
            </div>
        </div>

        <div className={Style.row}>
            <div style={{ marginRight: "20px" }}>
              <SemesterBox  edit={props.edit} user={props.user} setUser={props.setUser} term={props.year["terms"][0]} TermSC={props.year["fall"]}/>
            </div>
            <SemesterBox    edit={props.edit} user={props.user} setUser={props.setUser} term={props.year["terms"][1]} TermSC={props.year["spring"]}/>
        </div>
    </div>
  );
}
