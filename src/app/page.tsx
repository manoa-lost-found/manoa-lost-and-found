// src/app/page.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="landing-main">
      <section className="landing-hero container">
        <div className="row landing-hero-row g-4">
          <div className="col-lg-6">
            <div className="landing-collage">
              <div className="landing-collage-left">
                <div className="landing-card landing-card-lg">
                  <Image
                    src="/campusmap.jpg"
                    alt="UH Manoa Campus Map"
                    fill
                    className="landing-img"
                  />
                </div>

                <div className="landing-card landing-card-banner" />
              </div>

              <div className="landing-collage-right">
                <div className="landing-card landing-card-sm">
                  <Image
                    src="/uhcampus1.jpg"
                    alt="Campus Center"
                    fill
                    className="landing-img"
                  />
                </div>
                <div className="landing-card landing-card-sm">
                  <Image
                    src="/uhcampus2.jpg"
                    alt="Girls sitting in front of Hawaii Hall"
                    fill
                    className="landing-img"
                  />
                </div>
                <div className="landing-card landing-card-sm">
                  <Image
                    src="/uhcampus4.jpg"
                    alt="Hamilton Library Interior"
                    fill
                    className="landing-img"
                  />
                </div>
                <div className="landing-card landing-card-sm">
                  <Image
                    src="/uhcampus3.jpg"
                    alt="Hamilton Library"
                    fill
                    className="landing-img"
                  />
                </div>
              </div>
            </div>

            <div className="landing-left-copy mt-4">
              <p className="landing-left-eyebrow">SNAPSHOTS FROM CAMPUS</p>
              <p className="landing-left-subtitle">
                Places around UH Manoa where lost IDs, water bottles, and laptops
                are found every day. Manoa Lost &amp; Found brings all of these
                spots into one simple, searchable feed.
              </p>
            </div>
          </div>

          <div className="col-lg-5 offset-lg-1">
            <div className="landing-hero-image-lg mb-4">
              <Image
                src="/feed.png"
                alt="Lost and found feed showing items"
                fill
                className="landing-img"
              />
            </div>

            <div className="landing-copy text-center text-lg-start">
              <p className="landing-eyebrow">WELCOME TO MANOA LOST &amp; FOUND</p>
              <h1 className="landing-title">
                Find it. Report it.
                <br />
                Reunite it.
              </h1>
              <p className="landing-subtitle">
                A simple way for UH Manoa students to report lost items, browse
                found items, and reconnect belongings with their owners.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start mt-3">
                <Link href="/auth/signin" className="btn landing-cta-btn">
                  Login with UH SSO
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="landing-bottom">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <p className="landing-eyebrow mb-2">MAKE CAMPUS A LITTLE SMALLER</p>
              <h2 className="landing-bottom-title">
                Explore. Connect. Return what&apos;s lost.
              </h2>
              <p className="landing-bottom-subtitle">
                Search the campus-wide feed, post what you&apos;ve found, or quickly
                create a report for something you&apos;ve lost. Manoa Lost &amp; Found
                keeps everything in one place so items can find their way home.
              </p>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="landing-bottom-image">
                <Image
                  src="/feed.png"
                  alt="Feed showing lost and found items"
                  fill
                  className="landing-img"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
