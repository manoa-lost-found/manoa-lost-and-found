// src/app/api/auth/signup/route.ts
/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import isHawaiiEmail from '@/lib/isHawaiiEmail';
import sendVerificationEmail from '@/lib/sendVerificationEmail';

export async function POST(req: Request) {
  try {
    const { email: rawEmail, password } = await req.json();

    if (!rawEmail || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 },
      );
    }

    const email = rawEmail.trim().toLowerCase();

    if (!isHawaiiEmail(email)) {
      return NextResponse.json(
        { error: 'You must use a @hawaii.edu email address.' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'USER',
        emailVerified: null,
      },
    });

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Build verify URL (for both email + dev shortcut)
    const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL
      || process.env.NEXTAUTH_URL
      || 'http://localhost:3000';

    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    const verifyUrl = `${baseUrl}/auth/verify?token=${encodeURIComponent(token)}`;

    await sendVerificationEmail(user.email, token);

    // Response payload
    const body: any = {
      message:
        'Account created! Please check your @hawaii.edu email for a verification link.',
    };

    // In development, include a direct verify link for users
    if (process.env.NODE_ENV !== 'production') {
      body.devVerifyUrl = verifyUrl;
    }

    return NextResponse.json(body, { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json(
      { error: 'Something went wrong creating your account.' },
      { status: 500 },
    );
  }
}
