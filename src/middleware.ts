// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.randomKey;

    // Auto-logout disabled users
    if (role === 'DISABLED') {
      const url = new URL('/auth/signout', req.url);
      const response = NextResponse.redirect(url);

      // Kill session instantly
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

// ❗ IMPORTANT: Exclude ALL API ROUTES
export const config = {
  matcher: [
    '/((?!api|auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
