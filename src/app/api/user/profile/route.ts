// src/app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

// GET — return basic profile info (email only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = Number((session.user as any).id);

    // Fetch only email (since those are the only fields we have)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
      },
    });

    return NextResponse.json(
      {
        email: user?.email ?? '',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to load profile' },
      { status: 500 },
    );
  }
}

// POST — since no editable fields exist, we return an error or do nothing
export async function POST() {
  return NextResponse.json(
    { message: 'No editable profile fields available.' },
    { status: 200 },
  );
}
