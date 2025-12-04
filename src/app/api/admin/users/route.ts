// src/app/api/admin/users/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Default export REQUIRED for API routes
export default async function GET() {
  try {
    // Load all users
    const users = await prisma.user.findMany();

    // Count items manually (NO relation needed)
    const items = await prisma.item.findMany();

    // Build response with manual itemCount
    const result = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.randomKey ?? 'USER',
      itemCount: items.filter((i) => i.userId === u.id).length,
    }));

    return NextResponse.json({ users: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 },
    );
  }
}
