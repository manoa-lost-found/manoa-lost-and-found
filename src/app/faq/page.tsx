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

              {/* Cute highlight box */}
              <div
                className="p-3 rounded-3"
                style={{
                  background: '#eef7f1',
                  border: '1px solid #d8eadf',
                }}
              >
                <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
                  📢{' '}
                  <strong>Tip:</strong>
                  {' '}
                  The quickest way to reunite items is by giving clear
                  descriptions and checking the feed often.
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
                  chances of a match. 💡
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
                  owner knows exactly where to go. Please only choose locations
                  you are actually able to reach. You&apos;re doing someone a huge
                  favor by listing it. 🙌
                </p>
              </div>
            </div>
          </div>

          {/* Q3 – Lost & Found Feed (no hyperlink) */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2">
                  📋 Where can I see all reported items?
                </h2>
                <p className="text-muted mb-2">
                  Visit the
                  {' '}
                  <span className="fw-semibold">
                    Lost &amp; Found Feed
                  </span>
                  {' '}
                  (available only to logged-in users) to browse campus-wide reports.
                </p>
                <p className="text-muted mb-0">
                  You can filter by category, building, item type (lost or found),
                  and sort by newest or oldest reports to narrow things down. It&apos;s
                  the main hub for everything that&apos;s been reported. 🔁
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
                  Yes. You must sign in with a University of Hawaiʻi email
                  address to create or manage lost and found posts. This helps
                  keep the system limited to the UH community, reduces spam, and
                  makes it easier to contact item owners safely.
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
                  page for details on turning in a lost item.
                </p>
                <p className="text-muted mb-0">
                  There are select places to turn in lost items on campus.
                  Follow the steps on that page to make sure the item is turned
                  in properly and has the best chance of being reunited with its
                  owner. 🏁
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
                  page for step-by-step guidance when your item is found.
                </p>
                <p className="text-muted mb-0">
                  Once an item matching your lost report is found and posted, you
                  will receive a notification. Follow the recovery instructions to
                  safely retrieve your item from the designated location. Be
                  prepared to verify ownership when requested. 🔐
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
                  For wallets, IDs, keys, electronics, or anything that looks
                  suspicious, turn it in to an official UH office or the
                  Department of Public Safety. When in doubt, let DPS handle it. 🚔
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
                  inappropriate, unsafe, or unrelated to UH Mānoa. If you think a
                  post needs review, reach out with the details. 📩
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
                  No. This site is student-built and not an official UH service.
                  For official policies or emergency info, always refer to UH
                  Mānoa or DPS. 📘
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
                  If your question isn&apos;t answered here, sign in and contact an
                  admin or talk with your project lead/instructor. For emergencies,
                  call UH Department of Public Safety immediately. ❤️
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
