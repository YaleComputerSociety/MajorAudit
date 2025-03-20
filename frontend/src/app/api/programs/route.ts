// route.ts
import { NextResponse } from 'next/server';
import { fetchProgramHierarchy } from './db-service';
import { transformProgram, createProgramDict } from './transformers';

export async function GET() {
  try {
    // Fetch data
    const enrichedPrograms = await fetchProgramHierarchy();
    
    // Transform to frontend types
    const transformedPrograms = enrichedPrograms.map(transformProgram);
    
    // Create program dictionary
    const programDict = createProgramDict(transformedPrograms);

		console.log(programDict);
    
    return NextResponse.json(programDict);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching programs:', errorMessage);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}
