
import { DegreeConfiguration, DegreeRequirement, DegreeSubrequirement } from "@/types/type-program";

import { CPSC_201, CPSC_202, MATH_244, CPSC_223, CPSC_323, CPSC_365, CPSC_366, CPSC_490 } from "./data-courses";
import { SC_CPSC_201, SC_CPSC_202, SC_CPSC_223, SC_CPSC_323 } from "./data-studentcourses";

const CPSC_INTRO: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "INTRO",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_201],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [SC_CPSC_201],
}

const CPSC_MATH: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "DISCRETE MATH",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_202, MATH_244],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const CPSC_DATA: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "DATA STRUCTURES",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_223],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [SC_CPSC_223],
}

const CPSC_SYSTEMS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "SYSTEMS",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_323],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [SC_CPSC_323],
}

const CPSC_ALGOS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "ALGORITHMS",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_365, CPSC_366],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const CPSC_CORE: DegreeRequirement = {
	req_type_id: 1,
	req_name: "CORE",
	req_desc: "",

	courses_required_count: 5,
	courses_satisfied_count: 3,

	subreqs_list: [CPSC_INTRO, CPSC_MATH, CPSC_DATA, CPSC_SYSTEMS, CPSC_ALGOS]
}

const CPSC_RANGE_ELECS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "",
	subreq_desc: "Standard elective or DUS approved extra-department substitution.",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: { dept: "CPSC", min_code: 300, max_code: 999 },
	courses_any_bool: false,
	student_courses_satisfying: []
}

const CPSC_SUB_ELEC: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "",
	subreq_desc: "Intermediate or advanced CPSC courses, traditionally numbered 300+.",
	courses_required: 3,
	courses_options: [null, null, null],
	courses_elective_range: { dept: "CPSC", min_code: 300, max_code: 999 },
	courses_any_bool: true,
	student_courses_satisfying: []
}

const CPSC_ELECTIVES: DegreeRequirement = {
	req_type_id: 1,
	req_name: "ELECTIVE",
	req_desc: "",

	courses_required_count: 4,
	courses_satisfied_count: 0,

	subreqs_list: [CPSC_SUB_ELEC, CPSC_RANGE_ELECS]
}

const CPSC_SENPROJ: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "SENIOR PROJECT",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_490],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const CPSC_SENIOR: DegreeRequirement = {
	req_type_id: 1,
	req_name: "SENIOR",
	req_desc: "",

	courses_required_count: 1,
	courses_satisfied_count: 0,

	subreqs_list: [CPSC_SENPROJ]
}

export const CPSC_CONFIG: DegreeConfiguration = {
	reqs_list: [CPSC_CORE, CPSC_ELECTIVES, CPSC_SENIOR]
}