export default function RecoveryInstructionsPage() {
  return (
    <main className="container mt-4">
      <h1 className="fw-bold">How to Recover an Item</h1>

      <p className="lead text-muted">
        Follow these steps to recover an item reported in the Lost &amp; Found
        system.
      </p>

      <section className="mt-4">
        <h2 className="h5">1. Search the Lost &amp; Found feed</h2>
        <p>
          Check the campus-wide feed for your item. Use the filters for
          category, building, and term to narrow results. If you find a
          matching listing, note the pickup location and any identifying
          details before contacting staff.
        </p>
      </section>

      <section className="mt-3">
        <h2 className="h5">2. Prepare proof of ownership</h2>
        <p>
          You must verify ownership. Staff will ask security questions about
          details in the lost-item post. Acceptable additional proof includes
          receipts, item serial numbers, initials or a name on the item, or
          photos showing distinguishing marks. Your email address must match
          the one used to report the lost item.
        </p>
      </section>

      <section className="mt-3">
        <h2 className="h5">3. Visit the pickup location</h2>
        <p>
          Items are held at either Hamilton Library or Campus Center. Bring
          your photo ID and proof of ownership. Only the owner of the item
          may recover it — friends or family members cannot claim items on
          your behalf.
        </p>
      </section>

      <section className="mt-3">
        <h2 className="h5">4. If you do not see your item</h2>
        <p>
          If the feed does not show a match, create a new Lost report using
          the Report Lost form. Provide a detailed description, the date and
          location where you last had the item, and an optional photo. Staff
          will update the feed when items are turned in.
        </p>
      </section>

      <section className="mt-3">
        <h2 className="h5">5. Pickup locations</h2>
        <p>
          Hamilton Library and Campus Center are the only two locations where
          items are held for pickup. If an item was turned in at one of these
          locations, you must pick it up at that same location. Check the item
          listing to see where it is held.
        </p>
      </section>

      <hr />

      <p className="small landing-copy">
        Note: Items held at Hamilton Library or Campus Center are
        protected by security questions and email verification. Please
        follow staff instructions.
      </p>
    </main>
  );
}
