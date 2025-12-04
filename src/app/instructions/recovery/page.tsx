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
                  If your item was found and reported, follow these steps to
                  confirm ownership and pick it up from an official UH Mānoa
                  location.
                </p>

                {/* Step 1 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">1. Check your notifications</h2>
                  <p className="landing-copy">
                    When someone finds an item that matches your Lost report, you’ll
                    receive a UH email notification. This message includes the basic
                    item details and the pickup location selected by the finder.
                  </p>
                  <p className="landing-copy">
                    If you haven’t submitted a Lost report yet, create one — it’s the
                    only way to receive notifications.
                  </p>
                </section>

                {/* Step 2 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">2. Confirm the listing matches your item</h2>
                  <p className="landing-copy">
                    Open the item’s listing in the Lost &amp; Found feed. Compare its
                    description to what you lost — colors, brand, case, accessories,
                    or any general identifying features.
                  </p>
                  <p className="landing-copy">
                    Private or sensitive information is never shown publicly for your
                    protection. Final ownership checks happen in person.
                  </p>
                </section>

                {/* Step 3 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">3. Prepare proof of ownership</h2>
                  <p className="landing-copy">
                    Staff will ask questions that confirm the item is yours. Be
                    prepared to describe:
                  </p>
                  <ul>
                    <li>Where and when you last had the item</li>
                    <li>Unique features (scratches, stickers, engravings)</li>
                    <li>Approximate contents (for bags or wallets)</li>
                    <li>Partial serial numbers or identifying marks</li>
                  </ul>
                  <p className="landing-copy">
                    Helpful extra proof includes photos, receipts, or screenshots.
                    Your UH email must match the one used on your Lost report.
                  </p>
                </section>

                {/* Step 4 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">4. Visit the correct pickup location</h2>
                  <p className="landing-copy">
                    Items must be picked up at the exact location chosen by the
                    person who found them. This location is shown on the listing and
                    in your notification.
                  </p>
                  <p className="landing-copy">
                    Bring your photo ID. Only the owner may pick up the item — staff
                    cannot release items to anyone else.
                  </p>
                </section>

                {/* Step 5 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">5. If your item isn’t listed</h2>
                  <p className="landing-copy">
                    If you don’t see your item in the feed, submit a Lost report with
                    a detailed description, last known location, and optional photo.
                    Staff update the system as items are found or turned in.
                  </p>
                </section>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN — Official Pickup Locations */}
          <Col lg={6}>
            <Card className="landing-card h-100 rounded-4">
              <Card.Body className="p-4 text-center">

                <h2 className="landing-bottom-title mb-1 text-center-override">
                  Pickup Locations
                </h2>

                <p className="mb-4 text-center-override">
                  Items can be recovered only from official UH Mānoa locations.
                </p>

                <div className="d-flex flex-column align-items-center">

                  {/* Campus Center */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Campus Center (Information Desk)</h3>
                      <p className="landing-copy mb-1">Mon–Fri • 8:00am–6:00pm</p>
                      <p className="landing-copy mb-3">(808) 956-8178</p>
                      <a
                        href="https://manoa.hawaii.edu/campuscenter/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Hamilton Library */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Hamilton Library (Front Desk)</h3>
                      <p className="landing-copy mb-1">Mon–Sat • 9:00am–5:00pm</p>
                      <p className="landing-copy mb-3">(808) 956-7204</p>
                      <a
                        href="https://manoa.hawaii.edu/library/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Sinclair Library */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Sinclair Library (Service Desk)</h3>
                      <p className="landing-copy mb-1">Mon–Fri • 8:00am–5:00pm</p>
                      <p className="landing-copy mb-3">(808) 956-8308</p>
                      <a
                        href="https://manoa.hawaii.edu/library/about/contact/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Hemenway Hall */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Hemenway Hall (Student Services)</h3>
                      <p className="landing-copy mb-1">Mon–Fri • 8:30am–4:30pm</p>
                      <p className="landing-copy mb-3">(808) 956-7366</p>
                      <a
                        href="https://manoa.hawaii.edu/hemway/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Bilger Hall */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Bilger Hall (Department Office)</h3>
                      <p className="landing-copy mb-1">Mon–Fri • 8:00am–4:00pm</p>
                      <p className="landing-copy mb-3">(808) 956-7480</p>
                      <a
                        href="https://manoa.hawaii.edu/chem/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-cta-btn"
                      >
                        View on map
                      </a>
                    </Card.Body>
                  </Card>

                  {/* Art Building */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Art Building (Main Office)</h3>
                      <p className="landing-copy mb-1">Mon–Fri • 8:00am–4:00pm</p>
                      <p className="landing-copy mb-3">(808) 956-8251</p>
                      <a
                        href="https://hawaii.edu/art/"
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
