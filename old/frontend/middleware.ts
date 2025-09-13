// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const protectedRoutes = ["/courses", "/majors"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => req.cookies.getAll(),  // ✅ Use getAll()
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              res.cookies.set(name, value, options);
            });
          }
        }
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const isLoggedIn = !!session;

    if (process.env.NODE_ENV === "development") {
      console.log(`[Middleware] Path: ${path}, Auth: ${isLoggedIn ? "Authenticated" : "Not authenticated"}`);
    }

    if (protectedRoutes.includes(path) && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (path === "/login" && isLoggedIn) {
      return NextResponse.redirect(new URL("/courses", req.nextUrl));
    }

    if (path === "/auth" && isLoggedIn) {
      const redirectTo = req.nextUrl.searchParams.get("redirectTo") || "/courses";
      return NextResponse.redirect(new URL(redirectTo, req.nextUrl));
    }

    if (path === "/" && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (path === "/" && isLoggedIn) {
      return NextResponse.redirect(new URL("/courses", req.nextUrl));
    }

    return res;
  } catch (error) {
    console.error("[Middleware Error]:", error);
    if (protectedRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return res;
  }
}

export const config = {
  matcher: [
    "/courses/:path*",
    "/majors/:path*",
    "/auth",
    "/login",
    "/"
  ]
};
