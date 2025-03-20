
import { NextResponse } from "next/server";
import { Ryan } from "@/database/mock/data-user";

export async function GET() {
	const user = Ryan;

  const response = NextResponse.json(user, { status: 200 });

  response.cookies.set("session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  });

  return response;
}
