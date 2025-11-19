import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function middlewareHandler(request: NextRequest) {
  // ESLint: prefer-destructuring
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;

  const loggedIn = cookies.get('uh_logged_in');

  const publicPaths = ['/auth/uh-login', '/auth/callback'];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!loggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/auth/uh-login', request.url));
  }

  return NextResponse.next();
}

export default middlewareHandler;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
