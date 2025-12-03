// @ts-nocheck
import Link from "next/link";

export default function FAQPage() {
  return (
    <main
      style={{
        background: "linear-gradient(135deg, #f4faf7, #e7f2ec)",
        minHeight: "calc(100vh - 64px)",
        padding: "3rem 0 4rem",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">Frequently Asked Questions</h1>
          <p className="text-muted lead">
            Everything you need to know about using the Manoa Lost &amp; Found system.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">How do I report a lost item?</h3>
                <p className="mb-0">
                  Use the <Link href="/report/lost">Report Lost</Link> page to submit
                  details about your missing item. Include a clear description, where it was
                  last seen, and the date you lost it.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">How do I report a found item?</h3>
                <p className="mb-0">
                  Use the <Link href="/report/found">Report Found</Link> page to list an
                  item you discovered. You will be required to select an official turn-in
                  location so the rightful owner knows where to pick it up.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Where can I view all lost &amp; found items?</h3>
                <p className="mb-0">
                  Visit the <Link href="/list">Items Feed</Link> to browse campus-wide
                  reports. You can filter by category, building, item type, and date.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Do I need a UH email to sign up?</h3>
                <p className="mb-0">
                  Yes. A valid @hawaii.edu address is required to create an account. This
                  ensures authenticity and helps prevent misuse.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">
                  Why do I have to choose a pickup/turn-in location for found items?
                </h3>
                <p className="mb-0">
                  To reunite owners with their belongings efficiently, every found item must
                  be turned in to an official pickup point. This ensures safety, consistency,
                  and prevents items from getting lost again.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Why does the feed show Fall/Spring terms?</h3>
                <p className="mb-0">
                  The site automatically assigns each item to the correct UH academic term
                  based on the reported date. This helps organize older posts and improves
                  searching for items over time.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">What if I don't see my item in the feed?</h3>
                <p className="mb-0">
                  Try adjusting your filters or searching under both “Lost” and “Found.”
                  New items appear as soon as they are submitted, so check back often.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Can I edit or delete a post?</h3>
                <p className="mb-0">
                  Posts cannot be edited after submission, but you may delete your own posts
                  at any time. Administrators can also remove posts that violate guidelines.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">
                  Is my UH email or identity shown publicly?
                </h3>
                <p className="mb-0">
                  No. Only item details are publicly visible. Your UH email is kept private
                  for verification and ownership confirmation.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 rounded-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Still need help?</h3>
                <p className="mb-0">
                  If you still have questions, sign in and use your account support options
                  or contact the site administrator directly.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div style={{ height: "3rem" }} />
      </div>
    </main>
  );
}

