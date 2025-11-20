export default function Footer() {
  return (
    <footer className="mt-5 py-4" style={{ backgroundColor: '#f0f7f4' }}>
      <div className="container">
        <p className="mb-1 fw-bold">Manoa Lost &amp; Found</p>
        <p className="mb-1">University of Hawaiʻi at Mānoa</p>
        <p className="mb-3">Honolulu, HI 96822</p>

        <p className="mb-2">
          Helping UH students reconnect with lost items across campus.
          <br />
          For questions or bug reports, please open an issue on GitHub.
        </p>

        <p className="mb-1">© 2025 Manoa Lost &amp; Found</p>
        <p className="mb-3">Not an official UH service — for educational use.</p>

        <a
          href="https://github.com/manoa-lost-found/manoa-lost-and-found"
          target="_blank"
          rel="noopener noreferrer"
          className="fw-bold text-decoration-none"
        >
          GitHub Page
        </a>
      </div>
    </footer>
  );
}
