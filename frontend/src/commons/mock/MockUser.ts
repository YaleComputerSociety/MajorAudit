
import { User } from "../types/TypeUser";
import { Course } from "../types/TypeCourse";

export const EMPTYCOURSE: Course = { codes: ["N/A"], title: "Title NULL", credit: 1, dist: [], seasons: [] };

// What's the deal with CRN's? What's their time space?

// // "DA_COMPLETE" | "DA_PROSPECT" | "MA_VALID" | "MA_HYPOTHETICAL"

export const Ryan: User = {
  name: "Ryan",
  netID: "rgg32",
  onboard: true,
  FYP: {
		studentCourses: [
			{ term: 202401, status: "DA_PROSPECT", course: { codes: ["CPSC 323"], title: "Systems Programming", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] } },
			{ term: 202401, status: "DA_COMPLETE", course: { codes: ["CPSC 323"], title: "Systems Programming", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] } },
			{ term: 202401, status: "MA_VALID", course: { codes: ["CPSC 323"], title: "Systems Programming", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] } },
			{ term: 202401, status: "MA_HYPOTHETICAL", course: { codes: ["CPSC 323"], title: "Systems Programming", credit: 1, dist: ["So", "Hu", "QR", "Sc"], seasons: ["Fall", "Spring"] } },
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
