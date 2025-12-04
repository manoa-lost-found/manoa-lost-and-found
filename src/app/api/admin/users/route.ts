import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        lostFoundItems: true, // this IS the correct relation in your schema
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
    console.error('ADMIN USERS API ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}

export default GET;
