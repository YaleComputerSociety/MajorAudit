
import { NextRequest } from "next/server";
import { login } from "@/api/api";

export async function GET(req: NextRequest) {
  return login(req);
}
