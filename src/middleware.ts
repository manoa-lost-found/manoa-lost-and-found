import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.randomKey;

    // If user is disabled → force logout
    if (role === 'DISABLED') {
      const url = new URL('/auth/signout', req.url);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If no session → unauthorized
        if (!token) return false;

        // Block disabled user immediately
        if (token.randomKey === 'DISABLED') return false;

        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
