import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// MUST export ONLY THIS (no default export!)
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        // name no longer exists in schema — removed!
        lostFoundItems: {
          select: { id: true }, // count items
        },
      },
    });

    // Transform
    const result = users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      itemCount: u.lostFoundItems.length,
    }));

    return NextResponse.json({ users: result });
  } catch (err) {
    console.error('ADMIN USERS API ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
