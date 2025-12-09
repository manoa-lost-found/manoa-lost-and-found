'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';

export default function RecoveryInstructionsPage() {
  return (
    <main className="landing-main">
      <Container>
        <Row className="g-4">
          {/* LEFT COLUMN — Recovery Steps */}
          <Col lg={6}>
            <Card className="landing-card h-100 rounded-4">
              <Card.Body className="p-4">

                <h1 className="landing-title mb-3">How to Recover a Lost Item</h1>

                <p className="landing-subtitle mb-4">
                  If your item was found, follow these steps to confirm ownership
                  and pick it up from an official UH Mānoa location.
                </p>

                {/* Steps */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">1. Check your notifications</h2>
                  <p className="landing-copy">
                    If someone finds an item matching your Lost report, you’ll receive a UH email.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">2. Confirm the listing matches your item</h2>
                  <p className="landing-copy">
                    Compare the item description — colors, brand, accessories, markings.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">3. Prepare proof of ownership</h2>
                  <ul>
                    <li>Where and when you last had the item</li>
                    <li>Unique features (scratches, stickers, engravings)</li>
                    <li>Contents (for bags/wallets)</li>
                    <li>Serial numbers or identifying marks</li>
                  </ul>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">4. Visit the correct pickup location</h2>
                  <p className="landing-copy">Bring a photo ID.</p>
                </section>

                <section>
                  <h2 className="landing-left-eyebrow">5. If your item isn’t listed</h2>
                  <p className="landing-copy">Submit a Lost report.</p>
                </section>

              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN — Locations */}
          <Col lg={6}>
            <Card className="landing-card h-100 rounded-4">
              <Card.Body className="p-4 text-center">

                <h2 className="landing-bottom-title mb-1 text-center-override">
                  Pickup Locations
                </h2>

                <p className="mb-4 text-center-override">
                  Items can only be picked up from official UH Mānoa locations.
                </p>

                <div className="d-flex flex-column align-items-center">

                  {/* Campus Center */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Campus Center (Information Desk)</h3>
                      <p className="landing-copy text-center mb-1">Mon–Fri • 8:00am–6:00pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-8178</p>
                      <a
                        href="https://map.hawaii.edu/manoa/?bld=CC"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Hamilton Library */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Hamilton Library (Front Desk)</h3>
                      <p className="landing-copy text-center mb-1">Mon–Sat • 9:00am–5:00pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-7204</p>
                      <a
                        href="https://map.hawaii.edu/manoa/?bld=HL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Sinclair Library */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Sinclair Library (Service Desk)</h3>
                      <p className="landing-copy text-center mb-1">Mon–Fri • 8:00am–5:00pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-8308</p>
                      <a
                        href="https://map.hawaii.edu/manoa/?bld=SINCLAIR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Hemenway Hall */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Hemenway Hall (Student Services)</h3>
                      <p className="landing-copy text-center mb-1">Mon–Fri • 8:30am–4:30pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-7366</p>
                      <a
                        href="https://map.hawaii.edu/manoa/?bld=HEM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Bilger Hall */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Bilger Hall (Department Office)</h3>
                      <p className="landing-copy text-center mb-1">Mon–Fri • 8:00am–4:00pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-7480</p>
                      <a
                        href="https://map.hawaii.edu/manoa/?bld=BIL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Art Building */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Art Building (Main Office)</h3>
                      <p className="landing-copy text-center mb-1">Mon–Fri • 8:00am–4:00pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-8251</p>
                      <a
                        href="https://map.hawaii.edu/manoa/?bld=ART"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
