// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';

const protectedRoutes = ["/courses", "/majors"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  
  try {
    // Create a Supabase client for the middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => {
            return req.cookies.get(name)?.value;
          },
          set: (name, value, options) => {
            res.cookies.set({
              name,
              value,
              ...options
            });
          },
          remove: (name, options) => {
            res.cookies.set({
              name,
              value: '',
              ...options,
              maxAge: 0
            });
          },
        },
      }
    );
    
    const { data: { session } } = await supabase.auth.getSession();
    const isLoggedIn = !!session;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Middleware] Path: ${path}, Auth: ${isLoggedIn ? 'Authenticated' : 'Not authenticated'}`);
    }

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
  } catch (error) {
    console.error('Middleware error:', error);
    
    if (protectedRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};