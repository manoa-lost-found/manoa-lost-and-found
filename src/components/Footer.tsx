export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-5 py-4"
      style={{
        background: "linear-gradient(135deg, #f4faf7, #e7f2ec)",
        borderTop: "1px solid #d5e6dd",
      }}
    >
      <div className="container">
        <div className="row gy-4 align-items-start">

          {/* LEFT COLUMN */}
          <div className="col-md-7">
            <p className="mb-1 fw-bold" style={{ color: "#0b6623" }}>
              Manoa Lost &amp; Found
            </p>
            <p className="mb-1">University of Hawaiʻi at Mānoa</p>
            <p className="mb-3">Honolulu, HI 96822</p>

            <p className="mb-2 text-muted">
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
                style={{ color: "#0b6623" }}
              >
                UH Campus Safety
              </a>
            </p>

            <p className="mb-2">
              <a
                href="https://github.com/manoa-lost-found/manoa-lost-and-found"
                target="_blank"
                rel="noopener noreferrer"
                className="fw-bold text-decoration-none"
              >
                GitHub Page
              </a>
            </p>

            <p className="mt-2 mb-0 small text-muted">
              © {year} Manoa Lost &amp; Found
            </p>
            <p className="mb-0 small text-muted">
              Not an official UH service — for educational use.
            </p>
          </div>

          {/* RIGHT COLUMN — SECURITY SECTION */}
          <div className="col-md-5 text-md-end">
            <p className="fw-bold mb-2">Security &amp; Emergency</p>

            <ul className="list-unstyled mb-2 small">
              <li className="mb-1 text-muted">Dial</li>
              <li className="mb-1">
                <strong>911</strong>
              </li>
              <li className="mb-3 text-muted">
                For the Honolulu Police Department
              </li>

              <li className="mb-1 text-muted">Dial</li>
              <li className="mb-1">
                <strong>956-6911</strong>
              </li>
              <li className="mb-3 text-muted">
                For UH Department of Public Safety
              </li>

              <li className="mb-1 text-muted">Use any on-campus</li>
              <li className="mb-1">
                <strong>Emergency Call Box</strong>
              </li>
              <li className="mb-0 text-muted">To reach a dispatcher</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
