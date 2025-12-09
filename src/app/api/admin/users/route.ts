// src/app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This route returns all users for the Admin Users page
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
    console.error('Failed to load users', error);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
