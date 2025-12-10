/* eslint-disable import/prefer-default-export */
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as any | null;
    const role = token?.role as string | undefined;

    // Auto-logout if DISABLED
    if (role === 'DISABLED') {
      const url = new URL('/auth/signout', req.url);
      const res = NextResponse.redirect(url);

      // Clear both possible session cookie names (dev & prod)
      res.cookies.set('next-auth.session-token', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
      });

      res.cookies.set('__Secure-next-auth.session-token', '', {
        httpOnly: true,
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
      // Always allow the request to continue; we handle DISABLED above.
      // This prevents NextAuth from doing its own "unauthorized" redirect
      // that can conflict with our custom logout flow.
      authorized: () => true,
    },
  },
);

// IMPORTANT — DO NOT run middleware on API routes or ANY admin routes
export const config = {
  matcher: ['/((?!api|auth|admin|_next|favicon.ico).*)'],
};
