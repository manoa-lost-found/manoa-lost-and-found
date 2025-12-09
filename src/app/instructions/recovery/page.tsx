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
                  If your item was found and reported, follow these steps to confirm ownership
                  and pick it up from an official UH Mānoa location.
                </p>

                {/* Step 1 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">1. Check your notifications</h2>
                  <p className="landing-copy">
                    When someone finds an item that matches your Lost report, you’ll receive a UH email.
                  </p>
                  <p className="landing-copy">
                    If you haven’t submitted a Lost report yet, create one — it’s the only way to receive notifications.
                  </p>
                </section>

                {/* Step 2 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">2. Confirm the listing matches your item</h2>
                  <p className="landing-copy">
                    Compare the listing’s description to what you lost — colors, brand, case, accessories,
                    or any identifying features.
                  </p>
                </section>

                {/* Step 3 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">3. Prepare proof of ownership</h2>
                  <p className="landing-copy">Staff may ask you to describe:</p>
                  <ul>
                    <li>Where and when you last had the item</li>
                    <li>Unique features (scratches, stickers, engravings)</li>
                    <li>Approximate contents (for bags or wallets)</li>
                    <li>Partial serial numbers or identifying marks</li>
                  </ul>
                </section>

                {/* Step 4 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">4. Visit the correct pickup location</h2>
                  <p className="landing-copy">
                    Bring your photo ID. Items must be picked up at the exact location listed.
                  </p>
                </section>

                {/* Step 5 */}
                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">5. If your item isn’t listed</h2>
                  <p className="landing-copy">
                    Submit a Lost report with a detailed description.
                  </p>
                </section>

              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN — Pickup Locations */}
          <Col lg={6}>
            <Card className="landing-card h-100 rounded-4">
              <Card.Body className="p-4 text-center">

                <h2 className="landing-bottom-title mb-1 text-center-override">
                  Pickup Locations
                </h2>
                <p className="mb-4 text-center-override">Official UH Mānoa locations.</p>

                <div className="d-flex flex-column align-items-center">

                  {/* Campus Center */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Campus Center (Information Desk)</h3>
                      <p className="landing-copy mb-1 text-center">Mon–Fri • 8:00am–6:00pm</p>
                      <p className="landing-copy mb-3 text-center">(808) 956-8178</p>
                      <button
                        className="landing-cta-btn"
                        onClick={() => {
                          document.getElementById('uhmap')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        View on map
                      </button>
                    </Card.Body>
                  </Card>

                  {/* Hamilton Library */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Hamilton Library (Front Desk)</h3>
                      <p className="landing-copy mb-1 text-center">Mon–Sat • 9:00am–5:00pm</p>
                      <p className="landing-copy mb-3 text-center">(808) 956-7204</p>
                      <button
                        className="landing-cta-btn"
                        onClick={() => {
                          document.getElementById('uhmap')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        View on map
                      </button>
                    </Card.Body>
                  </Card>

                  {/* Sinclair Library */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Sinclair Library (Service Desk)</h3>
                      <p className="landing-copy mb-1 text-center">Mon–Fri • 8:00am–5:00pm</p>
                      <p className="landing-copy mb-3 text-center">(808) 956-8308</p>
                      <button
                        className="landing-cta-btn"
                        onClick={() => {
                          document.getElementById('uhmap')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        View on map
                      </button>
                    </Card.Body>
                  </Card>

                  {/* Hemenway Hall */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Hemenway Hall (Student Services)</h3>
                      <p className="landing-copy mb-1 text-center">Mon–Fri • 8:30am–4:30pm</p>
                      <p className="landing-copy mb-3 text-center">(808) 956-7366</p>
                      <button
                        className="landing-cta-btn"
                        onClick={() => {
                          document.getElementById('uhmap')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        View on map
                      </button>
                    </Card.Body>
                  </Card>

                  {/* Bilger Hall */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Bilger Hall (Department Office)</h3>
                      <p className="landing-copy mb-1 text-center">Mon–Fri • 8:00am–4:00pm</p>
                      <p className="landing-copy mb-3 text-center">(808) 956-7480</p>
                      <button
                        className="landing-cta-btn"
                        onClick={() => {
                          document.getElementById('uhmap')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        View on map
                      </button>
                    </Card.Body>
                  </Card>

                  {/* Art Building */}
                  <Card className="landing-card-sm mb-3 w-100">
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Art Building (Main Office)</h3>
                      <p className="landing-copy mb-1 text-center">Mon–Fri • 8:00am–4:00pm</p>
                      <p className="landing-copy mb-3 text-center">(808) 956-8251</p>
                      <button
                        className="landing-cta-btn"
                        onClick={() => {
                          document.getElementById('uhmap')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        View on map
                      </button>
                    </Card.Body>
                  </Card>

                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* EMBEDDED UH MAP */}
        <div id="uhmap" style={{ marginTop: '40px', marginBottom: '60px' }}>
          <h2 className="mb-3 text-center">UH Mānoa Campus Map</h2>
          <iframe
            src="https://map.hawaii.edu/manoa/#"
            style={{
              width: '100%',
              height: '600px',
              border: 0,
              borderRadius: '12px',
            }}
            allowFullScreen
            loading="lazy"
          />
        </div>

      </Container>
    </main>
  );
}
