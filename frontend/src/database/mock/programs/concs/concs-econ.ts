
// import { ConcentrationSubrequirement, ConcentrationRequirement, DegreeConcentration } from "@/types/type-program";
// import { ECON_108, ECON_110, ECON_111, ECON_115, ECON_116, ECON_117, ECON_121, ECON_122, ECON_123, ECON_125, ECON_126, ECON_136, MATH_110, MATH_111, MATH_112, MATH_115, MATH_116, MATH_118, MATH_120, ENAS_151, SC_ECON_110 } from "../../data-courses";

// // // INTRO

// const INTRO_1: ConcentrationSubrequirement = {
// 	subreq_name: "MATH",
// 	subreq_desc: "118 or 120 recommended. Any MATH 200+ satisfies.",
// 	subreq_flex: true,
// 	subreq_courses_req_count: 1,
// 	subreq_options: [
// 		{
// 			o: MATH_118,
// 			s: null,
// 		},
// 		{
// 			o: MATH_120,
// 			s: null,
// 		},
// 	]
// }

// const INTRO_2: ConcentrationSubrequirement = {
// 	subreq_name: "INTRO MICRO",
// 	subreq_desc: "",
// 	subreq_flex: true,
// 	subreq_courses_req_count: 1,
// 	subreq_options: [
// 		{
// 			o: ECON_108,
// 			s: null,
// 		},
// 		{
// 			o: ECON_110,
// 			s: null,
// 		},
// 		{
// 			o: ECON_115,
// 			s: null,
// 		},
// 	]
// }

// const INTRO_3: ConcentrationSubrequirement = {
// 	subreq_name: "INTRO MACRO",
// 	subreq_desc: "",
// 	subreq_flex: true,
// 	subreq_courses_req_count: 1,
// 	subreq_options: [
// 		{
// 			o: ECON_111,
// 			s: null,
// 		},
// 		{
// 			o: ECON_116,
// 			s: null,
// 		},
// 	]
// }

// const ECON_INTRO: ConcentrationRequirement = {
// 	req_name: "INTRO",
// 	req_desc: "",
// 	courses_required_count: 3,
// 	subreqs_list: [INTRO_1, INTRO_2, INTRO_3]
// }

// // // CORE

// const CORE_MICRO: ConcentrationSubrequirement = {
// 	subreq_name: "INTERMEDIATE MICRO",
// 	subreq_desc: "",
// 	subreq_flex: false,
// 	subreq_courses_req_count: 1,
// 	subreq_options: [
// 		{
// 			o: ECON_121,
// 			s: null,
// 		},
// 		{
// 			o: ECON_125,
// 			s: null,
// 		},
// 	]
// }

// const CORE_MACRO: ConcentrationSubrequirement = {
// 	subreq_name: "INTERMEDIATE MACRO",
// 	subreq_desc: "",
// 	subreq_flex: false,
// 	subreq_courses_req_count: 1,
// 	subreq_options: [
// 		{
// 			o: ECON_122,
// 			s: null,
// 		},
// 		{
// 			o: ECON_126,
// 			s: null,
// 		},
// 	]
// }

// const CORE_METRICS: ConcentrationSubrequirement = {
// 	subreq_name: "ECONOMETRICS",
// 	subreq_desc: "",
// 	subreq_flex: false,
// 	subreq_courses_req_count: 1,
// 	subreq_options: [
// 		{
// 			o: ECON_117,
// 			s: null,
// 		},
// 		{
// 			o: ECON_123,
// 			s: null,
// 		},
// 		{
// 			o: ECON_136,
// 			s: null,
// 		},
// 	]
// }

// const ECON_CORE: ConcentrationRequirement = {
// 	req_name: "CORE",
// 	req_desc: "",
// 	courses_required_count: 3,
// 	subreqs_list: [CORE_MICRO, CORE_MACRO, CORE_METRICS]
// }

// // // ELECTIVE

// const ELEC_SUB: ConcentrationSubrequirement = {
// 	subreq_name: "",
// 	subreq_desc: "Standard elective or DUS approved extra-department substitution.",
// 	subreq_flex: true,
// 	subreq_courses_req_count: 1,
// 	subreq_options: [
// 		{ o: null, s: null, n: { e: { dept: "ECON", min: 123, max: 399 }, a: true } },
// 	]
// }

// const ELEC_STAN: ConcentrationSubrequirement = {
// 	subreq_name: "",
// 	subreq_desc: "Intermediate or advanced ECON courses, traditionally numbered 123+.",
// 	subreq_flex: true,
// 	subreq_courses_req_count: 3,
// 	subreq_options: [
// 		{ o: null, s: null, n: { e: { dept: "ECON", min: 123, max: 399 } } },
// 		{ o: null, s: null, n: { e: { dept: "ECON", min: 123, max: 399 } } },
// 		{ o: null, s: null, n: { e: { dept: "ECON", min: 123, max: 399 } } },
// 	]
// }

// const ECON_ELECTIVE: ConcentrationRequirement = {
// 	req_name: "ELECTIVE",
// 	req_desc: "",
// 	courses_required_count: 4,
// 	subreqs_list: [ELEC_STAN, ELEC_SUB]
// }

// // SENIOR

// const SEN_REQ: ConcentrationSubrequirement = {
// 	subreq_name: "SENIOR REQUIREMENT",
// 	subreq_desc: "",
// 	subreq_flex: true,
// 	subreq_courses_req_count: 2,
// 	subreq_options: [
// 		{
// 			o: null,
// 			s: null,
// 			n: {
// 				e: { dept: "ECON", min: 400, max: 491 }
// 			}
// 		},
// 		{
// 			o: null,
// 			s: null,
// 			n: {
// 				e: { dept: "ECON", min: 400, max: 491 }
// 			}
// 		},
// 	]
// }

// const ECON_SEN: ConcentrationRequirement = {
// 	req_name: "SENIOR",
// 	req_desc: "",
// 	courses_required_count: 2,
// 	subreqs_list: [SEN_REQ]
// }

// // // // FINAL

// export const CONC_ECON_BA_I: DegreeConcentration = {
// 	user_status: 0,
// 	conc_name: "",
// 	conc_desc: "",
// 	conc_reqs: [ECON_INTRO, ECON_CORE, ECON_ELECTIVE, ECON_SEN]
// }
