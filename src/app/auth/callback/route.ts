export default async function GET(request: Request) {
  const url = new URL(request.url);
  const ticket = url.searchParams.get("ticket");

  if (!ticket) {
    return Response.redirect("/auth/error");
  }

  const casValidateUrl =
    "https://authn.hawaii.edu/cas/serviceValidate?service=" +
    encodeURIComponent(process.env.NEXT_PUBLIC_UH_CALLBACK_URL || "") +
    "&ticket=" +
    ticket;

  const casResponse = await fetch(casValidateUrl).then((res) => res.text());

  const usernameMatch = casResponse.match(/<cas:user>(.*)<\/cas:user>/);

  if (!usernameMatch) {
    return Response.redirect("/auth/error");
  }

  const username = usernameMatch[1];

  // Set login cookie
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/list",
      "Set-Cookie": `uh_user=${username}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
