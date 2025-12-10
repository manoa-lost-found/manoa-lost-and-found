'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

/* -----------------------------------------------------
   Types
----------------------------------------------------- */
type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

type MyItem = {
  id: number;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  category: string;
  building: string;
  date: string;
  imageUrl?: string | null;
  locationName?: string | null;
};

/* -----------------------------------------------------
   Status Badge
----------------------------------------------------- */
function StatusBadge({ status }: { status: ItemStatus }) {
  const colors: Record<ItemStatus, string> = {
    OPEN: 'badge bg-success',
    TURNED_IN: 'badge bg-warning text-dark',
    WAITING_FOR_PICKUP: 'badge bg-primary',
    RECOVERED: 'badge bg-secondary',
  };

  return <span className={colors[status]}>{status.replace(/_/g, ' ')}</span>;
}

/* -----------------------------------------------------
   Dashboard Item Card
----------------------------------------------------- */
function DashboardCard({ item }: { item: MyItem }) {
  const dateLabel = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-3">
          <div
            style={{
              width: '100%',
              height: '100%',
              minHeight: '110px',
              position: 'relative',
              borderTopLeftRadius: '1rem',
              borderBottomLeftRadius: '1rem',
              overflow: 'hidden',
            }}
          >
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100 bg-light text-muted small">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="h6 fw-bold mb-1">{item.title}</h3>

                <p className="small text-muted mb-1">
                  {item.building}
                  <br />
                  {dateLabel}
                </p>

                <StatusBadge status={item.status} />
              </div>

              <div className="d-flex gap-2">
                <Link href={`/item/${item.id}`} className="btn btn-outline-secondary btn-sm">
                  View
                </Link>

                <Link href={`/item/${item.id}/edit`} className="btn btn-primary btn-sm">
                  Edit
                </Link>
              </div>
            </div>

            {item.locationName && (
              <p className="small text-muted mt-2">
                Pickup Location: {item.locationName}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   MAIN DASHBOARD PAGE
----------------------------------------------------- */
export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [items, setItems] = useState<MyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'lost' | 'found'>('lost');
  const [stats, setStats] = useState({
    posted: 0,
    reunited: 0,
    pending: 0,
  });

  /* Load user items */
  useEffect(() => {
    async function loadItems() {
      const res = await fetch('/api/my-items');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
      }
      setLoading(false);
    }

    async function loadStats() {
      const res = await fetch('/api/user/stats');
      if (res.ok) {
        const data = await res.json();
        setStats({
          posted: data.posted,
          reunited: data.reunited,
          pending: data.pending,
        });
      }
    }

    if (status === 'authenticated') {
      loadItems();
      loadStats();
    }
  }, [status]);

  const lost = items.filter((i) => i.type === 'LOST');
  const found = items.filter((i) => i.type === 'FOUND');

  /* Redirect if not authenticated */
  if (status === 'unauthenticated') {
    if (typeof window !== 'undefined') window.location.href = '/auth/signin';
    return null;
  }

  /* Loading screen */
  if (status === 'loading' || loading) {
    return (
      <main className="container py-5">
        <p>Loading your dashboard…</p>
      </main>
    );
  }

  /* -----------------------------------------------------
     Render Dashboard UI
  ----------------------------------------------------- */
  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '2.5rem 0',
      }}
    >
      <div className="container" style={{ maxWidth: 900 }}>

        {/* -------------------------------- Profile Header -------------------------------- */}
        <div className="d-flex align-items-center gap-4 mb-4">

          {/* Initials */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: '#1f6f4a',
              color: 'white',
              fontSize: 32,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            {session?.user?.email?.slice(0, 2).toUpperCase()}
          </div>

          {/* Basic profile info */}
          <div>
            <h1 className="fw-bold mb-1">My Profile</h1>
            <p className="text-muted mb-1">{session?.user?.email}</p>
            <span className="badge bg-secondary">Student</span>
          </div>
        </div>

        {/* -------------------------------- Account Info -------------------------------- */}
        <div className="rounded-4 shadow-sm bg-white p-4 mb-4">
          <h2 className="h5 fw-bold mb-3">Account Information</h2>

          <div className="row g-3">
            <div className="col-12">
              <label className="small text-muted">UH Email</label>
              <input
                type="text"
                className="form-control"
                disabled
                value={session?.user?.email || ''}
              />
            </div>

            <p className="mt-2 text-muted small">
              Additional profile fields will be available in future updates.
            </p>
          </div>
        </div>

        {/* -------------------------------- REAL STATS -------------------------------- */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="p-3 rounded-4 shadow-sm bg-white text-center">
              <h3 className="fw-bold mb-1">{stats.posted}</h3>
              <p className="text-muted small mb-0">Items Posted</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-4 shadow-sm bg-white text-center">
              <h3 className="fw-bold mb-1">{stats.reunited}</h3>
              <p className="text-muted small mb-0">Items Reunited</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-4 shadow-sm bg-white text-center">
              <h3 className="fw-bold mb-1">{stats.pending}</h3>
              <p className="text-muted small mb-0">Reports Pending</p>
            </div>
          </div>
        </div>

        {/* -------------------------------- Active Posts Tabs -------------------------------- */}
        <div className="rounded-4 shadow-sm bg-white p-4 mb-4">
          <h2 className="h5 fw-bold mb-3">Your Active Posts</h2>

          <div className="d-flex gap-3 mb-3">
            <button
              type="button"
              onClick={() => setTab('lost')}
              className={`btn btn-sm ${tab === 'lost' ? 'btn-dark' : 'btn-outline-secondary'}`}
            >
              Lost Reports
            </button>

            <button
              type="button"
              onClick={() => setTab('found')}
              className={`btn btn-sm ${tab === 'found' ? 'btn-dark' : 'btn-outline-secondary'}`}
            >
              Found Reports
            </button>
          </div>

          {tab === 'lost' &&
            (lost.length === 0
              ? <p className="text-muted">No lost reports yet.</p>
              : lost.map((item) => <DashboardCard key={item.id} item={item} />))}

          {tab === 'found' &&
            (found.length === 0
              ? <p className="text-muted">No found reports yet.</p>
              : found.map((item) => <DashboardCard key={item.id} item={item} />))}
        </div>

        {/* -------------------------------- Notifications -------------------------------- */}
        <div className="rounded-4 shadow-sm bg-white p-4 mb-4">
          <h2 className="h5 fw-bold mb-3">Notifications & Preferences</h2>

          <ul className="list-unstyled mb-0">
            <li>Email me when someone messages about my item</li>
            <li>Auto-archive reports after 30 days</li>
            <li>Show my name on item listings</li>
          </ul>
        </div>

        {/* -------------------------------- Account Actions -------------------------------- */}
        <div className="rounded-4 shadow-sm bg-white p-4 mb-5">
          <h2 className="h5 fw-bold mb-3">Account Actions</h2>

          <div className="d-flex justify-content-between">
            <Link href="/profile/change-password" className="text-primary fw-semibold">
              Change Password
            </Link>

            <Link href="/profile/download-data" className="text-primary fw-semibold">
              Download My Data
            </Link>

            <Link href="/profile/delete-account" className="text-danger fw-semibold">
              Delete Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
