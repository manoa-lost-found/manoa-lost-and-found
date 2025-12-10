// src/app/api/user/stats/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Look up user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Count different types of records
    const totalPosted = await prisma.lostFoundItem.count({
      where: { ownerId: userId },
    });

    const lostCount = await prisma.lostFoundItem.count({
      where: { ownerId: userId, type: 'LOST' },
    });

    const foundCount = await prisma.lostFoundItem.count({
      where: { ownerId: userId, type: 'FOUND' },
    });

    const reunitedCount = await prisma.lostFoundItem.count({
      where: {
        ownerId: userId,
        status: 'RECOVERED',
      },
    });

    const pendingCount = await prisma.lostFoundItem.count({
      where: {
        ownerId: userId,
        status: {
          in: ['OPEN', 'WAITING_FOR_PICKUP', 'TURNED_IN'],
        },
      },
    });

    return NextResponse.json(
      {
        posted: totalPosted,
        lost: lostCount,
        found: foundCount,
        reunited: reunitedCount,
        pending: pendingCount,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('Failed to load stats:', err);
    return NextResponse.json(
      { error: 'Failed to load stats' },
      { status: 500 },
    );
  }
}
