// src/app/api/items/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { LostFoundStatus } from '@prisma/client';

// Small helper to format the response consistently
function toResponseItem(item: any) {
  return {
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
    ownerId: item.ownerId,
  };
}

// GET /api/items/[id] – public, used by detail/edit pages
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const item = await prisma.lostFoundItem.findUnique({
    where: { id },
  });

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ item: toResponseItem(item) }, { status: 200 });
}

// PUT /api/items/[id] – owner or admin only
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const userId = Number((session?.user as any)?.id);
  const role = (session?.user as any)?.randomKey; // 'USER' | 'ADMIN'

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const existing = await prisma.lostFoundItem.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const isOwner = existing.ownerId === userId;
  const isAdmin = role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();

  const data: any = {};
  if (body.title !== undefined) data.title = String(body.title);
  if (body.description !== undefined) data.description = String(body.description);
  if (body.category !== undefined) data.category = String(body.category);
  if (body.building !== undefined) data.building = String(body.building);
  if (body.term !== undefined) data.term = String(body.term);
  if (body.date !== undefined) data.date = new Date(body.date);
  if (body.locationName !== undefined) data.locationName = body.locationName || null;
  if (body.status && ['OPEN', 'TURNED_IN', 'WAITING_FOR_PICKUP', 'RECOVERED'].includes(body.status)) {
    data.status = body.status as LostFoundStatus;
  }

  const updated = await prisma.lostFoundItem.update({
    where: { id },
    data,
  });

  return NextResponse.json({ item: toResponseItem(updated) }, { status: 200 });
}

// DELETE /api/items/[id] – owner or admin only
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const userId = Number((session?.user as any)?.id);
  const role = (session?.user as any)?.randomKey;

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const existing = await prisma.lostFoundItem.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const isOwner = existing.ownerId === userId;
  const isAdmin = role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.lostFoundItem.delete({ where: { id } });

  return NextResponse.json({ ok: true }, { status: 200 });
}
