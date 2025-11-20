'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const MAIN_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const loggedIn = status === 'authenticated';
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">

        <Link href="/" className="navbar-brand d-flex align-items-center app-brand">
          <Image src="/uh-logo.png" alt="UH Logo" width={36} height={36} />
          <span className="ms-2 fw-semibold">Manoa Lost &amp; Found</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#appNavbar"
          aria-controls="appNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="appNavbar">
          <ul className="navbar-nav mx-auto app-nav-links">
            {MAIN_LINKS.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link
                  href={link.href}
                  className={
                    'nav-link app-nav-link ' +
                    (isActive(link.href) ? 'app-nav-link-active' : '')
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav ms-lg-3 align-items-center">
            {!loggedIn ? (
              <li className="nav-item">
                <Link href="/auth/signin" className="btn app-login-btn">
                  Log In
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="nav-link app-account-btn dropdown-toggle border-0 bg-transparent"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {session?.user?.email ?? 'Account'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}