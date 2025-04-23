// // frontend/app/api/student-courses/[id]/route.ts
// export const dynamic = 'force-dynamic';

// import { NextRequest, NextResponse } from 'next/server';
// import { getSupabaseServerClient } from '@/database/server';

// export async function PATCH(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // Get the course ID from params
//     const { id } = await context.params;
//     const courseId = parseInt(id, 10);

//     if (isNaN(courseId)) {
//       return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
//     }

//     // Parse request body
//     const updates = await req.json();
    
//     // Initialize Supabase client
//     const supabase = await getSupabaseServerClient();
    
//     // Check authentication
//     const { data: { user }, error: authError } = await supabase.auth.getUser();

//     if (authError || !user) {
//       return NextResponse.json({ error: 'Authentication error' }, { status: 401 });
//     }

//     // Perform the update
//     const { error: updateError } = await supabase
//       .from('student_courses')
//       .update(updates)
//       .eq('id', courseId);

//     if (updateError) {
//       return NextResponse.json({ 
//         error: 'Failed to update course', 
//         details: updateError 
//       }, { status: 500 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ 
//       error: 'Internal server error'
//     }, { status: 500 });
//   }
// }