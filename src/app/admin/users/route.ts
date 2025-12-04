import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        items: true, // adjust if your model is named differently
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 });
  }
}

