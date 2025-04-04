
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/graduation", "/courses", "/majors"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const authCookie = req.cookies.get("sb-auth-token")?.value;
	const isLoggedIn = !!authCookie;

  if (protectedRoutes.includes(path) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/graduation", req.nextUrl));
  }

  if (path === "/") {
    return NextResponse.redirect(new URL(isLoggedIn ? "/graduation" : "/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
