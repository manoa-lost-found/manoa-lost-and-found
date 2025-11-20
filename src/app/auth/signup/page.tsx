// src/app/auth/signup/page.tsx
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { FormEvent, useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setDevVerifyUrl(null);

    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong creating your account.');
        return;
      }

      setSuccess(
        data.message
          || 'Account created! Please check your @hawaii.edu email for a verification link.',
      );

      if (data.devVerifyUrl) {
        setDevVerifyUrl(data.devVerifyUrl as string);
      }

      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong creating your account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <h1 className="text-center mb-4">Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 shadow-sm bg-white"
      >
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2" role="alert">
            {success}
          </div>
        )}

        {devVerifyUrl && (
          <div className="alert alert-info py-2" role="alert">
            <strong>Didn&apos;t see an email?</strong>
            {' '}
            <a href={devVerifyUrl}>Click here to verify your account now.</a>
            <br />
            <small className="text-muted">
              This link will verify your email for this account even if the
              message doesn&apos;t arrive in your inbox.
            </small>
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
            autoComplete="new-password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={submitting}
        >
          {submitting ? 'Creating account…' : 'Sign Up'}
        </button>

        <p className="mt-3 mb-0 text-center">
          Already have an account?
          {' '}
          <a href="/auth/signin">Sign in</a>
          .
        </p>
      </form>
    </main>
  );
}
