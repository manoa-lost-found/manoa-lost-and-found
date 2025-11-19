import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function handler(request: NextRequest) {
  const ticket = request.nextUrl.searchParams.get('ticket');

  if (!ticket) {
    return NextResponse.redirect('https://manoa-lost-and-found.vercel.app/');
  }

  const response = NextResponse.redirect('https://manoa-lost-and-found.vercel.app/');

  response.cookies.set('uh_logged_in', 'true', {
    httpOnly: true,
    secure: true,
    path: '/',
  });

  return response;
}

export default handler;
