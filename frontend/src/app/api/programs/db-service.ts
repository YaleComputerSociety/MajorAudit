
// programs/optimized-service.ts
import supabase from '@/database/client';
import { Tables } from '@/types/supabase';
import { Program, Degree, Concentration, Requirement, Subrequirement, Option } from '@/types/type-program';
import { Course } from '@/types/type-user';
import { safeArray, safeBoolean, safeNumber, safeString } from '@/types/db-helpers';

// Type for map keys
type EntityId = number | string;

/**
 * Fetches and transforms program hierarchy directly to frontend types
 */
export async function fetchProgramsDirectToFrontend(): Promise<Program[]> {
  try {
    // 1. Fetch programs (base level)
    const { data: programsData, error: programsError } = await supabase
      .from('programs')
      .select('*');
    
    if (programsError || !programsData) {
      console.error('Error fetching programs:', programsError);
      return [];
    }

    // 2. Fetch all degrees
    const { data: degreesData, error: degreesError } = await supabase
      .from('degrees')
      .select('*');
    
    if (degreesError || !degreesData) {
      console.error('Error fetching degrees:', degreesError);
      return transformProgramsWithoutRelations(programsData);
    }

    // 3. Fetch all concentrations
    const { data: concentrationsData, error: concentrationsError } = await supabase
      .from('concentrations')
      .select('*');
    
    if (concentrationsError || !concentrationsData) {
      console.error('Error fetching concentrations:', concentrationsError);
      return transformProgramsWithDegrees(programsData, degreesData);
    }

    // 4. Fetch all concentration requirements
    const { data: concReqsData, error: concReqsError } = await supabase
      .from('concentration_requirements')
      .select('*');
    
    if (concReqsError || !concReqsData) {
      console.error('Error fetching concentration requirements:', concReqsError);
      return transformProgramsWithConcentrations(programsData, degreesData, concentrationsData);
    }

    // 5. Fetch all requirements
    const requirementIds = [...new Set(concReqsData.map(cr => cr.requirement_id))];
    const { data: requirementsData, error: requirementsError } = await supabase
      .from('requirements')
      .select('*')
      .in('id', requirementIds);
    
    if (requirementsError || !requirementsData) {
      console.error('Error fetching requirements:', requirementsError);
      return transformProgramsWithConcentrations(programsData, degreesData, concentrationsData);
    }

    // 6. Fetch requirement subrequirements
    const { data: reqSubreqsData, error: reqSubreqsError } = await supabase
      .from('requirement_subrequirements')
      .select('*')
      .in('requirement_id', requirementIds);
    
    if (reqSubreqsError || !reqSubreqsData) {
      console.error('Error fetching requirement subrequirements:', reqSubreqsError);
      return transformProgramsWithRequirements(
        programsData, degreesData, concentrationsData, concReqsData, requirementsData
      );
    }

    // 7. Fetch subrequirements
    const subrequirementIds = [...new Set(reqSubreqsData.map(rs => rs.subrequirement_id))];
    const { data: subrequirementsData, error: subrequirementsError } = await supabase
      .from('subrequirements')
      .select('*')
      .in('id', subrequirementIds);
    
    if (subrequirementsError || !subrequirementsData) {
      console.error('Error fetching subrequirements:', subrequirementsError);
      return transformProgramsWithRequirements(
        programsData, degreesData, concentrationsData, concReqsData, requirementsData
      );
    }

    // 8. Fetch subrequirement options
    const { data: subreqOptionsData, error: subreqOptionsError } = await supabase
      .from('subrequirement_options')
      .select('*')
      .in('subrequirement_id', subrequirementIds);
    
    if (subreqOptionsError || !subreqOptionsData) {
      console.error('Error fetching subrequirement options:', subreqOptionsError);
      return transformProgramsWithSubrequirements(
        programsData, degreesData, concentrationsData, concReqsData, 
        requirementsData, reqSubreqsData, subrequirementsData
      );
    }

    // 9. Fetch options
    const optionIds = [...new Set(subreqOptionsData.map(so => so.option_id))];
    const { data: optionsData, error: optionsError } = await supabase
      .from('options')
      .select('*')
      .in('id', optionIds);
    
    if (optionsError || !optionsData) {
      console.error('Error fetching options:', optionsError);
      return transformProgramsWithSubrequirements(
        programsData, degreesData, concentrationsData, concReqsData, 
        requirementsData, reqSubreqsData, subrequirementsData
      );
    }

    // 10. Fetch courses
    const courseIds = optionsData
      .map(o => o.option_course_id)
      .filter((id): id is string => id !== null && id !== undefined);
    
    let coursesData: Tables<"courses">[] = [];
    if (courseIds.length > 0) {
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds);
      
      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
      } else if (courses) {
        coursesData = courses;
      }
    }

    // Transform directly to frontend types using maps
    return transformProgramsToFrontend(
      programsData, 
      degreesData, 
      concentrationsData, 
      concReqsData,
      requirementsData, 
      reqSubreqsData, 
      subrequirementsData, 
      subreqOptionsData, 
      optionsData, 
      coursesData
    );
  } catch (error) {
    console.error('Error fetching program hierarchy:', error);
    return [];
  }
}

