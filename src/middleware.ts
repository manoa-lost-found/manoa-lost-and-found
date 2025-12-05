import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.randomKey;

    // Force logout instantly if disabled
    if (role === 'DISABLED') {
      const url = new URL('/auth/signout', req.url);

      const response = NextResponse.redirect(url);

      // Wipe session token instantly
      response.cookies.set('__Secure-next-auth.session-token', '', {
        maxAge: 0,
        path: '/',
      });

      return response;
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) return false;

        // Block disabled users
        if (token.randomKey === 'DISABLED') return false;

        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
