import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 },
      );
    }

    const updated = await prisma.user.update({
      where: { id: Number(userId) },
      data: { role: 'ADMIN' },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to promote user' },
      { status: 500 },
    );
  }
}
