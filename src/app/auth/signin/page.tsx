// src/app/auth/signin/page.tsx
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    // No response (rare)
    if (!res) {
      setError('Unexpected error during sign in.');
      return;
    }

    // Backend errors from authorize()
    if (res.error) {
      switch (res.error) {
        case 'InvalidDomain':
          setError('You must use a @hawaii.edu email address.');
          break;

        case 'EmailNotVerified':
          setError('Please verify your email before signing in.');
          break;

        case 'AccountDisabled':
          setError('Your account has been disabled by an administrator.');
          break;

        default:
          // invalid password OR non-existent account
          setError('Invalid email or password.');
          break;
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
          Don&apos;t have an account?{' '}
          <a href="/auth/signup">Sign up</a>.
        </p>

        <p className="mt-2 mb-0 text-center">
          Admin?{' '}
          <a href="/auth/admin-signin">Sign in here</a>.
        </p>
      </form>
    </main>
  );
}
