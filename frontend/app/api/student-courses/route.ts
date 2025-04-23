// UPDATED: frontend/app/api/student-courses/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/database/server';
import {
  addStudentCourses,
  getStudentCourses,
  removeStudentCourses,
} from './student-courses';

export async function GET(req: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 });
    }

    const url = new URL(req.url);
    const fypId = url.searchParams.get('fyp_id');
    if (!fypId) return NextResponse.json({ error: 'FYP ID required' }, { status: 400 });

    const studentCourses = await getStudentCourses(parseInt(fypId), supabase);
    return NextResponse.json({ data: studentCourses });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch student courses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return NextResponse.json({ error: 'Authentication error' }, { status: 401 });

    const { fyp_id, entries } = await req.json();
    if (!fyp_id || !Array.isArray(entries)) {
      return NextResponse.json({ error: 'Missing required fields: fyp_id or entries[]' }, { status: 400 });
    }

    const { added, errors } = await addStudentCourses(fyp_id, entries, supabase);
    return NextResponse.json({ added, errors });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add courses' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return NextResponse.json({ error: 'Authentication error' }, { status: 401 });

    const { fyp_id, ids } = await req.json();

    if (!fyp_id || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'Missing or malformed fyp_id or ids[]' }, { status: 400 });
    }

    const { removed, errors } = await removeStudentCourses(fyp_id, ids, supabase);
    return NextResponse.json({ removed, errors });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to remove courses' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const updates: { id: number; sort_index?: number; is_hidden?: boolean }[] = await req.json();

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 });
    }

    const errors: any[] = [];

    for (const update of updates) {
      const { id, ...fields } = update;
      if (!id || Object.keys(fields).length === 0) {
        errors.push({ id, message: 'Missing update fields' });
        continue;
      }

      const { error: updateError } = await supabase
        .from('student_courses')
        .update(fields)
        .eq('id', id);

      if (updateError) {
        errors.push({ id, message: updateError.message });
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      errors,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

