/* eslint-disable import/prefer-default-export */
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role as string | undefined;

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

    // Everyone else (or no token) just continues
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow public / logged-out access
        if (!token) return true;

        // Block DISABLED users
        if ((token as any).role === 'DISABLED') return false;

        // Allow all other logged-in users
        return true;
      },
    },
  },
);

// IMPORTANT — DO NOT run middleware on API routes or ANY admin routes
export const config = {
  matcher: [
    '/((?!api|auth|admin|_next|favicon.ico).*)',
  ],
};
