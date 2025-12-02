// src/app/api/my-items/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = Number((session?.user as any)?.id);

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 },
      );
    }

    const items = await prisma.lostFoundItem.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = items.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      status: item.status,
      category: item.category,
      building: item.building,
      term: item.term,
      date: item.date.toISOString().slice(0, 10),
      imageUrl: item.imageUrl,
      locationName: item.locationName,
    }));

    return NextResponse.json({ items: formatted }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to load dashboard items' },
      { status: 500 },
    );
  }
}
