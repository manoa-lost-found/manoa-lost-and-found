import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        items: true, // include user posts
      },
    });

    const result = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.randomKey ?? 'USER',
      itemCount: u.items.length,
    }));

    return NextResponse.json({ users: result });
  } catch (error) {
    console.error('Failed to load users:', error);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
