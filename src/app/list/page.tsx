'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { BUILDINGS } from '@/data/buildings';
import { CATEGORIES } from '@/data/categories';

// --- Types ---
type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';
type SortOrder = 'NEWEST' | 'OLDEST';

interface FeedItem {
  id: number;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  imageUrl?: string | null;
  category: string;
  building: string;
  term: string;
  date: string;
  similarity?: number; // Added for AI search results
}

interface ApiData {
  items: FeedItem[];
}

// --- Helper: Debounce Hook ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// --- Helper Functions ---
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
  // Session
  const { data: session, status } = useSession();

  // State
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter State
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ItemType | 'ALL'>('ALL');
  const [buildingFilter, setBuildingFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('NEWEST');

  // Debounced Search (waits 500ms after typing stops)
  const debouncedSearch = useDebounce(search, 500);

  // Fetch Logic
  const fetchItems = useCallback(async () => {
    if (status !== 'authenticated') return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('q', debouncedSearch);
      if (typeFilter !== 'ALL') params.set('type', typeFilter);
      if (buildingFilter) params.set('building', buildingFilter);
      if (categoryFilter) params.set('category', categoryFilter);
      params.set('sort', sortOrder);

      const res = await fetch(`/api/items?${params.toString()}`);

      if (!res.ok) {
        throw new Error('Failed to load items.');
      }

      const data = (await res.json()) as ApiData;
      setItems(data.items);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [status, debouncedSearch, typeFilter, buildingFilter, categoryFilter, sortOrder]);

  // Effect: Trigger fetch when filters or debounced search changes
  useEffect(() => {
    // Only fetch if we are actually logged in
    if (status === 'authenticated') {
      fetchItems().catch(() => {
        // Error is already handled in fetchItems
      });
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status, fetchItems]);

  // --- Render: Loading / Unauthenticated ---
  if (status === 'loading') {
    return (
      <main style={{ minHeight: 'calc(100vh - 64px)', padding: '3.5rem 0 4rem' }}>
        <div className="container text-center py-5">
          <p className="text-muted mb-0">Checking your session…</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main style={{ minHeight: 'calc(100vh - 64px)', padding: '3.5rem 0 4rem' }}>
        <div className="container text-center">
          <h1>Sign In Required</h1>
          <Link href="/auth/signin" className="btn btn-primary mt-3">Go to Log In</Link>
        </div>
      </main>
    );
  }

  // --- Render: Main Feed ---
  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3.5rem 0 4rem',
      }}
    >
      <div className="container">
        <header className="mb-4 text-center">
          <h1 className="h3 fw-bold mb-1">Find it. Report it. Reunite it.</h1>
          <p className="text-muted mb-0">
            Browse campus-wide lost and found posts, or use filters to narrow your search.
          </p>
        </header>

        {/* FILTERS */}
        <section className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label htmlFor="search-input" className="form-label">
                  Search by keyword
                </label>
                <input
                  id="search-input"
                  type="text"
                  className="form-control"
                  placeholder="e.g. water bottle, ID card"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label htmlFor="type-filter" className="form-label">
                  Item type
                </label>
                <select
                  id="type-filter"
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
                <label htmlFor="building-filter" className="form-label">
                  Building
                </label>
                <select
                  id="building-filter"
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
                <label htmlFor="category-filter" className="form-label">
                  Category
                </label>
                <select
                  id="category-filter"
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
                <label htmlFor="sort-order" className="form-label">
                  Sort
                </label>
                <select
                  id="sort-order"
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

        {/* LOADING & ERROR STATES */}
        {loading && <p className="text-muted text-center">Loading items…</p>}
        {error && <p className="text-danger text-center mb-3">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-muted text-center">No items match your filters yet.</p>
        )}

        {/* RESULTS GRID */}
        <section className="row g-3">
          {items.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <Link
                href={`/item/${item.id}`}
                className="text-decoration-none text-reset"
              >
                <div className="card h-100 border-0 shadow-sm position-relative">
                  {/* AI Match Badge */}
                  {item.similarity !== undefined && item.similarity > 0.78 && (
                    <div
                      className="badge bg-success position-absolute"
                      style={{ top: '10px', right: '10px', zIndex: 10 }}
                    >
                      Best Match
                    </div>
                  )}

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
      </div>
    </main>
  );
}
