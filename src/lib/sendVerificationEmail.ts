// src/lib/sendVerificationEmail.ts
/* eslint-disable import/prefer-default-export */

import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY || '';
const isProd = process.env.NODE_ENV === 'production';

// Only create Resend client if we have a key
const resend = apiKey ? new Resend(apiKey) : null;

export default async function sendVerificationEmail(email: string, token: string) {
  if (!token) {
    console.error('sendVerificationEmail called with empty/undefined token for email:', email);
    return;
  }

  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL
    || process.env.NEXTAUTH_URL
    || 'http://localhost:3000';

  // Ensure no trailing slash
  const baseUrl = rawBaseUrl.replace(/\/$/, '');
  const verifyUrl = `${baseUrl}/auth/verify?token=${encodeURIComponent(token)}`;

  // Always log for debugging (both dev and prod are fine here)
  console.log('🔗 Email verification payload:', { email, token, verifyUrl });

  // If we don't have an API key/client, just log the URL and return (dev-safe)
  if (!resend) {
    console.warn('RESEND_API_KEY not set; skipping actual email send.');
    return;
  }

  try {
    await resend.emails.send({
      from: 'Manoa Lost & Found <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your Manoa Lost & Found account',
      html: `
        <p>Aloha,</p>
        <p>Click the link below to verify your UH Manoa Lost & Found account:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <p>If you did not create this account, you can ignore this email.</p>
      `,
    });
  } catch (err) {
    console.error('Error sending verification email:', err);

    if (isProd) {
      throw new Error('Failed to send verification email.');
    }
  }
}
