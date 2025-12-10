/* eslint-disable import/prefer-default-export */
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.randomKey;

    // If user is DISABLED → force logout
    if (role === 'DISABLED') {
      const logoutUrl = new URL('/auth/signout', req.url);
      const res = NextResponse.redirect(logoutUrl);

      // Hard clear cookie
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
        if (!token) return false;

        // Block disabled accounts everywhere
        if (token.randomKey === 'DISABLED') return false;

        return true;
      },
    },
  },
);

// IMPORTANT — middleware runs only on protected areas
export const config = {
  matcher: [
    // User-protected pages
    '/dashboard/:path*',
    '/profile/:path*',
    '/item/:path*',

    // Admin-only pages (add back!)
    '/admin/:path*',
  ],
};
