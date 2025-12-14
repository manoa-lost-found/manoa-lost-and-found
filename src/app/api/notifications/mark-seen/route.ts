import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const rawId = (session?.user as any)?.id;
  if (!rawId) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const userId = Number(rawId);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as { itemIds?: number[] } | null;
  const itemIds = body?.itemIds ?? [];

  // Save seen ids for this user
  await prisma.user.update({
    where: { id: userId },
    data: {
      seenPickupItemIds: { set: itemIds },
    },
  });

  return NextResponse.json({ ok: true });
}
