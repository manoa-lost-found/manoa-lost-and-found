// src/app/api/admin/users/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        randomKey: true,
      },
    });

    const result = users.map((u) => ({
      id: u.id,
      name: null,        // fallback, since no name in DB
      email: u.email,
      role: u.randomKey ?? 'USER',
    }));

    return NextResponse.json({ users: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
