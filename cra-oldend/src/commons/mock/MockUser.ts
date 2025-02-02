
import { User } from "../../types/TypeUser";
import { Course } from "../../types/TypeCourse";

export const EMPTYCOURSE: Course = { codes: ["N/A"], title: "TITLE", credit: 1, dist: [], seasons: [] };

// What's the deal with CRN's? What's their time space?

// // "DA_COMPLETE" | "DA_PROSPECT" | "MA_VALID" | "MA_HYPOTHETICAL"

export const Ryan: User = {
  name: "Ryan",
  netID: "rgg32",
  onboard: true,
  FYP: {
		studentSemesters: [
			{ season: 202203, studentCourses: [{ term: 202203, status: "DA_COMPLETE", course: { codes: ["CPSC 223"], title: "Data Structures", credit: 1, dist: [], seasons: [] } }] },
			{ season: 202301, studentCourses: [{ term: 202301, status: "DA_COMPLETE", course: { codes: ["CPSC 323"], title: "Systems", credit: 1, dist: [], seasons: [] } }] },
		],
		languageRequirement: "",
		degreeDeclarations: [],
		degreeConfigurations: [
			[
			],
			[
			],
			[
			],
			[
			],
		],
	}
}
