export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-5 py-4"
      style={{ backgroundColor: '#f0f7f4', borderTop: '1px solid #dbe8e2' }}
    >
      <div className="container">
        <div className="row align-items-start">
          {/* LEFT COLUMN */}
          <div className="col-md-7 mb-4 mb-md-0">
            <p className="mb-1 fw-bold">
              📦 Manoa Lost &amp; Found
            </p>

            <p className="mb-1">
              University of Hawaiʻi at Mānoa
            </p>

            <p className="mb-3">
              Honolulu, HI 96822
            </p>

            <p className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>
              Helping UH students reconnect with lost items across campus.
              Built as a student project to make it easier to do the right thing
              when something goes missing.
            </p>

            <p className="mb-3 text-muted" style={{ fontSize: '0.9rem' }}>
              For questions or bug reports, please open an issue on GitHub.
            </p>

            {/* Link row */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <a
                href="https://manoa.hawaii.edu/campus-life/safety/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none fw-semibold px-3 py-1 rounded-pill"
                style={{
                  backgroundColor: '#e0f0e6',
                  color: '#0b6623',
                  fontSize: '0.9rem',
                }}
              >
                UH Campus Safety
              </a>

              <a
                href="https://github.com/manoa-lost-found/manoa-lost-and-found"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none fw-semibold px-3 py-1 rounded-pill"
                style={{
                  backgroundColor: '#e6ebf5',
                  color: '#1f2933',
                  fontSize: '0.9rem',
                }}
              >
                GitHub Project
              </a>
            </div>

            <p className="mb-0 small text-muted">
              ©
              {' '}
              {year}
              {' '}
              Manoa Lost &amp; Found
            </p>

            <p className="mb-0 small text-muted">
              Not an official UH service — created for educational use and to
              support the campus community.
            </p>
          </div>

          {/* RIGHT COLUMN — SECURITY SECTION */}
          <div className="col-md-5">
            <div
              className="p-3 p-md-4 rounded-4 h-100"
              style={{
                backgroundColor: '#e8f3ee',
                border: '1px solid #d3e4dd',
              }}
            >
              <p className="fw-bold mb-2">
                Security &amp; Emergency
              </p>

              <p className="small text-muted mb-2">
                In an emergency, always contact official UH or city services
                directly.
              </p>

              <div className="mb-3">
                <p className="mb-1 small text-uppercase text-muted">
                  Honolulu Police Department
                </p>
                <p className="mb-1">
                  Dial
                </p>
                <p className="mb-1">
                  <strong>911</strong>
                </p>
              </div>

              <div className="mb-3">
                <p className="mb-1 small text-uppercase text-muted">
                  UH Department of Public Safety
                </p>
                <p className="mb-1">
                  Dial
                </p>
                <p className="mb-1">
                  <strong>956-6911</strong>
                </p>
              </div>

              <div>
                <p className="mb-1 small text-uppercase text-muted">
                  On-campus call boxes
                </p>
                <p className="mb-1">
                  Use any
                  {' '}
                  <strong>Emergency Call Box</strong>
                  {' '}
                  on campus
                </p>
                <p className="mb-0">
                  to reach a dispatcher if you do not have a phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
