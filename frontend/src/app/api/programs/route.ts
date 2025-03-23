
// route.ts
import { NextResponse } from 'next/server';
import { fetchProgramsDirectToFrontend } from './db-service';

export async function GET() {
  try {
    // Fetch and transform all program data in one step
    const transformedPrograms = await fetchProgramsDirectToFrontend();
    
    if (!transformedPrograms || transformedPrograms.length === 0) {
      return NextResponse.json(
        { error: 'No program data found' },
        { status: 404 }
      );
    }
    
    // Create program dictionary
    const programDict: Record<string, typeof transformedPrograms[0]> = {};
    transformedPrograms.forEach(program => {
      programDict[program.abbreviation] = program;
    });
    
    return NextResponse.json(programDict);
  } catch (error) {
    console.error('Error in programs API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch program data' },
      { status: 500 }
    );
  }
}
