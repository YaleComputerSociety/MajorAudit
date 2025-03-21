
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('courses')
      .select('*');
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
