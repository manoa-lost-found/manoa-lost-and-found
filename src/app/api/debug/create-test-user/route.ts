import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const email = 'testuser@hawaii.edu';
    const password = 'Test123!';

    const hash = await bcrypt.hash(password, 10);

    // Create or update the test user
    await prisma.user.upsert({
      where: { email },
      update: { password: hash, role: 'USER', emailVerified: new Date() },
      create: {
        email,
        password: hash,
        role: 'USER',
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      email,
      password: 'Test123!',
      message: 'Dummy user ready for login.',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed.' }, { status: 500 });
  }
}
