// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const protectedRoutes = ["/courses", "/majors"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  
  // Create a Supabase client specifically for middleware
  const supabase = createMiddlewareClient({ req, res });
  
  // This checks the actual Supabase session status
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  if (protectedRoutes.includes(path) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/courses", req.nextUrl));
  }

  if (path === "/") {
    return NextResponse.redirect(new URL(isLoggedIn ? "/courses" : "/login", req.nextUrl));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};