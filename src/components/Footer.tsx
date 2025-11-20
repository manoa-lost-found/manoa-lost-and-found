export default function Footer() {
  return (
    <footer className="mt-5 py-4" style={{ backgroundColor: '#f0f7f4' }}>
      <div className="container">

        <div className="row">

          {/* LEFT COLUMN */}
          <div className="col-md-6">
            <p className="mb-1 fw-bold">Manoa Lost &amp; Found</p>
            <p className="mb-1">University of Hawaiʻi at Mānoa</p>
            <p className="mb-3">Honolulu, HI 96822</p>

            <p className="mb-2">
              Helping UH students reconnect with lost items across campus.
              <br />
              For questions or bug reports, please open an issue on GitHub.
            </p>

            <p className="mt-3 mb-2">
              <a
                href="https://manoa.hawaii.edu/campus-life/safety/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none fw-semibold"
                style={{ color: '#0b6623' }}
              >
                UH Campus Safety
              </a>
            </p>

            <a
              href="https://github.com/manoa-lost-found/manoa-lost-and-found"
              target="_blank"
              rel="noopener noreferrer"
              className="fw-bold text-decoration-none"
            >
              GitHub Page
            </a>

            <p className="mt-2 mb-0">© 2025 Manoa Lost &amp; Found</p>
            <p className="mb-0">Not an official UH service — for educational use.</p>
          </div>

          {/* RIGHT COLUMN — SECURITY SECTION */}
          <div className="col-md-6">
            <p className="fw-bold mb-2">Security &amp; Emergency</p>

            <p className="mb-1">Dial</p>
            <p className="mb-1">
              <strong>911</strong>
            </p>
            <p className="mb-2">For the Honolulu Police Department</p>

            <p className="mb-1">Dial</p>
            <p className="mb-1">
              <strong>956-6911</strong>
            </p>
            <p className="mb-2">For UH Department of Public Safety</p>

            <p className="mb-1">Use any on-campus</p>
            <p className="mb-1">
              <strong>Emergency Call Box</strong>
            </p>
            <p className="mb-0">To reach a dispatcher</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
