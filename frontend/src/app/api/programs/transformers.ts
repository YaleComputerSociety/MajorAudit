// transformers.ts
import { Option, Subrequirement, Requirement, Concentration, Degree, Program, ProgramDict } from "@/types/type-program";
import { Course } from "@/types/type-user";

// Define interfaces matching Prisma schema
interface CourseData {
  id: string;
  title: string;
  description?: string | null;
  requirements?: string | null;
  professors: string[];
  distributions: string[];
  flags: string[];
  credits: number;
  term: string;
  is_colsem?: boolean | null;
  is_fysem?: boolean | null;
  is_sysem?: boolean | null;
  codes: string[];
  seasons: string[];
}

interface OptionData {
  id: number;
  option_course_id?: string | null;
  elective_range?: string | null;
  is_any_okay?: boolean | null;
  flags?: string | null;
  course?: CourseData | null;
}

interface SubrequirementData {
  id: number;
  name?: string | null;
  description?: string | null;
  courses_required_count?: number | null;
  subrequirement_options: {
    id: number;
    option_index?: number | null;
    note?: string | null;
    option?: OptionData | null;
  }[];
}

interface RequirementData {
  id: number;
  name: string;
  description?: string | null;
  courses_required_count?: number | null;
  subreqs_required_count?: number | null;
  checkbox?: boolean | null;
  note?: string | null;
  requirement_subrequirements: {
    id: number;
    subrequirement_index?: number | null;
    description?: string | null;
    subrequirement: SubrequirementData;
  }[];
}

interface ConcentrationData {
  id: number;
  name?: string | null;
  description?: string | null;
  note?: string | null;
  concentration_requirements: {
    id: number;
    requirement_index: number;
    requirement: RequirementData;
  }[];
}

interface DegreeData {
  id: number;
  type: string;
  note?: string | null;
  concentrations: ConcentrationData[];
}

interface ProgramData {
  id: number;
  name: string;
  abbreviation: string;
  student_count?: number | null;
  website_link?: string | null;
  catalog_link?: string | null;
  degrees: DegreeData[];
}

export function transformCourse(courseData: CourseData | null | undefined): Course | null {
  if (!courseData) return null;
  
  return {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description || "",
    requirements: courseData.requirements || "",
    professors: courseData.professors || [],
    distributions: courseData.distributions || [],
    flags: courseData.flags || [],
    credits: courseData.credits,
    term: courseData.term,
    is_colsem: courseData.is_colsem || false,
    is_fysem: courseData.is_fysem || false,
    is_sysem: courseData.is_sysem || false,
    codes: courseData.codes || [],
    seasons: courseData.seasons || []
  };
}

export function transformOption(optionData: { option?: OptionData | null; option_index?: number | null; note?: string | null }): Option {
  const option = optionData.option;
  
  return {
    option: option?.course ? transformCourse(option.course) : null,
    satisfier: null, // This is for student data
    elective_range: option?.elective_range || undefined,
    flags: option?.flags ? option.flags.split(',').filter(Boolean) : undefined,
    is_any_okay: option?.is_any_okay || false,
    // note: optionData.note
  };
}

export function transformSubrequirement(subrequirementData: SubrequirementData, index: number): Subrequirement {
  // Sort options by option_index if available
  const sortedOptions = [...subrequirementData.subrequirement_options]
    .sort((a, b) => (a.option_index || 0) - (b.option_index || 0));
  
  return {
    name: subrequirementData.name || "",
    description: subrequirementData.description || "",
    courses_required_count: subrequirementData.courses_required_count || 0,
    options: sortedOptions.map(transformOption),
    index: index
  };
}

export function transformRequirement(requirementData: RequirementData, index: number): Requirement {
  // Get subrequirements with their indices
  const subrequirements = requirementData.requirement_subrequirements.map(
    (rs) => ({
      data: rs.subrequirement,
      index: rs.subrequirement_index || 0,
      description: rs.description
    })
  );
  
  // Sort by index if available
  subrequirements.sort((a, b) => a.index - b.index);
  
  return {
    name: requirementData.name,
    description: requirementData.description || "",
    courses_required_count: requirementData.courses_required_count || 0,
    subreqs_required_count: requirementData.subreqs_required_count || 0,
    checkbox: requirementData.checkbox || false,
    // note: requirementData.note,
    subrequirements: subrequirements.map(
      (item, i) => transformSubrequirement(item.data, item.index || i)
    ),
    index: index
  };
}

export function transformConcentration(concentrationData: ConcentrationData): Concentration {
  // Get requirements with their indices
  const requirements = concentrationData.concentration_requirements.map(
    (cr) => ({
      data: cr.requirement,
      index: cr.requirement_index
    })
  );
  
  // Sort by index if available
  requirements.sort((a, b) => a.index - b.index);
  
  return {
    name: concentrationData.name || "",
    description: concentrationData.description || "",
    // note: concentrationData.note,
    requirements: requirements.map(
      (item, i) => transformRequirement(item.data, item.index || i)
    )
  };
}

export function transformDegree(degreeData: DegreeData): Degree {
  return {
    type: degreeData.type,
    // note: degreeData.note,
    concentrations: degreeData.concentrations.map(transformConcentration)
  };
}

export function transformProgram(programData: ProgramData): Program {
  return {
    name: programData.name,
    abbreviation: programData.abbreviation,
    student_count: programData.student_count || 0,
    website_link: programData.website_link || "",
    catolog_link: programData.catalog_link || "", 
    degrees: programData.degrees.map(transformDegree)
  };
}

export function createProgramDict(programs: Program[]): ProgramDict {
  const programDict: ProgramDict = {};
  programs.forEach(program => {
    programDict[program.abbreviation] = program;
  });
  return programDict;
}