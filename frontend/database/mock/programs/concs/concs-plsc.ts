
// import { DegreeConcentration, ConcentrationRequirement, ConcentrationSubrequirement } from "@/types/type-program";
// import { PLSC_474, PLSC_490, PLSC_493 } from "@/database/data-courses";

// // INTRO

// const INTRO_REQ: ConcentrationSubrequirement = {
// 	subreq_name: "INTRO COURSES",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: [],
// }

// const PLSC_INTRO: ConcentrationRequirement = {
// 	req_name: "INTRO",
// 	req_desc: "",
// 	courses_required_count: 3,
// 	courses_satisfied_count: 1,
// 	subreqs_list: [INTRO_REQ]
// }

// // CORE

// const CORE_LECT: ConcentrationSubrequirement = {
// 	subreq_name: "CORE LECTURES",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: [],
// }

// const CORE_METH: ConcentrationSubrequirement = {
// 	subreq_name: "METHODS AND FORMAL THEORY",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: [],
// }

// const PLSC_CORE_STAN: ConcentrationRequirement = {
// 	req_name: "CORE",
// 	req_desc: "",
// 	courses_required_count: 3,
// 	courses_satisfied_count: 0,
// 	subreqs_list: [CORE_LECT, CORE_METH]
// }

// const CORE_RESE: ConcentrationSubrequirement = {
// 	subreq_name: "RESEARCH",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [PLSC_474],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: [],
// }

// const PLSC_CORE_INTE: ConcentrationRequirement = {
// 	req_name: "CORE",
// 	req_desc: "",
// 	courses_required_count: 4,
// 	courses_satisfied_count: 0,
// 	subreqs_list: [CORE_LECT, CORE_METH, CORE_RESE]
// }

// // ELECTIVE

// const SUB_INTL: ConcentrationSubrequirement = {
// 	subreq_name: "INTERNATIONAL RELATIONS",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const SUB_US: ConcentrationSubrequirement = {
// 	subreq_name: "AMERICAN GOVERNMENT",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const SUB_PHIL: ConcentrationSubrequirement = {
// 	subreq_name: "POLITICAL PHILOSOPHY",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const SUB_COMP: ConcentrationSubrequirement = {
// 	subreq_name: "COMPARATIVE POLITICS",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SUB: ConcentrationRequirement = {
// 	req_name: "SUBFIELDS",
// 	req_desc: "",
// 	courses_required_count: 4,
// 	courses_satisfied_count: 0,
// 	subreqs_required_count: 2,
// 	subreqs_satisfied_count: 0,
// 	subreqs_list: [SUB_INTL, SUB_US, SUB_PHIL, SUB_COMP]
// }

// // SEMINAR

// const SEM_ANY: ConcentrationSubrequirement = {
// 	subreq_name: "YEAR ANY",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const SEM_SEN: ConcentrationSubrequirement = {
// 	subreq_name: "YEAR SENIOR",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SEMINAR: ConcentrationRequirement = {
// 	req_name: "SEMINAR",
// 	req_desc: "Seminar courses taught by PLSC faculty satisfy.",
// 	courses_required_count: 2,
// 	courses_satisfied_count: 0,
// 	checkbox: true,
// 	subreqs_list: [SEM_ANY, SEM_SEN]
// }

// // SEN STANDARD

// const SEN_STAN_ONE: ConcentrationSubrequirement = {
// 	subreq_name: "ONE TERM",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const SEN_STAN_TWO: ConcentrationSubrequirement = {
// 	subreq_name: "TWO TERM",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SEN_STAN: ConcentrationRequirement = {
// 	req_name: "SENIOR",
// 	req_desc: "",
// 	courses_required_count: -1,
// 	courses_satisfied_count: 0,
// 	subreqs_required_count: 1,
// 	subreqs_satisfied_count: 0,
// 	subreqs_list: [SEN_STAN_ONE, SEN_STAN_TWO]
// }

// // SEN INTENSIVE

// const SEN_INTE_REQ: ConcentrationSubrequirement = {
// 	subreq_name: "TWO TERM",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [PLSC_490, PLSC_493],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SEN_INTE: ConcentrationRequirement = {
// 	req_name: "SENIOR",
// 	req_desc: "",
// 	courses_required_count: 2,
// 	courses_satisfied_count: 0,
// 	subreqs_list: [SEN_INTE_REQ]
// }

// // EXPORT

// export const CONC_PLSC_BA_STAN: DegreeConcentration = {
// 	user_status: 0,
// 	conc_name: "STANDARD",
// 	conc_desc: "",
// 	conc_reqs: [PLSC_INTRO, PLSC_CORE_STAN, PLSC_SUB, PLSC_SEMINAR, PLSC_SEN_STAN]
// }

// export const CONC_PLSC_BA_INTE: DegreeConcentration = {
// 	user_status: 0,
// 	conc_name: "INTENSIVE",
// 	conc_desc: "",
// 	conc_reqs: [PLSC_INTRO, PLSC_CORE_INTE, PLSC_SUB, PLSC_SEMINAR, PLSC_SEN_INTE]
// }
