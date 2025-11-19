import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticket = searchParams.get('ticket');

  if (!ticket) {
    return NextResponse.redirect('/auth/error');
  }

  return NextResponse.redirect('/list');
}
