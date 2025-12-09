import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Restore: sets role back to USER
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
      data: { role: 'USER' }, // restore access
    });

    return NextResponse.json({
      success: true,
      user: updated,
    });
  } catch (err) {
    console.error('RESTORE ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to restore user' },
      { status: 500 },
    );
  }
}
