
// transforms/program-transformer.ts

import { Tables } from '@/types/supabase_new';
import { Program, Degree, Concentration, Requirement, Subrequirement, Option } from '@/types/type-program';
import { Course } from '@/types/type-user';
import { safeArray, safeBoolean, safeNumber, safeString } from '@/types/db-helpers';

// Type for map keys
type EntityId = number | string;

/**
 * Transforms DB course data to frontend Course type
 */
export function transformCourse(course: Tables<"courses">): Course {
  return {
    id: course.id,
    title: course.title,
    description: safeString(course.description),
    requirements: safeString(course.requirements),
    professors: safeArray(course.professors),
    distributions: safeArray(course.distributions),
    flags: safeArray(course.flags),
    credits: course.credits,
    term: course.term,
    is_colsem: safeBoolean(course.is_colsem),
    is_fysem: safeBoolean(course.is_fysem),
    codes: safeArray(course.codes),
    seasons: safeArray(course.seasons)
  };
}

/**
 * Create course map for efficient lookups
 */
export function createCourseMap(coursesData: Tables<"courses">[]): Map<string, Course> {
  const courseMap = new Map<string, Course>();
  coursesData.forEach(course => {
    courseMap.set(course.id, transformCourse(course));
  });
  return courseMap;
}

/**
 * Create option map for efficient lookups
 */
export function createOptionMap(
  optionsData: Tables<"options">[], 
  courseMap: Map<string, Course>
): Map<EntityId, Option> {
  const optionMap = new Map<EntityId, Option>();
  optionsData.forEach(option => {
    const course = option.option_course_id ? courseMap.get(option.option_course_id) || null : null;
    optionMap.set(option.id, {
      option: course,
      satisfier: null,
      elective_range: option.elective_range || undefined,
      flags: option.flags || undefined,
      is_any_okay: safeBoolean(option.is_any_okay),
			is_CR_okay: safeBoolean(option.is_CR_okay),
			is_colsem_okay: safeBoolean(option.is_colsem_okay),
			is_fysem_okay: safeBoolean(option.is_fysem_okay)
    });
  });
  return optionMap;
}

/**
 * Group subrequirement options by subrequirement_id
 */
export function createSubreqOptionsMap(
  subreqOptionsData: Tables<"subrequirement_options">[], 
  optionMap: Map<EntityId, Option>
): Map<EntityId, Map<number, Option>> {
  const subreqOptionsMap = new Map<EntityId, Map<number, Option>>();
  subreqOptionsData.forEach(subreqOption => {
    if (!subreqOption.subrequirement_id) return; // Skip if subrequirement_id is null
    
    if (!subreqOptionsMap.has(subreqOption.subrequirement_id)) {
      subreqOptionsMap.set(subreqOption.subrequirement_id, new Map<number, Option>());
    }
    
    if (!subreqOption.option_id) return; // Skip if option_id is null
    
    const option = optionMap.get(subreqOption.option_id);
    if (option) {
      subreqOptionsMap.get(subreqOption.subrequirement_id)!.set(
        subreqOption.option_index || 0, 
        option
      );
    }
  });
  return subreqOptionsMap;
}

/**
 * Create subrequirement map for efficient lookups
 */
