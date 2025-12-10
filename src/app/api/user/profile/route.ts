import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

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
        { status: 401 },
      );
    }

    // Prisma SELECT must match your schema — only email exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to load profile' },
      { status: 500 },
    );
  }
}

// POST is disabled for now because the schema has no editable fields
export async function POST() {
  return NextResponse.json(
    { error: 'Profile editing not available' },
    { status: 400 },
  );
}
