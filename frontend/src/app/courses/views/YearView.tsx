import React from "react";
import SemesterBox from "../semester/SemesterBox";
import Style from "./YearView.module.css";
import { StudentSemester, User } from "@/types/type-user";

interface YearViewProps {
  semesters: StudentSemester[];
  edit: boolean;
  user: User;
  setUser: Function;
}

function YearView({ semesters, edit, user, setUser }: YearViewProps) {
  // Sort semesters by season (earliest first)
  const sortedSemesters = [...semesters].sort((a, b) => a.season - b.season);

  // Group sorted semesters by year
  const groupedSemesters: { [year: string]: StudentSemester[] } = {};

  const years = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Sixth Year", "Seventh Year", "Eighth Year", "Ninth Year", "Tenth Year"];
  let yearTrack = 0;

  sortedSemesters.forEach((semester) => {
    const year = Math.floor(semester.season / 100); // Extract the year (e.g., 2023 from 202301)
    if (!groupedSemesters[year]) {
      groupedSemesters[year] = [];
    }
    groupedSemesters[year].push(semester);
  });

  return (
    <div className={Style.yearView}>
      {/* Iterate over each year */}
      {Object.entries(groupedSemesters).map(([year, semestersInYear]) => (
        <div key={year} className={Style.yearContainer}>
          <h3 className={Style.yearHeader}>{years[yearTrack++]}<span className={Style.yearHeader_year}> ({year}-{Number(year)+1})</span></h3>
          {/* Render Fall and Spring semesters side by side */}
          <div className={Style.semesterRow}>
            {semestersInYear.map((semester) => (
              <div key={semester.season} className={Style.semesterContainer}>
                <h4 className={Style.semesterHeader}>
                </h4>
                <SemesterBox
                  edit={edit}
                  studentSemester={semester}
                  user={user}
                  setUser={setUser}
                  width={`${semestersInYear.length === 3 ? 350 : 560}px`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default YearView;