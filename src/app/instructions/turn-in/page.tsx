'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';

export default function TurnInInstructionsPage() {
  return (
    <main className="landing-main">
      <Container>
        <Row className="g-4">
          {/* LEFT COLUMN - Instructions */}
          <Col lg={6}>
            <Card className="landing-card h-100 rounded-4">
              <Card.Body className="p-4">
                <h1 className="landing-title mb-3">How to Turn In a Found Item</h1>

                <p className="landing-subtitle mb-4">
                  Thank you for helping reunite items with their owners. These
                  simple steps will ensure the item is logged and protected.
                </p>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">1. Secure the item</h2>
                  <p className="landing-copy">
                    Keep the found item safe and in the state it was found. If
                    the item contains personal data (for example, a wallet or phone),
                    avoid handling sensitive materials. As soon as possible,
                    hand the item to an authorized staff member.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">2. Go to a selected drop-off area</h2>
                  <p className="landing-copy">
                    After securing the item, take it to one of the selected
                    drop-off areas (Hamilton Library or Campus Center). Check
                    the location hours before you travel, bring the item to
                    the front desk, and hand it to an authorized staff member
                    so they can log it into the system.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">3. Provide details</h2>
                  <p className="landing-copy">
                    When you turn in the item, tell staff where and when you
                    found it and any identifying features (stickers, dents,
                    engraving). If you can, take a quick photo for the record
                    (staff may ask for it to add to the listing). Alternatively,
                    you can provide the post and email address associated with the
                    item if you reported it online.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">4. Hand off to an authorized desk</h2>
                  <p className="landing-copy">
                    Staff will log the item into the Lost &amp; Found system and
                    store it securely at the location where it was turned in.
                    The owner must pick up the item at the same location. Keep
                    any receipt or claim information staff provide.
                  </p>
                </section>

              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN - Locations & Offices */}
          <Col lg={6}>
            <Card className="landing-card h-100 rounded-4">
              <Card.Body className="p-4 text-center">
                <h2 className="landing-bottom-title mb-1 text-center-override">Locations &amp; Offices</h2>
                <p className="mb-4 text-center-override">Official UH drop-off locations</p>

                <div className="d-flex flex-column align-items-center">
                  {/* Campus Center Box */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Campus Center</h3>
                      <p className="landing-copy text-center mb-1">Mon–Fri 8:00am–6:00pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-8178</p>
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

                  {/* Hamilton Library Box */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">Hamilton Library</h3>
                      <p className="landing-copy text-center mb-1">Mon–Sat 9:00am–5:00pm</p>
                      <p className="landing-copy text-center mb-3">(808) 956-7204</p>
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
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
