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

    console.log('DISABLE → Incoming userId:', userId);

    const updated = await prisma.user.update({
      where: { id: Number(userId) },
      data: { role: 'DISABLED' },
    });

    console.log('DISABLE → Updated user:', updated);

    return NextResponse.json({
      success: true,
      user: updated,
    });
  } catch (err: any) {
    console.error('🔥 DISABLE ERROR RAW:', err);

    return NextResponse.json(
      {
        error: 'Failed to disable user',
        details: err?.message ?? 'Unknown error',
      },
      { status: 500 },
    );
  }
}
