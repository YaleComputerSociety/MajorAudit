
// route.ts
import { NextResponse } from 'next/server';
import { fetchProgramHierarchy } from './db-service';
import { transformProgram, createProgramDict } from './transformers';

/**
 * GET handler for the programs API endpoint
 */
export async function GET() {
  try {
    // Fetch all program data with hierarchy
    const enrichedPrograms = await fetchProgramHierarchy();
    
    if (!enrichedPrograms || enrichedPrograms.length === 0) {
      return NextResponse.json(
        { error: 'No program data found' },
        { status: 404 }
      );
    }
    
    // Transform to frontend types
    const transformedPrograms = enrichedPrograms.map(program => transformProgram(program));
    
    // Create program dictionary
    const programDict = createProgramDict(transformedPrograms);
    
    return NextResponse.json(programDict);
  } catch (error) {
    console.error('Error in programs API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch program data' },
      { status: 500 }
    );
  }
}
