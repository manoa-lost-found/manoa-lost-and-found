// src/app/api/my-items/route.ts
/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Our JWT includes numeric userId (not typed by NextAuth)
    const userId = Number((session.user as any).id);

    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID in session' },
        { status: 401 }
      );
    }

    const items = await prisma.lostFoundItem.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    const formattedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type, // LOST / FOUND
      status: item.status,
      category: item.category,
      building: item.building,
      term: item.term,
      date: item.date.toISOString().slice(0, 10),
      imageUrl: item.imageUrl,
      locationName: item.locationName,
    }));

    return NextResponse.json({ items: formattedItems }, { status: 200 });

  } catch (error) {
    console.error('Error loading my-items:', error);
    return NextResponse.json(
      { error: 'Failed to load dashboard items' },
      { status: 500 }
    );
  }
}