export function createSubrequirementMap(
  subrequirementsData: Tables<"subrequirements">[], 
  subreqOptionsMap: Map<EntityId, Map<number, Option>>
): Map<EntityId, Subrequirement> {
  const subrequirementMap = new Map<EntityId, Subrequirement>();
  subrequirementsData.forEach(subreq => {
    const optionsMap = subreqOptionsMap.get(subreq.id) || new Map<number, Option>();
    // Sort options by index
    const options = Array.from(optionsMap.entries())
      .sort(([indexA], [indexB]) => indexA - indexB)
      .map(([, option]) => option);
      
    // Handle case where there's only 1 option but courses_required_count > 1
    const coursesRequired = safeNumber(subreq.courses_required_count);
    if (options.length === 1 && coursesRequired > 1) {
      // Duplicate the single option to match courses_required_count
      const singleOption = options[0];
      const duplicatedOptions = Array(coursesRequired).fill(0).map(() => {
        // Create a deep copy of the option to ensure independent state
        return {
          ...singleOption,
          option: singleOption.option ? { ...singleOption.option } : null,
          satisfier: singleOption.satisfier ? { ...singleOption.satisfier } : null,
          elective_range: singleOption.elective_range,
          flags: singleOption.flags ? [...singleOption.flags] : undefined,
          is_any_okay: singleOption.is_any_okay
        };
      });
      
      subrequirementMap.set(subreq.id, {
        name: safeString(subreq.name),
        description: safeString(subreq.description),
        courses_required_count: coursesRequired,
        options: duplicatedOptions,
        index: 0 // Will be overridden later
      });
    } else {
      subrequirementMap.set(subreq.id, {
        name: safeString(subreq.name),
        description: safeString(subreq.description),
        courses_required_count: coursesRequired,
        options,
        index: 0 // Will be overridden later
      });
    }
  });
  return subrequirementMap;
}

/**
 * Group requirement subrequirements by requirement_id
 */
export function createReqSubreqsMap(
  reqSubreqsData: Tables<"requirement_subrequirements">[], 
  subrequirementMap: Map<EntityId, Subrequirement>
): Map<EntityId, Map<number, Subrequirement>> {
  const reqSubreqsMap = new Map<EntityId, Map<number, Subrequirement>>();
  reqSubreqsData.forEach(reqSubreq => {
    if (!reqSubreq.requirement_id) return; // Skip if requirement_id is null
    
    if (!reqSubreqsMap.has(reqSubreq.requirement_id)) {
      reqSubreqsMap.set(reqSubreq.requirement_id, new Map<number, Subrequirement>());
    }
    
    if (!reqSubreq.subrequirement_id) return; // Skip if subrequirement_id is null
    
    const subreq = subrequirementMap.get(reqSubreq.subrequirement_id);
    if (subreq) {
      // Copy subrequirement and update index
      const indexedSubreq: Subrequirement = {
        ...subreq,
        index: reqSubreq.subrequirement_index || 0
      };
      
      reqSubreqsMap.get(reqSubreq.requirement_id)!.set(
        indexedSubreq.index,
        indexedSubreq
      );
    }
  });
  return reqSubreqsMap;
}

/**
 * Create requirement map for efficient lookups
 */
export function createRequirementMap(
  requirementsData: Tables<"requirements">[], 
  reqSubreqsMap: Map<EntityId, Map<number, Subrequirement>>
): Map<EntityId, Requirement> {
  const requirementMap = new Map<EntityId, Requirement>();
  requirementsData.forEach(req => {
    const subreqsMap = reqSubreqsMap.get(req.id) || new Map<number, Subrequirement>();
    // Sort subrequirements by index
    const subrequirements = Array.from(subreqsMap.entries())
      .sort(([indexA], [indexB]) => indexA - indexB)
      .map(([, subreq]) => subreq);

    requirementMap.set(req.id, {
      name: req.name,
      description: safeString(req.description),
      courses_required_count: safeNumber(req.courses_required_count),
      subreqs_required_count: safeNumber(req.subreqs_required_count),
      checkbox: safeBoolean(req.checkbox),
      subrequirements,
      index: 0 // Will be overridden later
    });
  });
  return requirementMap;
}

/**
 * Group concentration requirements by concentration_id
 */
