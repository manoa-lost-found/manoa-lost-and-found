export default function HomePage() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '70vh' }}
    >
      <h1 className="fw-bold text-center">Manoa Lost & Found</h1>
      <p className="text-muted text-center">
        Find and report lost items on the UH Mānoa campus.
      </p>

      <a
        href="https://authn.hawaii.edu/cas/login?service=https://manoa-lost-and-found.vercel.app"
        className="btn btn-success btn-lg mt-3 px-4 py-2"
        style={{ backgroundColor: '#024731', borderColor: '#024731' }}
      >
        Login with UH SSO
      </a>
    </div>
  );
}
