// src/app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Because TypeScript doesn't know our session.user has "id"
    const userId = Number((session?.user as any)?.id);

    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 },
      );
    }

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

export async function POST() {
  return NextResponse.json(
    { message: 'No editable profile fields available.' },
    { status: 200 },
  );
}
