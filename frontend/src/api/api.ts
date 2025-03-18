
import { Ryan } from "@/database/data-user";
import { PROG_DICT } from "@/database/programs/data-program";
import { NextRequest, NextResponse } from "next/server";

export function login(req: NextRequest) 
{
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

export function programs(req: NextRequest)
{
	return NextResponse.json(PROG_DICT, { status: 200 });;
}

