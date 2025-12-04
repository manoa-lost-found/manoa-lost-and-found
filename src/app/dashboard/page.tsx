'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

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

function StatusBadge({ status }: { status: ItemStatus }) {
  const colors: Record<ItemStatus, string> = {
    OPEN: 'badge bg-success',
    TURNED_IN: 'badge bg-warning text-dark',
    WAITING_FOR_PICKUP: 'badge bg-primary',
    RECOVERED: 'badge bg-secondary',
  };

  return <span className={colors[status]}>{status.replace(/_/g, ' ')}</span>;
}

function DashboardCard({ item }: { item: MyItem }) {
  const dateLabel = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="row g-0">
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
                Pickup Location:
                {' '}
                {item.locationName}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { status } = useSession();
  const [items, setItems] = useState<MyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/my-items');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
      }
      setLoading(false);
    }

    if (status === 'authenticated') {
      load();
    }
  }, [status]);

  const lost = items.filter((i) => i.type === 'LOST');
  const found = items.filter((i) => i.type === 'FOUND');

  if (status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/signin';
    }
    return null;
  }

  if (status === 'loading' || loading) {
    return (
      <main className="container py-5">
        <p>Loading your dashboard&hellip;</p>
      </main>
    );
  }

  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3rem 0',
      }}
    >
      <div className="container" style={{ maxWidth: 850 }}>
        <h1 className="fw-bold mb-4 text-center">My Dashboard</h1>

        <section className="mb-5">
          <h2 className="h5 fw-bold mb-3">My Lost Items</h2>

          {lost.length === 0 ? (
            <p className="text-muted">You haven&rsquo;t reported any lost items yet.</p>
          ) : (
            lost.map((item) => <DashboardCard key={item.id} item={item} />)
          )}
        </section>

        <section>
          <h2 className="h5 fw-bold mb-3">My Found Items</h2>

          {found.length === 0 ? (
            <p className="text-muted">You haven&rsquo;t reported any found items yet.</p>
          ) : (
            found.map((item) => <DashboardCard key={item.id} item={item} />)
          )}
        </section>
      </div>
    </main>
  );
}
