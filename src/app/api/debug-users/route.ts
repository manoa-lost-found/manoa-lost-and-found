import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// TEMPORARY DEBUG ROUTE — DELETE AFTER USE
export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json({ users });
}
