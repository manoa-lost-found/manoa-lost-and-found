import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// MUST export only GET — no default export
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        _count: {
          select: { lostFoundItems: true },
        },
      },
    });

    const formatted = users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      itemCount: u._count.lostFoundItems,
    }));

    return NextResponse.json({ users: formatted });
  } catch (err) {
    console.error('ADMIN USERS API ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