export function createConcReqsMap(
  concReqsData: Tables<"concentration_requirements">[], 
  requirementMap: Map<EntityId, Requirement>
): Map<EntityId, Map<number, Requirement>> {
  const concReqsMap = new Map<EntityId, Map<number, Requirement>>();
  concReqsData.forEach(concReq => {
    if (!concReq.concentration_id) return; // Skip if concentration_id is null
    
    if (!concReqsMap.has(concReq.concentration_id)) {
      concReqsMap.set(concReq.concentration_id, new Map<number, Requirement>());
    }
    
    if (!concReq.requirement_id) return; // Skip if requirement_id is null
    
    const req = requirementMap.get(concReq.requirement_id);
    if (req) {
      // Copy requirement and update index
      const indexedReq: Requirement = {
        ...req,
        index: concReq.requirement_index || 0 // Add null check for requirement_index
      };
      
      concReqsMap.get(concReq.concentration_id)!.set(
        indexedReq.index,
        indexedReq
      );
    }
  });
  return concReqsMap;
}

/**
 * Create concentration map for efficient lookups
 */
export function createConcentrationMap(
  concentrationsData: Tables<"concentrations">[], 
  concReqsMap: Map<EntityId, Map<number, Requirement>>
): Map<EntityId, Concentration> {
  const concentrationMap = new Map<EntityId, Concentration>();
  concentrationsData.forEach(conc => {
    const reqsMap = concReqsMap.get(conc.id) || new Map<number, Requirement>();
    // Sort requirements by index
    const requirements = Array.from(reqsMap.entries())
      .sort(([indexA], [indexB]) => indexA - indexB)
      .map(([, req]) => req);

    concentrationMap.set(conc.id, {
      name: safeString(conc.name),
      description: safeString(conc.description),
      requirements
    });
  });
  return concentrationMap;
}

/**
 * Group concentrations by degree_id
 */
export function createDegreeConcsMap(
  concentrationsData: Tables<"concentrations">[], 
  concentrationMap: Map<EntityId, Concentration>
): Map<EntityId, Concentration[]> {
  const degreeConcsMap = new Map<EntityId, Concentration[]>();
  concentrationsData.forEach(conc => {
    if (!degreeConcsMap.has(conc.degree_id)) {
      degreeConcsMap.set(conc.degree_id, []);
    }
    
    const concentration = concentrationMap.get(conc.id);
    if (concentration) {
      degreeConcsMap.get(conc.degree_id)!.push(concentration);
    }
  });
  return degreeConcsMap;
}

/**
 * Create degree map for efficient lookups
 */
export function createDegreeMap(
  degreesData: Tables<"degrees">[], 
  degreeConcsMap: Map<EntityId, Concentration[]>
): Map<EntityId, Degree> {
  const degreeMap = new Map<EntityId, Degree>();
  degreesData.forEach(deg => {
    const concentrations = degreeConcsMap.get(deg.id) || [];

    degreeMap.set(deg.id, {
      type: deg.type,
      concentrations
    });
  });
  return degreeMap;
}

/**
 * Group degrees by program_id
 */
export function createProgramDegreesMap(
  degreesData: Tables<"degrees">[], 
  degreeMap: Map<EntityId, Degree>
): Map<EntityId, Degree[]> {
  const programDegreesMap = new Map<EntityId, Degree[]>();
  degreesData.forEach(deg => {
    if (!programDegreesMap.has(deg.program_id)) {
      programDegreesMap.set(deg.program_id, []);
    }
    
    const degree = degreeMap.get(deg.id);
    if (degree) {
      programDegreesMap.get(deg.program_id)!.push(degree);
    }
  });
  return programDegreesMap;
}

/**
 * Transform programs to frontend type
 */
export function transformPrograms(
  programsData: Tables<"programs">[], 
  programDegreesMap: Map<EntityId, Degree[]>
): Program[] {
  return programsData.map(prog => {
    const degrees = programDegreesMap.get(prog.id) || [];

    return {
      name: prog.name,
      abbreviation: prog.abbreviation,
      student_count: safeNumber(prog.student_count),
			dus: safeString(prog.dus),
      website_link: safeString(prog.website_link),
      catolog_link: safeString(prog.catalog_link),
      degrees
    };
  });
}
