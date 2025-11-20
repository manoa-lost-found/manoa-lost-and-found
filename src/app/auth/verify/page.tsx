// src/app/auth/verify/page.tsx
/* eslint-disable lines-around-directive */

'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const hasVerifiedRef = useRef(false); // prevent duplicate requests

  useEffect(() => {
    if (hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;

    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Missing verification token.');
        return;
      }

      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage('Your email has been verified. Redirecting to login...');
          setTimeout(() => router.push('/auth/signin'), 2500);
        } else {
          setStatus('error');
          setMessage(data.error ?? 'Verification failed.');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage('Something went wrong verifying your email.');
      }
    };

    verify();
  }, [token, router]);

  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '60vh' }}
    >
      <div className="text-center">
        {status === 'loading' && (
          <p className="text-muted">Verifying your email…</p>
        )}

        {status === 'success' && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        {status === 'error' && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
