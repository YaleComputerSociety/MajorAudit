// app/api/course-info/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/database/server'; // move it here
import { validateOffering } from '@/app/api/student-courses/student-courses';

export async function POST(req: NextRequest) {
  const { code, term } = await req.json();
  const supabase = await getSupabaseServerClient();

  try {
    const data = await validateOffering(code, term, supabase);
    return NextResponse.json({ success: true, ...data });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
