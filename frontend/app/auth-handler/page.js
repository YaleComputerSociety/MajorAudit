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
        
        // Create a client-side Supabase client
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        
        // Sign in with the email and password from the URL
        // This is secure enough for this flow since it's a one-time redirect
        // and the password is a randomly generated token
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
        
        // Verify the session was created
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
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-4">{status}</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}