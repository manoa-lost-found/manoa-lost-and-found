import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;

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
        if (!token) return false;

        if (token.role === 'DISABLED') return false;

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|auth|admin/user-actions|_next|favicon.ico).*)',
  ],
};
