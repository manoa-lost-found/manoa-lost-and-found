import Link from 'next/link';

export default function FAQPage() {
  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3.5rem 0 4rem',
      }}
    >
      <div className="container">
        {/* Hero / header */}
        <section className="mb-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <p className="text-uppercase text-muted small mb-1">
                Help &amp; Support
              </p>

              <h1 className="h2 fw-bold mb-2">
                Manoa Lost &amp; Found FAQ
              </h1>

              <p className="mb-3 text-muted">
                Lost something on campus? Found something that isn&apos;t yours?
                This page walks you through what to do so items can make their
                way back home. 🌈
              </p>

              {/* Highlight Box */}
              <div
                className="p-3 rounded-3"
                style={{
                  background: '#eef7f1',
                  border: '1px solid #d8eadf',
                }}
              >
                <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
                  📢
                  {' '}
                  <strong>Tip:</strong>
                  {' '}
                  The quickest way to reunite items is by giving clear descriptions
                  and checking the feed often.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ grid */}
        <section className="row g-4">
          {/* Q1 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  🔍 How do I report a lost item?
                </h2>

                <p className="text-muted mb-2">
                  Go to the
                  {' '}
                  <Link
                    href="/report/lost"
                    className="fw-semibold text-decoration-none"
                  >
                    Report Lost
                  </Link>
                  {' '}
                  page to submit details about your missing item.
                </p>

                <p className="text-muted mb-0">
                  Include a clear description, where you last remember seeing it,
                  and the date you lost it. Adding a photo can make it easier for
                  others to recognize. The more detail you give, the better the
                  chances of a match.
                </p>
              </div>
            </div>
          </div>

          {/* Q2 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  📦 How do I report a found item?
                </h2>

                <p className="text-muted mb-2">
                  Use the
                  {' '}
                  <Link
                    href="/report/found"
                    className="fw-semibold text-decoration-none"
                  >
                    Report Found
                  </Link>
                  {' '}
                  page to list an item you discovered.
                </p>

                <p className="text-muted mb-0">
                  You&apos;ll choose an official pickup or turn-in location so the
                  owner knows exactly where to go. Please only choose locations you
                  are actually able to reach. You&apos;re doing someone a huge favor
                  by listing it.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  📋 Where can I see all reported items?
                </h2>

                <p className="text-muted mb-2">
                  Visit the{' '}
                  <Link href="/list" className="fw-semibold text-decoration-none">
                    Items Feed
                  </Link>{' '}
                  (available only to logged-in users) to browse campus-wide reports.
                </p>

                <p className="text-muted mb-0">
                  You can filter by category, building, item type, and sort by
                  newest or oldest reports. It&apos;s the main hub for everything
                  that&apos;s been reported.
                </p>
              </div>
            </div>
          </div>

          {/* Q4 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  🎓 Do I need a UH email to use this site?
                </h2>

                <p className="text-muted mb-0">
                  Yes. You must sign in with a University of Hawaiʻi email to
                  create or manage posts. This keeps the system secure, reduces
                  spam, and ensures only UH community members participate.
                </p>
              </div>
            </div>
          </div>

          {/* Q5 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  🧺 How do I turn in a lost item?
                </h2>

                <p className="text-muted mb-2">
                  View the
                  {' '}
                  <Link
                    href="/instructions/turn-in"
                    className="fw-semibold text-decoration-none"
                  >
                    Turn In Instructions
                  </Link>
                  {' '}
                  page for details.
                </p>

                <p className="text-muted mb-0">
                  Follow the steps to turn in lost items at approved locations.
                  This ensures they can be safely reunited with their owners.
                </p>
              </div>
            </div>
          </div>

          {/* Q6 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  ✅ How do I recover a found item?
                </h2>

                <p className="text-muted mb-2">
                  View the
                  {' '}
                  <Link
                    href="/instructions/recovery"
                    className="fw-semibold text-decoration-none"
                  >
                    Recovery Instructions
                  </Link>
                  {' '}
                  page for step-by-step guidance.
                </p>

                <p className="text-muted mb-0">
                  Once an item matching your report is posted, you&apos;ll receive a
                  notification. Follow instructions and be prepared to verify
                  ownership.
                </p>
              </div>
            </div>
          </div>

          {/* Q7 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  ⚠️ What if the item looks valuable or suspicious?
                </h2>

                <p className="text-muted mb-0">
                  Turn wallets, IDs, keys, electronics, or suspicious items in to
                  an official UH office or DPS. When unsure, let DPS handle it.
                  <br />
                  (UH Department of Public Safety: 956-6911)
                </p>
              </div>
            </div>
          </div>

          {/* Q8 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  🛠️ Who can remove or edit posts?
                </h2>

                <p className="text-muted mb-0">
                  You can delete your own posts. Admins may remove posts that are
                  inappropriate, unsafe, or unrelated to UH Manoa. Contact an
                  admin if you believe something needs review.
                </p>
              </div>
            </div>
          </div>

          {/* Q9 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  🏛️ Is this an official UH service?
                </h2>

                <p className="text-muted mb-0">
                  No. This site is a student project and not an official UH
                  service. For official information, refer to UH Manoa or DPS.
                  <br />
                  (UH Department of Public Safety: 956-6911)
                </p>
              </div>
            </div>
          </div>

          {/* Q10 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  ❓ Still need help?
                </h2>

                <p className="text-muted mb-0">
                  If your question isn&apos;t answered here, sign in to contact an
                  admin or talk with your instructor/project lead. For emergencies,
                  reach out to UH DPS immediately.
                  <br />
                  (UH Department of Public Safety: 956-6911)
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
