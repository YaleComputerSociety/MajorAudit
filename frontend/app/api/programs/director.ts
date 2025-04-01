
import { ProgramRepository } from './program-repository';
import {
  createCourseMap,
  createOptionMap,
  createSubreqOptionsMap,
  createSubrequirementMap,
  createReqSubreqsMap,
  createRequirementMap,
  createConcReqsMap,
  createConcentrationMap,
  createDegreeConcsMap,
  createDegreeMap,
  createProgramDegreesMap,
  transformPrograms
} from './program-transformer';

/**
 * Fetches and transforms program data for frontend use
 */
export async function fetchProgramsDirectToFrontend() {
  // Step 1: Fetch raw program data
  const programData = await ProgramRepository.fetchProgramHierarchy();
  if (!programData) return null;
  
  // Extract nested data
  const programs = programData;
  const degrees = programs.flatMap(p => p.degrees || []);
  const concentrations = degrees.flatMap(d => d.concentrations || []);
  const concentrationRequirements = concentrations.flatMap(c => c.concentration_requirements || []);
  const requirements = concentrationRequirements.flatMap(cr => cr.requirements ? [cr.requirements] : []);
  const requirementSubrequirements = requirements.flatMap(r => r.requirement_subrequirements || []);
  const subrequirements = requirementSubrequirements.flatMap(rs => rs.subrequirements ? [rs.subrequirements] : []);
  const subrequirementOptions = subrequirements.flatMap(s => s.subrequirement_options || []);
  const options = subrequirementOptions.flatMap(so => so.options ? [so.options] : []);
  
  // Step 2: Collect course IDs and fetch courses
  const courseIds = options
    .filter(o => o.course_id)
    .map(o => o.course_id)
    .filter((id): id is number => id !== null);
  
  // Fetch both courses and their associated codes
  const coursesData = await ProgramRepository.fetchCoursesForOptions(courseIds);
  const courseCodesData = await ProgramRepository.fetchCourseCodes(courseIds);
  
  // Step 3: Transform data using transformer functions
  const courseMap = createCourseMap(coursesData, courseCodesData);
  const optionMap = createOptionMap(options, courseMap);
  const subreqOptionsMap = createSubreqOptionsMap(subrequirementOptions, optionMap);
  const subrequirementMap = createSubrequirementMap(subrequirements, subreqOptionsMap);
  const reqSubreqsMap = createReqSubreqsMap(requirementSubrequirements, subrequirementMap);
  const requirementMap = createRequirementMap(requirements, reqSubreqsMap);
  const concReqsMap = createConcReqsMap(concentrationRequirements, requirementMap);
  const concentrationMap = createConcentrationMap(concentrations, concReqsMap);
  const degreeConcsMap = createDegreeConcsMap(concentrations, concentrationMap);
  const degreeMap = createDegreeMap(degrees, degreeConcsMap);
  const programDegreesMap = createProgramDegreesMap(degrees, degreeMap);
  
  // Step 4: Transform programs to frontend format
  return transformPrograms(programs, programDegreesMap);
}
