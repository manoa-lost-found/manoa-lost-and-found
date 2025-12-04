import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Temporary admin promotion route
// DELETE THIS FILE AFTER YOU RUN IT ONCE

export async function GET() {
  try {
    // Normalize email to lowercase
    const email = 'uzueta@hawaii.edu'.toLowerCase();

    // Find the user regardless of how the email is stored
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive', // case-insensitive match
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: 'User not found in database.' },
        { status: 404 },
      );
    }

    // Update role to ADMIN
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' },
    });

    return NextResponse.json({
      success: true,
      msg: `You (${email}) are now ADMIN.`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 },
    );
  }
}
