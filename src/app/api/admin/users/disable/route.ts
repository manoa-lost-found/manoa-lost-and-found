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
      data: { role: 'USER' }, // or DISABLED if you add that enum
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to disable user' },
      { status: 500 },
    );
  }
}
