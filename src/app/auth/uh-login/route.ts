export default function GET() {
  const loginUrl = `https://authn.hawaii.edu/cas/login?service=${encodeURIComponent(
    process.env.NEXT_PUBLIC_UH_CALLBACK_URL || '',
  )}`;

  return Response.redirect(loginUrl);
}