/**
 * Transform to frontend types using maps for efficient lookups
 */
function transformProgramsToFrontend(
  programsData: Tables<"programs">[],
  degreesData: Tables<"degrees">[],
  concentrationsData: Tables<"concentrations">[],
  concReqsData: Tables<"concentration_requirements">[],
  requirementsData: Tables<"requirements">[],
  reqSubreqsData: Tables<"requirement_subrequirements">[],
  subrequirementsData: Tables<"subrequirements">[],
  subreqOptionsData: Tables<"subrequirement_options">[],
  optionsData: Tables<"options">[],
  coursesData: Tables<"courses">[]
): Program[] {
  // Create lookup maps for O(1) access instead of filtering
  const courseMap = new Map<string, Course>();
  coursesData.forEach(course => {
    courseMap.set(course.id, {
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
      is_sysem: safeBoolean(course.is_sysem),
      codes: safeArray(course.codes),
      seasons: safeArray(course.seasons)
    });
  });

  const optionMap = new Map<EntityId, Option>();
  optionsData.forEach(option => {
    const course = option.option_course_id ? courseMap.get(option.option_course_id) || null : null;
    optionMap.set(option.id, {
      option: course,
      satisfier: null,
      elective_range: option.elective_range || undefined,
      flags: option.flags || undefined,
      is_any_okay: safeBoolean(option.is_any_okay)
    });
  });

  // Group subrequirement options by subrequirement_id
  const subreqOptionsMap = new Map<EntityId, Map<number, Option>>();
  subreqOptionsData.forEach(subreqOption => {
    if (!subreqOptionsMap.has(subreqOption.subrequirement_id)) {
      subreqOptionsMap.set(subreqOption.subrequirement_id, new Map<number, Option>());
    }
    const option = optionMap.get(subreqOption.option_id);
    if (option) {
      subreqOptionsMap.get(subreqOption.subrequirement_id)!.set(
        subreqOption.option_index || 0, 
        option
      );
    }
  });

  const subrequirementMap = new Map<EntityId, Subrequirement>();
  subrequirementsData.forEach(subreq => {
    const optionsMap = subreqOptionsMap.get(subreq.id) || new Map<number, Option>();
    // Sort options by index
    const options = Array.from(optionsMap.entries())
      .sort(([indexA], [indexB]) => indexA - indexB)
      .map(([_, option]) => option);

    subrequirementMap.set(subreq.id, {
      name: safeString(subreq.name),
      description: safeString(subreq.description),
      courses_required_count: safeNumber(subreq.courses_required_count),
      options,
      index: 0 // Will be overridden later
    });
  });

  // Group requirement subrequirements by requirement_id
  const reqSubreqsMap = new Map<EntityId, Map<number, Subrequirement>>();
  reqSubreqsData.forEach(reqSubreq => {
    if (!reqSubreqsMap.has(reqSubreq.requirement_id)) {
      reqSubreqsMap.set(reqSubreq.requirement_id, new Map<number, Subrequirement>());
    }
    
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

  const requirementMap = new Map<EntityId, Requirement>();
  requirementsData.forEach(req => {
    const subreqsMap = reqSubreqsMap.get(req.id) || new Map<number, Subrequirement>();
    // Sort subrequirements by index
    const subrequirements = Array.from(subreqsMap.entries())
      .sort(([indexA], [indexB]) => indexA - indexB)
      .map(([_, subreq]) => subreq);

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

  // Group concentration requirements by concentration_id
  const concReqsMap = new Map<EntityId, Map<number, Requirement>>();
  concReqsData.forEach(concReq => {
    if (!concReqsMap.has(concReq.concentration_id)) {
      concReqsMap.set(concReq.concentration_id, new Map<number, Requirement>());
    }
    
    const req = requirementMap.get(concReq.requirement_id);
    if (req) {
      // Copy requirement and update index
      const indexedReq: Requirement = {
        ...req,
        index: concReq.requirement_index
      };
      
      concReqsMap.get(concReq.concentration_id)!.set(
        indexedReq.index,
        indexedReq
      );
    }
  });

  const concentrationMap = new Map<EntityId, Concentration>();
  concentrationsData.forEach(conc => {
    const reqsMap = concReqsMap.get(conc.id) || new Map<number, Requirement>();
    // Sort requirements by index
    const requirements = Array.from(reqsMap.entries())
      .sort(([indexA], [indexB]) => indexA - indexB)
      .map(([_, req]) => req);

    concentrationMap.set(conc.id, {
      name: safeString(conc.name),
      description: safeString(conc.description),
      requirements
    });
  });

  // Group concentrations by degree_id
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

  const degreeMap = new Map<EntityId, Degree>();
  degreesData.forEach(deg => {
    const concentrations = degreeConcsMap.get(deg.id) || [];

    degreeMap.set(deg.id, {
      type: deg.type,
      concentrations
    });
  });

  // Group degrees by program_id
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

  // Build final programs
  return programsData.map(prog => {
    const degrees = programDegreesMap.get(prog.id) || [];

    return {
      name: prog.name,
      abbreviation: prog.abbreviation,
      student_count: safeNumber(prog.student_count),
      website_link: safeString(prog.website_link),
      catolog_link: safeString(prog.catalog_link),
      degrees
    };
  });
}

/**
 * Transform programs with partial data (degrees only)
 */
function transformProgramsWithoutRelations(
  programsData: Tables<"programs">[]
): Program[] {
  return programsData.map(prog => ({
    name: prog.name,
    abbreviation: prog.abbreviation,
    student_count: safeNumber(prog.student_count),
    website_link: safeString(prog.website_link),
    catolog_link: safeString(prog.catalog_link),
    degrees: []
  }));
}

/**
 * Transform programs with degrees
 */
function transformProgramsWithDegrees(
  programsData: Tables<"programs">[],
  degreesData: Tables<"degrees">[]
): Program[] {
  // Create degree map grouped by program_id
  const programDegreesMap = new Map<EntityId, Tables<"degrees">[]>();
  degreesData.forEach(deg => {
    if (!programDegreesMap.has(deg.program_id)) {
      programDegreesMap.set(deg.program_id, []);
    }
    programDegreesMap.get(deg.program_id)!.push(deg);
  });

  return programsData.map(prog => ({
    name: prog.name,
    abbreviation: prog.abbreviation,
    student_count: safeNumber(prog.student_count),
    website_link: safeString(prog.website_link),
    catolog_link: safeString(prog.catalog_link),
    degrees: (programDegreesMap.get(prog.id) || []).map(deg => ({
      type: deg.type,
      concentrations: []
    }))
  }));
}

/**
 * Add similar functions for the other partial transformation cases
 * These follow the same pattern as above but include more data
 */
function transformProgramsWithConcentrations(
  programsData: Tables<"programs">[],
  degreesData: Tables<"degrees">[],
  concentrationsData: Tables<"concentrations">[]
): Program[] {
  // Implementation similar to transformProgramsWithDegrees but including concentrations
  // ...
  return [] as Program[]; // Placeholder
}

function transformProgramsWithRequirements(
  programsData: Tables<"programs">[],
  degreesData: Tables<"degrees">[],
  concentrationsData: Tables<"concentrations">[],
  concReqsData: Tables<"concentration_requirements">[],
  requirementsData: Tables<"requirements">[]
): Program[] {
  // Implementation including requirements
  // ...
  return [] as Program[]; // Placeholder
}

function transformProgramsWithSubrequirements(
  programsData: Tables<"programs">[],
  degreesData: Tables<"degrees">[],
  concentrationsData: Tables<"concentrations">[],
  concReqsData: Tables<"concentration_requirements">[],
  requirementsData: Tables<"requirements">[],
  reqSubreqsData: Tables<"requirement_subrequirements">[],
  subrequirementsData: Tables<"subrequirements">[],
  subreqOptionsData?: Tables<"subrequirement_options">[]
): Program[] {
  // Implementation including subrequirements
  // ...
  return [] as Program[]; // Placeholder
}
