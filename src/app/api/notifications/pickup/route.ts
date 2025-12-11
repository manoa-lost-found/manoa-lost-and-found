import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  const rawId = (session?.user as any)?.id;
  if (!rawId) {
    return NextResponse.json({ notifications: [] }, { status: 200 });
  }

  const userId = Number(rawId);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ notifications: [] }, { status: 200 });
  }

  // Get the user's seen ids
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { seenPickupItemIds: true },
  });

  const seenIds = user?.seenPickupItemIds ?? [];

  // Only LOST items for this user that are waiting for pickup
  const items = await prisma.lostFoundItem.findMany({
    where: {
      ownerId: userId,
      type: 'LOST',
      status: 'WAITING_FOR_PICKUP',
    },
    orderBy: { updatedAt: 'desc' },
    take: 10,
  });

  const notifications = items.map((item) => ({
    id: item.id,
    itemId: item.id,
    title: item.title,
    status: item.status,
    updatedAt: item.updatedAt.toISOString(),
    seen: seenIds.includes(item.id),
  }));

  return NextResponse.json({ notifications }, { status: 200 });
}
