// src/app/api/user/profile/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

/* -----------------------------------------------------
   GET — return user profile
----------------------------------------------------- */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 },
      );
    }

    const userId = Number((session.user as any).id);

    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user id in session' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        preferredContact: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error('PROFILE GET ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to load profile' },
      { status: 500 },
    );
  }
}

/* -----------------------------------------------------
   POST — update profile (name, preferredContact)
----------------------------------------------------- */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 },
      );
    }

    const userId = Number((session.user as any).id);

    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user id in session' },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { name, preferredContact } = body;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name ?? undefined,
        preferredContact: preferredContact ?? undefined,
      },
      select: {
        name: true,
        email: true,
        preferredContact: true,
      },
    });

    return NextResponse.json(
      { success: true, user: updated },
      { status: 200 },
    );
  } catch (err) {
    console.error('PROFILE UPDATE ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 },
    );
  }
}
