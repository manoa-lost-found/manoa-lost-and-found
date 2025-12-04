import { NextResponse } from 'next/server';
import db from '@/lib/prisma';

// default export to satisfy ESLint import/prefer-default-export
export default async function handler() {
  try {
    const users = await db.user.findMany({
      include: {
        items: true,
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
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
