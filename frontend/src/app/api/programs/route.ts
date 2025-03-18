
import { NextResponse } from "next/server";
import { PROG_DICT } from "@/database/programs/data-program";

export async function GET() {
	return NextResponse.json(PROG_DICT, { status: 200 });
}
