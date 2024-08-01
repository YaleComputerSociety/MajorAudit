
import { Course } from "../types/TypeCourse";

export const EMPTYCOURSE: Course = { codes: ["N/A"], title: "Title NULL", credit: 1, areas: [], skills: [], seasons: [] };

export const Ryan = {
	"netID": "rgg32",
	"onboard": true,
	"name": "Ryan",
	"degrees": ["Bachelor of Arts"],
  "language": "",
    "studentCourses": [
			{
				"course": {
					"codes": ["CPSC 323"],
					"title": "Introduction to Systems Programming and Computer Organization",
					"credit": 1,
					"seasons": ["Fall", "Spring"],
					"areas": [],
					"skills": ["QR"]
				},
				"term": 202401,
				"status": "DA_PROSPECT"
			},
			{
				"course": {
					"areas": ["Hu"],
					"codes": ["ENGL 376"],
					"credit": 1,
					"seasons": ["Fall", "Spring"],
					"skills": [],
					"title": "Theories and Histories of the Western Novel"
				},
				"term": 202303,
				"status": "DA_COMPLETE"
			},
			{
				"course": {
					"areas": ["Hu"],
					"codes": ["DRST 002"],
					"credit": 1,
					"seasons": ["Fall", "Spring"],
					"skills": ["WR"],
					"title": "Directed Studies: Literature"
				},
				"term": 202301,
				"status": "DA_COMPLETE"
			},
			{
				"course": {
					"areas": ["Hu"],
					"codes": ["ENGL 253", "HUMS 265"],
					"credit": 1,
					"seasons": ["Fall", "Spring"],
					"skills": [],
					"title": "Reading Ulysses: Modernist Classic and Postcolonial Epic"
				},
				"term": 202403,
				"status": "MA_VALID"
			},
			{
				"course": {
					"areas": ["Hu"],
					"codes": ["MAMA 200"],
					"credit": 1,
					"seasons": ["Fall", "Spring"],
					"skills": [],
					"title": "Release MajorAudit"
				},
				"term": 202501,
				"status": "MA_HYPOTHETICAL"
			},
			{
				"course": {
					"areas": ["So"],
					"codes": ["DRST 005"],
					"credit": 1,
					"seasons": ["Fall", "Spring"],
					"skills": [],
					"title": "Directed Studies: Historical and Political Thought"
				},
				"term": 202203,
				"status": "DA_COMPLETE"
			}
		]
}

