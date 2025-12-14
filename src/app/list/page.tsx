'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { BUILDINGS } from '@/data/buildings';
import { CATEGORIES } from '@/data/categories';

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

type FeedItem = {
  id: number;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  imageUrl?: string | null;
  category: string;
  building: string;
  term: string;
  date: string; // YYYY-MM-DD (lost/found date)
  locationName?: string | null;
};

type SortOrder = 'NEWEST' | 'OLDEST';

const PAGE_SIZE = 12;

const pageStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
  minHeight: 'calc(100vh - 64px)',
  padding: '3.5rem 0 4rem',
};

function statusBadgeClass(status: ItemStatus): string {
  switch (status) {
    case 'OPEN':
      return 'badge bg-warning text-dark';
    case 'WAITING_FOR_PICKUP':
      return 'badge bg-info text-dark';
    case 'TURNED_IN':
      return 'badge bg-primary';
    case 'RECOVERED':
      return 'badge bg-success';
    default:
      return 'badge bg-secondary';
  }
}

function typeLabel(type: ItemType): string {
  return type === 'LOST' ? 'Lost item' : 'Found item';
}

export default function LostFoundFeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ItemType | 'ALL'>('ALL');
  const [buildingFilter, setBuildingFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('NEWEST');

  const { data: session, status } = useSession();

  const fetchPage = async (opts: { cursor?: number | null; reset?: boolean } = {}) => {
    const cursorPart = opts.cursor ? `&cursor=${opts.cursor}` : '';
    const url = `/api/items?take=${PAGE_SIZE}${cursorPart}&sort=${sortOrder}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load items.');

    const data = await res.json();
    const newItems = (data.items ?? []) as FeedItem[];

    setNextCursor(data.nextCursor ?? null);

    if (opts.reset) {
      setItems(newItems);
    } else {
      setItems((prev) => [...prev, ...newItems]);
    }
  };

  // Load first page once authenticated OR when sort changes
  useEffect(() => {
    if (status !== 'authenticated') return;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        await fetchPage({ reset: true });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, sortOrder]);

  const handleLoadMore = async () => {
    if (loadingMore || nextCursor == null) return;

    setLoadingMore(true);
    setError(null);

    try {
      await fetchPage({ cursor: nextCursor });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredItems = useMemo(() => {
    let next = [...items];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      next = next.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
    }

    if (typeFilter !== 'ALL') next = next.filter((item) => item.type === typeFilter);
    if (buildingFilter) next = next.filter((item) => item.building === buildingFilter);
    if (categoryFilter) next = next.filter((item) => item.category === categoryFilter);

    // Safety net: keep consistent ordering for currently loaded items
    next.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === 'NEWEST' ? db - da : da - db;
    });

    return next;
  }, [items, search, typeFilter, buildingFilter, categoryFilter, sortOrder]);

  if (status === 'loading') {
    return (
      <main style={pageStyle}>
        <div className="container text-center py-5">
          <p className="text-muted mb-0">Checking your session…</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main style={pageStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center p-4">
                  <h1 className="h4 fw-bold mb-2">Sign In Required</h1>
                  <p className="text-muted mb-3">
                    The <strong>Items Feed</strong> is only available to authenticated UH Manoa
                    users. Please sign in with your UH email to view campus lost &amp; found posts.
                  </p>
                  <Link href="/auth/signin" className="btn btn-success">
                    Go to Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div className="container">
        <header className="mb-4 text-center">
          <h1 className="h3 fw-bold mb-1">Find it. Report it. Reunite it.</h1>
          <p className="text-muted mb-0">
            Browse campus-wide lost and found posts, or use filters to narrow your search.
          </p>
        </header>

        <section className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label htmlFor="search" className="form-label">
                  Search by keyword
                </label>
                <input
                  id="search"
                  type="text"
                  className="form-control"
                  placeholder="e.g. water bottle, ID card"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label htmlFor="typeFilter" className="form-label">
                  Item type
                </label>
                <select
                  id="typeFilter"
                  className="form-select"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as ItemType | 'ALL')}
                >
                  <option value="ALL">Lost &amp; found</option>
                  <option value="LOST">Lost only</option>
                  <option value="FOUND">Found only</option>
                </select>
              </div>

              <div className="col-md-3">
                <label htmlFor="buildingFilter" className="form-label">
                  Building
                </label>
                <select
                  id="buildingFilter"
                  className="form-select"
                  value={buildingFilter}
                  onChange={(e) => setBuildingFilter(e.target.value)}
                >
                  <option value="">All buildings</option>
                  {BUILDINGS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label htmlFor="categoryFilter" className="form-label">
                  Category
                </label>
                <select
                  id="categoryFilter"
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label htmlFor="sortOrder" className="form-label">
                  Sort
                </label>
                <select
                  id="sortOrder"
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                >
                  <option value="NEWEST">Newest</option>
                  <option value="OLDEST">Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {loading && <p className="text-muted">Loading items…</p>}
        {error && <p className="text-danger mb-3">{error}</p>}

        {!loading && !error && filteredItems.length === 0 && (
          <p className="text-muted">No items match your filters yet.</p>
        )}

        <section className="row g-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <Link href={`/item/${item.id}`} className="text-decoration-none text-reset">
                <div className="card h-100 border-0 shadow-sm">
                  {item.imageUrl && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '180px',
                        overflow: 'hidden',
                        borderTopLeftRadius: '.5rem',
                        borderTopRightRadius: '.5rem',
                      }}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="badge bg-light text-dark border">
                        {typeLabel(item.type)}
                      </span>
                      <span className={statusBadgeClass(item.status)}>
                        {item.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h2 className="h6 fw-bold mb-1">{item.title}</h2>

                    <p className="small text-muted mb-2">
                      {item.building} • {item.term} •{' '}
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>

                    <p className="small text-muted mb-0">
                      {item.description.length > 120
                        ? `${item.description.slice(0, 117)}...`
                        : item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>

        <div className="d-flex justify-content-center mt-4">
          {nextCursor ? (
            <button
              type="button"
              className="btn btn-outline-success px-4"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading…' : 'Load more'}
            </button>
          ) : (
            !loading &&
            !error &&
            items.length > 0 && <p className="text-muted small mb-0">You’ve reached the end.</p>
          )}
        </div>
      </div>
    </main>
  );
}
