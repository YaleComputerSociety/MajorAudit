
import { Program } from "../../types/TypeProgram";
import { Course } from "../../types/TypeCourse";

export const AFAM160: Course = { codes: ["AFAM 160"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const AFAM162: Course = { codes: ["AFAM 162"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const AFAM410: Course = { codes: ["AFAM 410"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const AFAM480: Course = { codes: ["AFAM 480"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const AFAM491: Course = { codes: ["AFAM 491"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };

export const AFAM: Program = {
	name: "African American History", 
	abbreviation: "AFAM",
	degrees: [
		{
			codes: [],
			metadata: {
				name: "African American History", 
				abbreviation: "AFAM",
				degreeType: "BACH_ART",
				stats: { 
					courses: 12, 
					rating: 0, 
					workload: 0, 
					type: "Hu",
				},
				students: 0,
				about: "",
				dus: { 
					name: "", 
					address: "", 
					email: "",
				},
				catologLink: "",
				wesbiteLink: "",
			},
			requirements: [
				{
					name: "Core",
					subsections: [
						{ 
							name: "African American History",
							description: "Can be taken in any order.",
							courses: [AFAM160, AFAM162] 
						},
						{ 
							name: "African American Literature",
							courses: [] 
						},
						{ 
							name: "African American Social Sciences",
							courses: [] 
						},
						{ 
							name: "Junior Seminar",
							courses: [AFAM410] 
						},
					],
				},
				{
					name: "Area of Focus",
					subsections: [
						{ 
							description: "",
							courses: [] 
						},
					],
				},
				{
					name: "Senior Requirement",
					subsections: [
						{ 
							courses: [AFAM480, AFAM491] 
						},
					],
				},
			],
		}
	]   
};
