
// frontend/app/api/student-courses/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { validateCourseExists, addStudentCourse, getStudentCourses } from './student-courses';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Create a server client using the newer SSR package
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => cookieStore.get(name)?.value,
        },
      }
    );
    
    // Get the authenticated user (more secure than just getting the session)
    const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !authUser) {
      return NextResponse.json(
        { error: 'Authentication error: ' + (userError?.message || 'User not found') },
        { status: 401 }
      );
    }

    const userId = authUser.id;
    const studentCourses = await getStudentCourses(userId);
    
    return NextResponse.json({ data: studentCourses });
  } catch (error) {
    console.error('Error fetching student courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student courses' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Create a server client using the newer SSR package
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => cookieStore.get(name)?.value,
        },
      }
    );
    
    // Get the authenticated user
    const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !authUser) {
      return NextResponse.json(
        { error: 'Authentication error: ' + (userError?.message || 'User not found') },
        { status: 401 }
      );
    }

    const userId = authUser.id;
    const { term_from, code, result, term_to } = await req.json();

    // Validate required fields
    if (!term_from || !code || !result || !term_to) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Check if course exists for the given term
    const courseOffering = await validateCourseExists(code, term_from);
    if (!courseOffering) {
      return NextResponse.json(
        { error: 'Course not found for the specified term' }, 
        { status: 404 }
      );
    }

    // Determine status based on terms
    const status = term_from === term_to ? "DA" : "MA";

    // Add student course
    const newStudentCourse = await addStudentCourse({
      userId,
      courseOfferingId: courseOffering.id,
      term: term_to,
      status,
      result
    });

    return NextResponse.json({ 
      data: newStudentCourse,
      message: 'Course added successfully' 
    });
  } catch (error) {
    console.error('Error adding student course:', error);
    return NextResponse.json(
      { error: 'Failed to add student course' }, 
      { status: 500 }
    );
  }
}

// export async function DELETE(req: NextRequest) {
//   try {
//     // Create a server client using the newer SSR package
//     const cookieStore = await cookies();
    
//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           get: (name) => cookieStore.get(name)?.value,
//         },
//       }
//     );
    
//     // Get the authenticated user
//     const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
    
//     if (userError || !authUser) {
//       return NextResponse.json(
//         { error: 'Authentication error: ' + (userError?.message || 'User not found') },
//         { status: 401 }
//       );
//     }

//     const { id } = await req.json();
//     if (!id) {
//       return NextResponse.json(
//         { error: 'Student course ID is required' }, 
//         { status: 400 }
//       );
//     }

//     // Remove the student course
//     await removeStudentCourse(id, authUser.id);
    
//     return NextResponse.json({ 
//       message: 'Course removed successfully' 
//     });
//   } catch (error) {
//     console.error('Error removing student course:', error);
//     return NextResponse.json(
//       { error: 'Failed to remove student course' }, 
//       { status: 500 }
//     );
//   }
// }