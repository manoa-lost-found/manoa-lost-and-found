// src/app/api/auth/verify/route.ts
/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Missing token.' },
        { status: 400 },
      );
    }

    const record = await prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Invalid or expired verification link.' },
        { status: 400 },
      );
    }

    if (record.expiresAt < new Date()) {
      // Token expired; clean it up
      await prisma.emailVerificationToken.delete({
        where: { id: record.id },
      });

      return NextResponse.json(
        { error: 'This verification link has expired.' },
        { status: 400 },
      );
    }

    // Mark user as verified
    await prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: new Date() },
    });

    // Delete used token
    await prisma.emailVerificationToken.delete({
      where: { id: record.id },
    });

    return NextResponse.json(
      { message: 'Email verified successfully.' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Verification error:', err);
    return NextResponse.json(
      { error: 'Something went wrong verifying your email.' },
      { status: 500 },
    );
  }
}
