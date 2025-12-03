// src/app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { LostFoundStatus, LostFoundType } from '@prisma/client';

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

export type FeedItem = {
  id: number;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  imageUrl?: string | null;
  category: string;
  building: string;
  term: string; // e.g. 'Fall 2025'
  date: string; // 'YYYY-MM-DD'
  locationName?: string | null;
  ownerEmail: string;
  ownerId?: number;
};

/**
 * Given a date, compute the UH-style academic term string.
 * Fall runs roughly Aug–Dec, Spring Jan–May, Summer Jun–Jul.
 */
function getUhAcademicTerm(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1–12

  if (month >= 8 && month <= 12) {
    return `Fall ${year}`;
  }
  if (month >= 1 && month <= 5) {
    return `Spring ${year}`;
  }
  // Everything else treated as Summer
  return `Summer ${year}`;
}

// GET all items for the public feed
export async function GET() {
  try {
    const items = await prisma.lostFoundItem.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: true },
    });

    const feedItems: FeedItem[] = items.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type as ItemType,
      status: item.status as ItemStatus,
      category: item.category,
      building: item.building,
      term: item.term,
      date: item.date.toISOString().slice(0, 10),
      imageUrl: item.imageUrl,
      locationName: item.locationName,
      ownerEmail: item.owner.email,
      ownerId: item.ownerId,
    }));

    return NextResponse.json({ items: feedItems }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in GET /api/items:', err);
    return NextResponse.json(
      { error: 'Failed to load items.' },
      { status: 500 },
    );
  }
}

// POST a new lost/found item (must be logged in)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to create an item.' },
        { status: 401 },
      );
    }

    const body = await req.json();

    // Basic validation – required fields
    if (
      !body.title
      || !body.description
      || !body.type
      || !body.category
      || !body.building
    ) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 },
      );
    }

    // Find the user in the DB based on the session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 },
      );
    }

    // Normalize type
    const type: LostFoundType = body.type === 'FOUND'
      ? LostFoundType.FOUND
      : LostFoundType.LOST;

    // Determine status (same logic as before, with Prisma enum)
    let status: LostFoundStatus;
    if (
      body.status
      && ['OPEN', 'TURNED_IN', 'WAITING_FOR_PICKUP', 'RECOVERED'].includes(body.status)
    ) {
      status = body.status as LostFoundStatus;
    } else if (type === LostFoundType.LOST) {
      status = LostFoundStatus.OPEN;
    } else {
      status = LostFoundStatus.WAITING_FOR_PICKUP;
    }

    const now = new Date();
    const dateValue = body.date ? new Date(body.date) : now;

    // Derive UH term from the date
    const term = getUhAcademicTerm(dateValue);

    const created = await prisma.lostFoundItem.create({
      data: {
        title: String(body.title),
        description: String(body.description),
        type,
        status,
        category: String(body.category),
        building: String(body.building),
        term,
        date: dateValue,
        imageUrl: body.imageUrl ?? null,
        locationName: body.locationName ?? null,
        ownerId: user.id,
      },
      include: { owner: true },
    });

    const responseItem: FeedItem = {
      id: created.id,
      title: created.title,
      description: created.description,
      type: created.type as ItemType,
      status: created.status as ItemStatus,
      category: created.category,
      building: created.building,
      term: created.term,
      date: created.date.toISOString().slice(0, 10),
      imageUrl: created.imageUrl,
      locationName: created.locationName,
      ownerEmail: created.owner.email,
      ownerId: created.ownerId,
    };

    return NextResponse.json({ item: responseItem }, { status: 201 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in POST /api/items:', err);
    return NextResponse.json(
      { error: 'Failed to create item.' },
      { status: 500 },
    );
  }
}
