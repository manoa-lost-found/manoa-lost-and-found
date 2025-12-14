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
  term: string;
  date: string;
  locationName?: string | null;
  pickupLocation?: string | null;
  ownerEmail: string;
  ownerId?: number;
};

function getUhAcademicTerm(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 8 && month <= 12) return `Fall ${year}`;
  if (month >= 1 && month <= 5) return `Spring ${year}`;
  return `Summer ${year}`;
}

function toFeedItem(item: any): FeedItem {
  return {
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
    pickupLocation: item.pickupLocation ?? null,
    ownerEmail: item.owner?.email ?? '',
    ownerId: item.ownerId,
  };
}

// GET /api/items?take=12&cursor=123&sort=NEWEST|OLDEST
// Admin-only: /api/items?all=1 (returns ALL items)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sort = (searchParams.get('sort') ?? 'NEWEST').toUpperCase();
    const orderDirection = sort === 'OLDEST' ? 'asc' : 'desc';

    const all = searchParams.get('all') === '1';

    // Pagination defaults for public/feed usage
    const takeRaw = Number(searchParams.get('take') ?? '12');
    const cursorRaw = searchParams.get('cursor');
    const take = Number.isFinite(takeRaw) ? Math.max(1, Math.min(takeRaw, 50)) : 12;
    const cursor = cursorRaw ? Number(cursorRaw) : null;

    // If asking for all, require admin
    if (all) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!dbUser || dbUser.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Admins only' }, { status: 403 });
      }

      const items = await prisma.lostFoundItem.findMany({
        orderBy: [{ date: orderDirection }, { id: orderDirection }],
        include: { owner: true },
      });

      return NextResponse.json(
        { items: items.map(toFeedItem), nextCursor: null },
        { status: 200 },
      );
    }

    // Normal feed/paginated behavior
    const items = await prisma.lostFoundItem.findMany({
      take,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: [{ date: orderDirection }, { id: orderDirection }],
      include: { owner: true },
    });

    const feedItems = items.map(toFeedItem);
    const nextCursor = items.length === take ? items[items.length - 1].id : null;

    return NextResponse.json({ items: feedItems, nextCursor }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in GET /api/items:', err);
    return NextResponse.json({ error: 'Failed to load items.' }, { status: 500 });
  }
}

// POST /api/items
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

    if (!body.title || !body.description || !body.type || !body.category || !body.building) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const type: LostFoundType =
      body.type === 'FOUND' ? LostFoundType.FOUND : LostFoundType.LOST;

    let status: LostFoundStatus;
    if (
      body.status &&
      ['OPEN', 'TURNED_IN', 'WAITING_FOR_PICKUP', 'RECOVERED'].includes(body.status)
    ) {
      status = body.status as LostFoundStatus;
    } else if (type === LostFoundType.LOST) {
      status = LostFoundStatus.OPEN;
    } else {
      status = LostFoundStatus.WAITING_FOR_PICKUP;
    }

    const now = new Date();
    const dateValue = body.date ? new Date(body.date) : now;
    const term = getUhAcademicTerm(dateValue);

    const pickupLocation =
      type === LostFoundType.LOST ? (body.pickupLocation ?? null) : null;

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
        pickupLocation,
        ownerId: user.id,
      },
      include: { owner: true },
    });

    return NextResponse.json({ item: toFeedItem(created) }, { status: 201 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in POST /api/items:', err);
    return NextResponse.json({ error: 'Failed to create item.' }, { status: 500 });
  }
}
