
// import { DegreeConfiguration, DegreeRequirement, DegreeSubrequirement } from "@/types/type-program";

// // INTRO

// const PLSC_INTRO_TWO: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "INTRO COURSES",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: [],
// }

// const PLSC_INTRO: DegreeRequirement = {
// 	req_type_id: 1,
// 	req_name: "INTRO",
// 	req_desc: "",

// 	courses_required_count: 3,
// 	courses_satisfied_count: 1,

// 	subreqs_list: [PLSC_INTRO_TWO]
// }

// // CORE

// const PLSC_CORE_LECTURES: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "CORE LECTURES",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: [],
// }

// const PLSC_CORE_METHODS: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "METHODS AND FORMAL THEORY",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: [],
// }

// const PLSC_CORE: DegreeRequirement = {
// 	req_type_id: 1,
// 	req_name: "CORE",
// 	req_desc: "",

// 	courses_required_count: 3,
// 	courses_satisfied_count: 0,

// 	subreqs_list: [PLSC_CORE_LECTURES, PLSC_CORE_METHODS]
// }

// // ELECTIVE

// const PLSC_SUB_INTL: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "INTERNATIONAL RELATIONS",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SUB_US: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "AMERICAN GOVERNMENT",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SUB_PHIL: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "POLITICAL PHILOSOPHY",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SUB_COMP: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "COMPARATIVE POLITICS",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SUBFIELDS: DegreeRequirement = {
// 	req_type_id: 1,
// 	req_name: "SUBFIELDS",
// 	req_desc: "",

// 	courses_required_count: 4,
// 	courses_satisfied_count: 0,

// 	subreqs_required_count: 2,
// 	subreqs_satisfied_count: 0,

// 	subreqs_list: [PLSC_SUB_INTL, PLSC_SUB_US, PLSC_SUB_PHIL, PLSC_SUB_COMP]
// }

// // SEMINAR

// const PLSC_SEM_ANY: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "YEAR ANY",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SEM_SEN: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "YEAR SENIOR",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SEMINAR: DegreeRequirement = {
// 	req_type_id: 1,
// 	req_name: "SEMINAR",
// 	req_desc: "Seminar courses taught by PLSC faculty satisfy.",

// 	courses_required_count: 2,
// 	courses_satisfied_count: 0,

// 	checkbox: true,
// 	subreqs_list: [PLSC_SEM_ANY, PLSC_SEM_SEN]
// }

// // SENIOR

// const PLSC_SEN_ONE: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "ONE TERM",
// 	subreq_desc: "",
// 	courses_required: 1,
// 	courses_options: [null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SEN_TWO: DegreeSubrequirement = {
// 	subreq_type_id: 1,
// 	subreq_name: "TWO TERM",
// 	subreq_desc: "",
// 	courses_required: 2,
// 	courses_options: [null, null],
// 	courses_elective_range: null,
// 	courses_any_bool: false,
// 	student_courses_satisfying: []
// }

// const PLSC_SENIOR: DegreeRequirement = {
// 	req_type_id: 1,
// 	req_name: "SENIOR",
// 	req_desc: "",

// 	courses_required_count: 0,
// 	courses_satisfied_count: 0,

// 	subreqs_required_count: 1,
// 	subreqs_satisfied_count: 0,

// 	subreqs_list: [PLSC_SEN_ONE, PLSC_SEN_TWO]
// }

// // FINAL

// export const PLSC_CONFIG: DegreeConfiguration = {
// 	reqs_list: [PLSC_INTRO, PLSC_CORE, PLSC_SUBFIELDS, PLSC_SEMINAR, PLSC_SENIOR]
// }
