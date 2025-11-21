// @ts-nocheck
import Link from 'next/link';

export default function FAQPage() {
  return (
    <main className="container py-5">
      <h1 className="mb-3">FAQ</h1>

      <p className="lead">Answers to common questions about Manoa Lost &amp; Found.</p>

      <section className="mt-4">
        <h2>How do I report a lost item?</h2>
        <p>
          Use the
          {' '}
          <Link href="/report/lost">
            Report Lost
          </Link>
          {' '}
          page to submit details about the item you&apos;ve lost. Include a clear description, date,
          and location if possible.
        </p>
      </section>

      <section className="mt-4">
        <h2>How do I report a found item?</h2>
        <p>
          Use the
          {' '}
          <Link href="/report/found">
            Report Found
          </Link>
          {' '}
          page to share information about an item you&apos;ve found so others can reclaim it.
        </p>
      </section>

      <section className="mt-4">
        <h2>Do I need a UH email to sign up?</h2>
        <p>
          Yes — this site requires a University of Hawaii email address to create an account. If you
          believe you need an exception, contact the site administrator.
        </p>
      </section>

      <section className="mt-4">
        <h2>Where can I see listed items?</h2>
        <p>
          Visit the
          {' '}
          <Link href="/list">
            Items Feed
          </Link>
          {' '}
          to browse reported lost and found items.
        </p>
      </section>

      <section className="mt-4">
        <h2>Still need help?</h2>
        <p>
          If your question isn&apos;t answered here, please sign in and use the contact options available on
          your account page or email the site administrator.
        </p>
      </section>
    </main>
  );
}
