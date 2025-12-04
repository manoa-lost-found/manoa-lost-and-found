import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // named import is correct

// Next.js Route Handler for /api/admin/users
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

    return NextResponse.json({ users: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
