// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.randomKey;

    // If account is disabled → force logout
    if (role === 'DISABLED') {
      const url = new URL('/auth/signout', req.url);
      const res = NextResponse.redirect(url);

      res.cookies.set('__Secure-next-auth.session-token', '', {
        maxAge: 0,
        path: '/',
      });

      return res;
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // No session? Not authorized.
        if (!token) return false;

        // DISABLED users are not authorized
        if (token.randomKey === 'DISABLED') return false;

        return true;
      },
    },
  },
);

// THIS is the correct safe matcher.
// It ONLY protects /dashboard and /admin sections.
// It does NOT interfere with home, FAQ, images, API, auth, etc.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};
