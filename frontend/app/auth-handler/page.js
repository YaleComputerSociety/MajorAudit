
// frontend/app/auth-handler/page.js

"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/context/AuthProvider';

export default function AuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshSession } = useAuth();
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const email = searchParams.get('email');
        const password = searchParams.get('password');
        
        if (!email || !password) {
          setStatus('Missing authentication parameters');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }
        
        setStatus('Authenticating...');
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) {
          console.error('Authentication error:', error);
          setStatus('Authentication failed');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }
        
        await refreshSession();
        
        setStatus('Authentication successful! Redirecting...');
        setTimeout(() => router.push('/courses'), 1000);
      } catch (err) {
        console.error('Error during authentication:', err);
        setStatus('An unexpected error occurred');
        setTimeout(() => router.push('/login'), 2000);
      }
    };
    
    handleAuth();
  }, []);
  
  return (
    <div>
      {status}
    </div>
  );
}
