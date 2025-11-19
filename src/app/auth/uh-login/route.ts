import { NextResponse } from 'next/server';

export function GET() {
  const serviceUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`);
  const casUrl = `https://authn.hawaii.edu/cas/login?service=${serviceUrl}`;

  return NextResponse.redirect(casUrl);
}
