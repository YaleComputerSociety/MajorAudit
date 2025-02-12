
import { User } from "./../types/type-user";

export const Ryan: User = {
	name: "Ryan",
	netID: "rgg32",
	onboard: false,
	FYP: {
		studentCourses: [
			{ term: 202403, status: "DA", course: { codes: ["CPSC 201"], title: "Intro To Computer Science", credit: 1, dist: ["QR"], seasons: [] } },
			{ term: 202501, status: "DA", course: { codes: ["MATH 244"], title: "Discrete Mathematics", credit: 1, dist: ["QR"], seasons: [] } },
			{ term: 202503, status: "MA", course: { codes: ["CPSC 223"], title: "Data Structures", credit: 1, dist: ["QR"], seasons: [] } },
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
			]
		],
	}
}

export const NullUser: User = {
	name: "",
	netID: "",
	onboard: false,
	FYP: {
		studentCourses: [],
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
			]
		],
	}
}
