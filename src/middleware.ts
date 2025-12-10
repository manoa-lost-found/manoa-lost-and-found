/* eslint-disable import/prefer-default-export */
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.randomKey;

    // Auto-logout if DISABLED
    if (role === 'DISABLED') {
      const url = new URL('/auth/signout', req.url);
      const res = NextResponse.redirect(url);

      // Clear session token immediately
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

        // Block DISABLED users
        if (token.randomKey === 'DISABLED') return false;

        return true;
      },
    },
  },
);

// IMPORTANT — DO NOT run middleware on ANY API routes or admin actions
export const config = {
  matcher: [
    '/((?!api|auth|admin/user-actions|_next|favicon.ico).*)',
  ],
};
