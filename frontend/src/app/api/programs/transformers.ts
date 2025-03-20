
// transformers.ts
import { Option, Subrequirement, Requirement, Concentration, Degree, Program, ProgramDict } from "@/types/type-program";
import { Course } from "@/types/type-user";

export function transformCourse(courseData: any): Course | null {
  if (!courseData) return null;
  
  return {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description || "",
    requirements: courseData.requirements || "",
    professors: courseData.professors || "",
    distributions: courseData.distributions || "",
    flags: courseData.flags || "",
    credits: courseData.credits,
    term: courseData.term,
    is_colsem: courseData.is_colsem || false,
    is_fysem: courseData.is_fysem || false,
    is_sysem: courseData.is_sysem || false,
    codes: courseData.codes || []
  };
}

export function transformOption(optionData: any): Option {
  return {
    option: optionData.option?.course ? transformCourse(optionData.option.course) : null,
    satisfier: null, // This is for student data
    elective_range: optionData.option?.elective_range || undefined,
    flags: optionData.option?.flags ? optionData.option.flags.split(',').filter(Boolean) : undefined,
    is_any_okay: optionData.option?.is_any_okay
  };
}

export function transformSubrequirement(subrequirementData: any, index: number): Subrequirement {
  return {
    name: subrequirementData.name || "",
    description: subrequirementData.description || "",
    courses_required_count: subrequirementData.courses_required_count || 0,
    options: subrequirementData.subrequirement_options.map(transformOption),
    index: index
  };
}

export function transformRequirement(requirementData: any, index: number): Requirement {
  // Get subrequirements with their indices
  const subrequirements = requirementData.requirement_subrequirements.map(
    (rs: any) => ({
      data: rs.subrequirement,
      index: rs.subrequirement_index || 0
    })
  );
  
  // Sort by index if available
  subrequirements.sort((a: any, b: any) => a.index - b.index);
  
  return {
    name: requirementData.name || "",
    description: requirementData.description || "",
    courses_required_count: requirementData.courses_required_count || 0,
    subreqs_required_count: requirementData.subreqs_required_count || 0,
    checkbox: requirementData.checkbox || false,
    subrequirements: subrequirements.map(
      (item: any, i: number) => transformSubrequirement(item.data, item.index || i)
    ),
    index: index
  };
}

export function transformConcentration(concentrationData: any): Concentration {
  // Get requirements with their indices
  const requirements = concentrationData.concentration_requirements.map(
    (cr: any) => ({
      data: cr.requirement,
      index: cr.requirement_index || 0
    })
  );
  
  // Sort by index if available
  requirements.sort((a: any, b: any) => a.index - b.index);
  
  return {
    name: concentrationData.name || "",
    description: concentrationData.description || "",
    requirements: requirements.map(
      (item: any, i: number) => transformRequirement(item.data, item.index || i)
    )
  };
}

export function transformDegree(degreeData: any): Degree {
  return {
    type: degreeData.type || "",
    concentrations: degreeData.concentrations.map(transformConcentration)
  };
}

export function transformProgram(programData: any): Program {
  return {
    name: programData.name || "",
    abbreviation: programData.abbreviation || "",
    student_count: programData.student_count || 0,
    website_link: programData.website_link || "",
    catolog_link: programData.catalog_link || "", // Note: Fixed typo
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
