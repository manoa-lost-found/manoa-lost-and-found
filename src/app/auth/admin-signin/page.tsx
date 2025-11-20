// src/app/auth/admin-signin/page.tsx
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminSignInPage() {
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

    const res = await signIn('admin-credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/admin', // change later if you want
    });

    setSubmitting(false);

    if (!res) {
      setError('Unexpected error during sign in.');
      return;
    }

    if (res.error) {
      if (res.error === 'EmailNotVerified') {
        setError('Please verify your email before signing in as an admin.');
      } else if (res.error === 'InvalidDomain') {
        setError('You must use a @hawaii.edu email address.');
      } else if (res.error === 'NotAdmin') {
        setError('This account is not an admin account.');
      } else if (res.error === 'NotWhitelisted') {
        setError(
          'This admin account is not allowed to sign in on this site.',
        );
      } else {
        setError('Invalid admin credentials.');
      }
      return;
    }

    // Success
    router.push(res.url ?? '/admin');
  };

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <h1 className="text-center mb-4">Admin Sign In</h1>

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
            Admin UH Email
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
          {submitting ? 'Signing in…' : 'Sign In as Admin'}
        </button>

        <p className="mt-3 mb-0 text-center">
          Not an admin?
          {' '}
          <a href="/auth/signin">Go to user sign in</a>
          .
        </p>
      </form>
    </main>
  );
}
