export default function GET() {
  const casLoginUrl =
    "https://authn.hawaii.edu/cas/login?service=" +
    encodeURIComponent(process.env.NEXT_PUBLIC_UH_CALLBACK_URL || "");

  return Response.redirect(casLoginUrl);
}
