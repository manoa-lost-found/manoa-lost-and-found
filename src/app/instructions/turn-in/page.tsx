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
                <h1 className="landing-title mb-3">
                  How to Turn In a Found Item
                </h1>

                <p className="landing-subtitle mb-4">
                  Thank you for helping reunite items with their owners. Follow
                  these steps to report the item and turn it in to an official
                  UH Mānoa location.
                </p>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">
                    1. Keep the item safe
                  </h2>
                  <p className="landing-copy">
                    Keep the found item in the same condition you discovered it.
                    Avoid using it, opening personal containers, or accessing
                    private information on devices such as phones, laptops, or
                    wallets. Treat it as if it were your own valuable item until
                    you are able to turn it in.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">
                    2. Create a &quot;Report Found&quot; post
                  </h2>
                  <p className="landing-copy">
                    Sign in with your UH email and go to the Report Found page
                    to create a post for the item. Include a clear description
                    and where and when you found it so the owner can recognize
                    it.
                  </p>
                  <p className="landing-copy">
                    Do not share sensitive details such as full ID numbers,
                    credit or debit card numbers, full barcodes, or serial
                    numbers in the public description. If you upload a photo,
                    make sure it does not reveal private information. You can
                    cover or crop out sensitive parts of the item.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">
                    3. Select an official drop-off location
                  </h2>
                  <p className="landing-copy">
                    While creating the Report Found post, select one of the
                    official UH Mānoa pickup and drop-off locations from the
                    list. Choose a place that you can actually visit, such as
                    Campus Center, Hamilton Library, or another listed office.
                  </p>
                  <p className="landing-copy">
                    The location you select is where the owner will be told to
                    go to recover the item, so be sure it matches where you plan
                    to turn it in.
                  </p>
                </section>

                <section className="mb-3">
                  <h2 className="landing-left-eyebrow">
                    4. Bring the item to the chosen location
                  </h2>
                  <p className="landing-copy">
                    Take the item to the drop-off site you selected in your
                    post. Go to the front desk or service counter and let staff
                    know you are turning in a lost and found item that you
                    reported online through the Manoa Lost and Found site.
                  </p>
                  <p className="landing-copy">
                    Staff will store the item securely and may record basic
                    details. After that, the owner will follow the recovery
                    instructions on the site to claim it. Once you hand the item
                    off to an authorized desk, your part is complete.
                  </p>
                </section>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN - Locations & Offices */}
          <Col lg={6}>
            <Card className="landing-card h-100 rounded-4">
              <Card.Body className="p-4 text-center">
                <h2 className="landing-bottom-title mb-1 text-center-override">
                  Locations &amp; Offices
                </h2>
                <p className="mb-4 text-center-override">
                  Official UH Mānoa lost and found drop-off and pickup sites
                </p>

                <div className="d-flex flex-column align-items-center">

                  {/* Campus Center */}
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">
                        Campus Center (Information Desk)
                      </h3>
                      <p className="landing-copy text-center mb-1">
                        Mon–Fri 8:00am–6:00pm
                      </p>
                      <p className="landing-copy text-center mb-3">
                        (808) 956-8178
                      </p>
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
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">
                        Hamilton Library (Front Desk)
                      </h3>
                      <p className="landing-copy text-center mb-1">
                        Mon–Sat 9:00am–5:00pm
                      </p>
                      <p className="landing-copy text-center mb-3">
                        (808) 956-7204
                      </p>
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
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">
                        Sinclair Library (Service Desk)
                      </h3>
                      <p className="landing-copy text-center mb-1">
                        Hours may vary by semester
                      </p>
                      <p className="landing-copy text-center mb-3">
                        (808) 956-2586
                      </p>
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
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">
                        Hemenway Hall (Student Services)
                      </h3>
                      <p className="landing-copy text-center mb-1">
                        Mon–Fri 8:00am–4:30pm
                      </p>
                      <p className="landing-copy text-center mb-3">
                        (808) 956-4642
                      </p>
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
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">
                        Bilger Hall (Department Office)
                      </h3>
                      <p className="landing-copy text-center mb-1">
                        Mon–Fri 8:00am–4:00pm
                      </p>
                      <p className="landing-copy text-center mb-3">
                        (808) 956-7480
                      </p>
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
                  <Card className="landing-card-sm mb-3" style={{ width: '100%' }}>
                    <Card.Body className="text-center p-3">
                      <h3 className="fw-semibold mb-2">
                        Art Building (Main Office)
                      </h3>
                      <p className="landing-copy text-center mb-1">
                        Mon–Fri 9:00am–4:00pm
                      </p>
                      <p className="landing-copy text-center mb-3">
                        (808) 956-8251
                      </p>
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
