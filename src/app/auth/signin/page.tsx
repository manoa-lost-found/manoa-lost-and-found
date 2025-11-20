// src/app/auth/signin/page.tsx
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { FormEvent, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlError = searchParams.get('error');

  // Map NextAuth ?error=... into a friendly message (no nested ternary)
  useEffect(() => {
    if (!urlError) return;

    let msg: string | null = null;

    if (urlError === 'CredentialsSignin') {
      msg = 'Invalid email or password.';
    } else if (urlError === 'EmailNotVerified') {
      msg = 'Please verify your email before signing in.';
    } else if (urlError === 'InvalidDomain') {
      msg = 'You must use a @hawaii.edu email address.';
    }

    if (msg) {
      setError(msg);
    }
  }, [urlError]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setSubmitting(true);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });

    setSubmitting(false);

    if (!res) {
      setError('Unexpected error during sign in.');
      return;
    }

    if (res.error) {
      if (res.error === 'EmailNotVerified') {
        setError('Please verify your email before signing in.');
      } else if (res.error === 'InvalidDomain') {
        setError('You must use a @hawaii.edu email address.');
      } else {
        setError('Invalid email or password.');
      }
      return;
    }

    // Success
    router.push(res.url ?? '/');
  };

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <h1 className="text-center mb-4">Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 shadow-sm bg-white"
      >
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            UH Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="you@hawaii.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={submitting}
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>

        <p className="mt-3 mb-0 text-center">
          Don&apos;t have an account?
          {' '}
          <a href="/auth/signup">Sign up</a>
          .
        </p>
      </form>
    </main>
  );
}
