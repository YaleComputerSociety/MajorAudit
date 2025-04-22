'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/context/AuthProvider';

export default function AuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshSession } = useAuth();
  const [status, setStatus] = useState<string>('Processing authentication...');
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      if (hasRedirected) return;

      const email = searchParams.get('email');
      const password = searchParams.get('password');
      const redirectTo = searchParams.get('redirectTo') || '/courses';

      if (!email || !password) {
        setStatus('Missing authentication parameters');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      try {
        setStatus('Authenticating...');

        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          console.error('Supabase signInWithPassword error:', error);
          setStatus('Authentication failed');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }

        await supabase.auth.getSession();
        await refreshSession();

        setStatus('Authenticated! Redirecting...');
        setHasRedirected(true);
        setTimeout(() => router.push(redirectTo), 1000);
      } catch (err) {
        console.error('Unexpected error during authentication:', err);
        setStatus('Unexpected error occurred');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    handleAuth();
  }, [router, searchParams, refreshSession, hasRedirected]);

  return <div>{status}</div>;
}
