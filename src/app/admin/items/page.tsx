// src/app/admin/items/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

type AdminItem = {
  id: number;
  title: string;
  type: ItemType;
  status: ItemStatus;
  building: string;
  date: string;
  imageUrl?: string | null;
  locationName?: string | null;
};

export default function AdminItemManager() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.randomKey;
  const isAdmin = role === 'ADMIN';

  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'ALL' | ItemType>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | ItemStatus>('ALL');
  const [search, setSearch] = useState('');

  async function load() {
    const res = await fetch('/api/items');
    if (res.ok) {
      const data = await res.json();
      setItems(data.items);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isAdmin) {
      load();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <main className="container py-5">
        <h1 className="fw-bold">Access Denied</h1>
        <p className="text-muted">Admins only.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="container py-5">
        <p>Loading all items…</p>
      </main>
    );
  }

  const filtered = items.filter((i) => {
    const matchesType = filterType === 'ALL' || i.type === filterType;
    const matchesStatus = filterStatus === 'ALL' || i.status === filterStatus;
    const query = search.toLowerCase();
    const matchesSearch =
      i.title.toLowerCase().includes(query) || i.building.toLowerCase().includes(query);
    return matchesType && matchesStatus && matchesSearch;
  });

  const statuses: ItemStatus[] = ['OPEN', 'TURNED_IN', 'WAITING_FOR_PICKUP', 'RECOVERED'];

  async function updateStatus(id: number, status: ItemStatus) {
    await fetch(`/api/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <main className="container py-4">
      <h1 className="fw-bold mb-3">Admin: Manage All Items</h1>

      <div className="card p-3 mb-4">
        <div className="row g-3">
          {/* Search */}
          <div className="col-md-4">
            <label htmlFor="search" className="form-label fw-semibold">
              Search
            </label>
            <input
              id="search"
              type="text"
              className="form-control"
              placeholder="Search title or building…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter by Type */}
          <div className="col-md-4">
            <label htmlFor="filterType" className="form-label fw-semibold">
              Filter by Type
            </label>
            <select
              id="filterType"
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ItemType | 'ALL')}
            >
              <option value="ALL">All</option>
              <option value="LOST">Lost</option>
              <option value="FOUND">Found</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div className="col-md-4">
            <label htmlFor="filterStatus" className="form-label fw-semibold">
              Filter by Status
            </label>
            <select
              id="filterStatus"
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ItemStatus | 'ALL')}
            >
              <option value="ALL">All</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <h5 className="mb-3">{`Showing ${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`}</h5>

        {filtered.length === 0 ? (
          <p className="text-muted">No items match the filters.</p>
        ) : (
          filtered.map((item) => {
            const shortDate = new Date(item.date).toLocaleDateString();

            return (
              <div
                key={item.id}
                className="border rounded p-3 mb-2 d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong className="d-block">{item.title}</strong>
                  <span className="small text-muted d-block">
                    {`${item.type} • ${item.status} • ${item.building} • ${shortDate}`}
                  </span>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <label htmlFor={`status-${item.id}`} className="visually-hidden">
                    Status
                  </label>
                  <select
                    id={`status-${item.id}`}
                    className="form-select form-select-sm"
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value as ItemStatus)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <Link href={`/item/${item.id}`} className="btn btn-outline-secondary btn-sm">
                    View
                  </Link>

                  <Link href={`/item/${item.id}/edit`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>

                  <Link href={`/item/${item.id}`} className="btn btn-danger btn-sm">
                    Delete
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
