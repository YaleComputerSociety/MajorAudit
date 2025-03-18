
import { NextRequest } from "next/server";
import { programs } from "@/api/api";

export async function GET(req: NextRequest) {
	return programs(req);
}
