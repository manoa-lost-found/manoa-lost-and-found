import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// MUST be a named export for Next.js App Router
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        items: true,
      },
    });

    const mapped = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.randomKey ?? 'USER',
      itemCount: u.items.length,
    }));

    return NextResponse.json({ users: mapped });
  } catch (error) {
    console.error('Failed to load users', error);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 }
    );
  }
}
