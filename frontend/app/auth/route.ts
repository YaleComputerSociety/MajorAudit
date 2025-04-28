import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = (formData.get('redirectTo') as string) || '/courses';

  if (!email || !password) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const cookieStore = await cookies();  // <-- 🔥 correctly await it

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (key) => (await cookies()).get(key)?.value || '',
        set: async (key, value, options) => {
          (await cookies()).set(key, value, options);
        },
        remove: async (key, options) => {
          (await cookies()).set(key, '', { ...options, maxAge: -1 });
        }
      }
    }
  );

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Supabase signInWithPassword error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.redirect(new URL(redirectTo, req.url));
}
