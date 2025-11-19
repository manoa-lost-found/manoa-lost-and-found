import { NextResponse } from 'next/server';

function handler() {
  const serviceUrl = encodeURIComponent('https://manoa-lost-and-found.vercel.app/auth/callback');

  const redirectUrl = `https://authn.hawaii.edu/cas/login?service=${serviceUrl}`;

  return NextResponse.redirect(redirectUrl);
}

export default handler;
