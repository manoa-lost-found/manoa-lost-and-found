import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 🔥 THIS LINE DISABLES CACHING COMPLETELY
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        lostFoundItems: {
          select: { id: true },
        },
      },
    });

    const result = users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      itemCount: u.lostFoundItems.length,
    }));

    return NextResponse.json(
      { users: result },
      {
        headers: {
          // 🔥 also forces browsers + Next.js to NEVER cache
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
