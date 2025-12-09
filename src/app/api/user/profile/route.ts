// src/app/api/user/profile/route.ts
/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions'; // <-- fixed extension
import { prisma } from '@/lib/prisma';

// ---------------------------------------------------------
// GET — Return current user profile
// ---------------------------------------------------------
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('PROFILE GET ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to load profile' },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// POST — Update profile
// ---------------------------------------------------------
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 },
      );
    }

    const { name } = await req.json();
    const userId = Number((session.user as any).id);

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error('PROFILE POST ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 },
    );
  }
}
