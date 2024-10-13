
export type Season = "Fall" | "Spring";
export type Distribution = "Hu" | "So" | "Sc" | "QR" | "WR" | "L";

export interface Course {
  codes: Array<string>; 		// ["FREN 403", "HUMS 409"]
  title: string; 						// "Proust Interpretations: Reading <i>Remembrance of Things Past</i>"
  credit: number 						// 1
  dist: Array<string>; 		// ["Hu"] # Combine pt. 1
  seasons: Array<string>; 	// ["Spring"] # Figure This Out
}

export interface StudentCourse {
  course: Course; 	// ^
	term: number; 		// 202401
  status: string; 	// "DA_COMPLETE" | "DA_PROSPECT" | "MA_VALID" | "MA_HYPOTHETICAL"
}

export interface AddCourseDisplay {
	active: boolean;
	dropVis: boolean;
}

export const nullAddCourseDisplay: AddCourseDisplay = {
	active: false,
	dropVis: false,
}


