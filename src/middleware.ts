import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.redirect(
    'https://authn.hawaii.edu/cas/login?service=https://manoa-lost-and-found.vercel.app',
  );
}

export const config = {
  matcher: ['/auth/signin'],
};
