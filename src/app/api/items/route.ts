// src/app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Prisma, LostFoundStatus, LostFoundType } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import Fuse from 'fuse.js';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

// --- Configuration ---

// --- Interfaces ---
type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

export interface FeedItem {
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
  similarity?: number;
}

// Interface for the POST request body
interface CreateItemRequest {
  title: string;
  description: string;
  type: 'LOST' | 'FOUND';
  status?: ItemStatus;
  category: string;
  building: string;
  date?: string;
  imageUrl?: string;
  locationName?: string;
}

// --- Helpers ---
function getUhAcademicTerm(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
function getUhAcademicTerm(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 8 && month <= 12) return `Fall ${year}`;
  if (month >= 1 && month <= 5) return `Spring ${year}`;
  return `Summer ${year}`;
}

// --- GET: Search & Browse ---
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const typeFilter = searchParams.get('type');
    const buildingFilter = searchParams.get('building');
    const categoryFilter = searchParams.get('category');
    const sort = searchParams.get('sort') || 'NEWEST';

    let feedItems: FeedItem[] = [];

    // ---------------------------------------------------------
    // STRATEGY A: FUZZY SEARCH (If 'q' is present)
    // ---------------------------------------------------------
    if (query.trim().length > 0) {
      // Build standard Prisma filters
      const where: Prisma.LostFoundItemWhereInput = {};

      if (typeFilter && typeFilter !== 'ALL') {
        where.type = typeFilter as LostFoundType;
      }
      if (buildingFilter) where.building = buildingFilter;
      if (categoryFilter) where.category = categoryFilter;

      const items = await prisma.lostFoundItem.findMany({
        where,
        include: { owner: true },
      });

      // Fuzzy search using Fuse.js
      const fuse = new Fuse(items, {
        keys: ['title', 'description', 'category', 'building'],
        threshold: 0.4, // Adjust for fuzziness (0.0 = exact match, 1.0 = match anything)
      });

      const results = fuse.search(query);

      // Map to FeedItem, limit to 20
      feedItems = results.slice(0, 20).map((result) => ({
        id: result.item.id,
        title: result.item.title,
        description: result.item.description,
        type: result.item.type as ItemType,
        status: result.item.status as ItemStatus,
        category: result.item.category,
        building: result.item.building,
        term: result.item.term,
        date: result.item.date.toISOString().slice(0, 10),
        imageUrl: result.item.imageUrl,
        locationName: result.item.locationName,
        ownerEmail: result.item.owner.email,
        ownerId: result.item.ownerId,
      }));
    } else {
      // ---------------------------------------------------------
      // STRATEGY B: STANDARD BROWSE (No search query)
      // ---------------------------------------------------------
      // Build standard Prisma filters
      const where: Prisma.LostFoundItemWhereInput = {};

      if (typeFilter && typeFilter !== 'ALL') {
        // Safe cast because we trust the filter logic or Prisma ignores invalid enum strings in some configs,
        // but explicit casting is safer for TS.
        where.type = typeFilter as LostFoundType;
      }
      if (buildingFilter) where.building = buildingFilter;
      if (categoryFilter) where.category = categoryFilter;

      const items = await prisma.lostFoundItem.findMany({
        where,
        orderBy: {
          createdAt: sort === 'NEWEST' ? 'desc' : 'asc',
        },
        include: { owner: true },
        take: 50,
      });

      // TS infers 'item' correctly here from Prisma Client
      feedItems = items.map((item) => ({
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
    }

    return NextResponse.json({ items: feedItems }, { status: 200 });
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

// --- POST: Create Item (With Embedding) ---
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

    // Cast the request body to our interface
    const body = (await req.json()) as CreateItemRequest;

    // 1. Validation
    if (!body.title || !body.description || !body.type || !body.category || !body.building) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // 2. Prepare Data
    const type: LostFoundType = body.type === 'FOUND' ? LostFoundType.FOUND : LostFoundType.LOST;

    let status: LostFoundStatus = LostFoundStatus.OPEN;
    if (body.status && ['OPEN', 'TURNED_IN', 'WAITING_FOR_PICKUP', 'RECOVERED'].includes(body.status)) {
    const type: LostFoundType =
      body.type === 'FOUND' ? LostFoundType.FOUND : LostFoundType.LOST;

    let status: LostFoundStatus;
    if (
      body.status &&
      ['OPEN', 'TURNED_IN', 'WAITING_FOR_PICKUP', 'RECOVERED'].includes(body.status)
    ) {
      status = body.status as LostFoundStatus;
    } else if (type !== LostFoundType.LOST) {
      status = LostFoundStatus.WAITING_FOR_PICKUP;
    }

    const now = new Date();
    const dateValue = body.date ? new Date(body.date) : now;
    const term = getUhAcademicTerm(dateValue);

    // 3. Create Item (Standard Prisma Create)
    const pickupLocation =
      type === LostFoundType.LOST ? (body.pickupLocation ?? null) : null;

    const created = await prisma.lostFoundItem.create({
      data: {
        title: body.title,
        description: body.description,
        type,
        status,
        category: body.category,
        building: body.building,
        term,
        date: dateValue,
        imageUrl: body.imageUrl ?? null,
        locationName: body.locationName ?? null,
        pickupLocation,
        ownerId: user.id,
      },
      include: { owner: true },
    });

    // 4. Return Response
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
    return NextResponse.json({ item: toFeedItem(created) }, { status: 201 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in POST /api/items:', err);
    return NextResponse.json({ error: 'Failed to create item.' }, { status: 500 });
  }
}
