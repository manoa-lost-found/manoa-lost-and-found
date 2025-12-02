'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const loggedIn = status === 'authenticated';
  const pathname = usePathname();

  // Role comes from authOptions: randomKey = user.role
  const role = (session?.user as any)?.randomKey;
  const isAdmin = role === 'ADMIN';

  const MAIN_LINKS = loggedIn
    ? [
      { href: '/', label: 'Home' },
      { href: '/faq', label: 'FAQ' },
      { href: '/list', label: 'Items Feed' },
      // My Dashboard removed from here; now lives in dropdown
      { href: '/report/lost', label: 'Report Lost' },
      { href: '/report/found', label: 'Report Found' },
    ]
    : [
      { href: '/', label: 'Home' },
      { href: '/faq', label: 'FAQ' },
    ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        {/* Brand */}
        <Link href="/" className="navbar-brand d-flex align-items-center app-brand">
          <Image src="/uh-logo.png" alt="UH Logo" width={36} height={36} />
          <span className="ms-2 fw-semibold">Manoa Lost &amp; Found</span>
        </Link>

        {/* Mobile toggler */}
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
          {/* Left side links */}
          <ul className="navbar-nav app-nav-links">
            {MAIN_LINKS.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link app-nav-link ${
                    isActive(link.href) ? 'app-nav-link-active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: account dropdown (+ Admin button if admin) */}
          <ul className="navbar-nav align-items-center navbar-nav-right">
            {!loggedIn ? (
              <li className="nav-item">
                <Link href="/auth/signin" className="btn app-login-btn">
                  Log In
                </Link>
              </li>
            ) : (
              <>
                {/* Account dropdown */}
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
                    {/* My Dashboard inside dropdown */}
                    <li>
                      <Link href="/dashboard" className="dropdown-item">
                        My Dashboard
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
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

                {/* Admin button to the RIGHT of the email dropdown */}
                {isAdmin && (
                  <li className="nav-item ms-2">
                    <Link href="/admin" className="btn btn-outline-secondary btn-sm">
                      Admin
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
