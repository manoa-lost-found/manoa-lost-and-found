'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type PickupNotification = {
  id: number;
  itemId: number;
  title: string;
  status: string;
  updatedAt: string;
  seen: boolean; // NEW
};

export default function Navbar() {
  const { data: session, status } = useSession();
  const loggedIn = status === 'authenticated';
  const pathname = usePathname();

  console.log('SESSION DEBUG', session);

  const role =
    (session?.user as any)?.role ?? (session?.user as any)?.randomKey;
  const isAdmin = role === 'ADMIN';

  console.log('NAVBAR ROLE DEBUG', { role, isAdmin });

  const [pickupNotifications, setPickupNotifications] = useState<PickupNotification[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);

  // Fetch notifications for items marked "waiting for pickup"
  useEffect(() => {
    async function loadNotifications() {
      try {
        setNotifLoading(true);
        const res = await fetch('/api/notifications/pickup');
        if (!res.ok) {
          // eslint-disable-next-line no-console
          console.error('Failed to load notifications');
          return;
        }
        const data = await res.json();
        setPickupNotifications(data.notifications ?? []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setNotifLoading(false);
      }
    }

    if (loggedIn) {
      loadNotifications();
    } else {
      setPickupNotifications([]);
    }
  }, [loggedIn, session]);

  const unreadCount = pickupNotifications.filter((n) => !n.seen).length;

  const handleBellClick = async () => {
    if (pickupNotifications.length === 0) return;

    const itemIds = pickupNotifications.map((n) => n.itemId);

    // Optimistic update: mark as seen locally
    setPickupNotifications((prev) =>
      prev.map((n) => ({ ...n, seen: true })));

    try {
      await fetch('/api/notifications/mark-seen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemIds }),
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      // (optional) roll back if you want, but probably not necessary for this project
    }
  };

  // No nested ternaries: compute header text here
  let notificationHeader = 'Items ready for pickup:';
  if (notifLoading) {
    notificationHeader = 'Checking notifications…';
  } else if (unreadCount === 0) {
    notificationHeader = 'No items ready for pickup yet.';
  }

  const MAIN_LINKS = loggedIn
    ? [
      { href: '/', label: 'Home' },
      { href: '/faq', label: 'FAQ' },
      { href: '/list', label: 'Items Feed' },
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

          {/* Right side: notification bell + account dropdown + Admin */}
          <ul className="navbar-nav align-items-center navbar-nav-right">
            {loggedIn && (
              <li className="nav-item dropdown me-2">
                <button
                  type="button"
                  className="nav-link bg-transparent border-0 p-0 app-bell-button"
                  id="notificationsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleBellClick}
                >
                  <span className="position-relative d-inline-flex">
                    <Image
                      src="/icons/bell-solid.svg"
                      width={22}
                      height={22}
                      alt="Notifications"
                      className="app-bell-icon"
                    />

                    {unreadCount > 0 && (
                      <span className="app-bell-badge">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="notificationsDropdown"
                  style={{ minWidth: '260px' }}
                >
                  <li className="dropdown-header small text-muted">
                    {notificationHeader}
                  </li>

                  {!notifLoading &&
                    pickupNotifications.map((n) => (
                      <li key={n.id}>
                        <Link
                          href={`/item/${n.itemId}`}
                          className="dropdown-item small"
                        >
                          <div className="fw-semibold">{n.title}</div>
                          <div className="text-muted">
                            Status:
                            {' '}
                            {n.status}
                          </div>
                        </Link>
                      </li>
                    ))}

                  {!notifLoading && unreadCount > 0 && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          href="/dashboard"
                          className="dropdown-item small text-center"
                        >
                          View all my items
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            )}

            {!loggedIn ? (
              <li className="nav-item">
                <Link href="/auth/signin" className="btn app-login-btn">
                  Log In
                </Link>
              </li>
            ) : (
              <>
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
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <Link href="/dashboard" className="dropdown-item">
                        My Dashboard
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
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
