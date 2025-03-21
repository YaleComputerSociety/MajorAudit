
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase";

// API Route: /api/courses/[season]/[code]
export async function GET(
  request: Request,
  { params }: { params: { term: number; code: string } }
) {
  const { term, code } = params; // Extract URL parameters

  try {
    // Query Supabase: match season_code & check if code exists in codes array
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("*")
      .eq("term", term)
      .contains("codes", [code]); // Assuming "codes" is stored as an array

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
