// src/app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
  term: string;
  date: string;
  imageUrl?: string | null;
  locationName?: string | null;
};

function DashboardRow({ item }: { item: MyItem }) {
  return (
    <div className="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
      <div>
        <strong>{item.title}</strong>
        <div className="small text-muted">
          {item.building}
          {' '}
          •
          {' '}
          {item.term}
        </div>
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
        <p>Loading your dashboard…</p>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="fw-bold mb-4">My Dashboard</h1>

      <section className="mb-5">
        <h2 className="h4 mb-3">My Lost Items</h2>
        {lost.length === 0 ? (
          <p className="text-muted">You have not reported any lost items.</p>
        ) : (
          lost.map((item) => <DashboardRow key={item.id} item={item} />)
        )}
      </section>

      <section>
        <h2 className="h4 mb-3">My Found Items</h2>
        {found.length === 0 ? (
          <p className="text-muted">You have not reported any found items.</p>
        ) : (
          found.map((item) => <DashboardRow key={item.id} item={item} />)
        )}
      </section>
    </main>
  );
}
