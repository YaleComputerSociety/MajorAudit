

import { DegreeConfiguration, DegreeRequirement, DegreeSubrequirement } from "@/types/type-program";
import { CPSC_201, CPSC_202, MATH_244, CPSC_223, CPSC_323, CPSC_365, CPSC_366, CPSC_490 } from "./data-catalog";

const CPSC_INTRO: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "INTRO",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_201],
	courses_elective_range: null,
	courses_any_bool: false,
	user_courses_satisfying: [CPSC_201],
}

const CPSC_MATH: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "DISCRETE MATH",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_202, MATH_244],
	courses_elective_range: null,
	courses_any_bool: false,
	user_courses_satisfying: [],
}

const CPSC_DATA: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "DATA STRUCTURES",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_223],
	courses_elective_range: null,
	courses_any_bool: false,
	user_courses_satisfying: [CPSC_223],
}

const CPSC_SYSTEMS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "SYSTEMS",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_323],
	courses_elective_range: null,
	courses_any_bool: false,
	user_courses_satisfying: [CPSC_323],
}

const CPSC_ALGOS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "ALGORITHMS",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_365, CPSC_366],
	courses_elective_range: null,
	courses_any_bool: false,
	user_courses_satisfying: [],
}

const CPSC_CORE: DegreeRequirement = {
	req_type_id: 1,
	req_name: "CORE",
	req_desc: "",
	subreqs_required: 5,
	subreqs_list: [CPSC_INTRO, CPSC_MATH, CPSC_DATA, CPSC_SYSTEMS, CPSC_ALGOS]
}

const CPSC_RANGE_ELECS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [],
	courses_elective_range: { dept: "CPSC", min_code: 300, max_code: 999 },
	courses_any_bool: false,
	user_courses_satisfying: []
}

const CPSC_SUB_ELEC: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "",
	subreq_desc: "",
	courses_required: 3,
	courses_options: [],
	courses_elective_range: { dept: "CPSC", min_code: 300, max_code: 999 },
	courses_any_bool: true,
	user_courses_satisfying: []
}

const CPSC_ELECTIVES: DegreeRequirement = {
	req_type_id: 1,
	req_name: "ELECTIVE",
	req_desc: "",
	subreqs_required: 4,
	subreqs_list: [CPSC_RANGE_ELECS, CPSC_SUB_ELEC]
}

const CPSC_SENPROJ: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "SENIOR PROJECT",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_490],
	courses_elective_range: null,
	courses_any_bool: false,
	user_courses_satisfying: []
}

const CPSC_SENIOR: DegreeRequirement = {
	req_type_id: 1,
	req_name: "SENIOR",
	req_desc: "",
	subreqs_required: 1,
	subreqs_list: [CPSC_SENPROJ]
}

export const CPSC_CONFIG: DegreeConfiguration = {
	reqs_list: [CPSC_CORE, CPSC_ELECTIVES, CPSC_SENIOR]
}