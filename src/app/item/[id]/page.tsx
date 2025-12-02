// src/app/item/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  date: string;
  locationName?: string | null;
};

function statusLabel(status: ItemStatus) {
  switch (status) {
    case 'OPEN':
      return 'Open';
    case 'TURNED_IN':
      return 'Turned In';
    case 'WAITING_FOR_PICKUP':
      return 'Waiting for Pickup';
    case 'RECOVERED':
      return 'Recovered';
    default:
      return status;
  }
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState<FeedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const numericId = Number(params.id);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/items');
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();
        const found: FeedItem | undefined = (data.items ?? []).find(
          (i: FeedItem) => i.id === numericId,
        );

        if (!found) {
          setError('Item not found.');
        } else {
          setItem(found);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load item.');
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(numericId)) {
      load();
    } else {
      setError('Invalid item id.');
      setLoading(false);
    }
  }, [numericId]);

  if (loading) {
    return (
      <main className="container py-5">
        <p>Loading item…</p>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="container py-5">
        <p className="text-danger mb-3">{error || 'Item not found.'}</p>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => router.push('/list')}
        >
          Back to Lost/Found feed
        </button>
      </main>
    );
  }

  const dateLabel = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3.5rem 0 4rem',
      }}
    >
      <div className="container">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="row g-0">
            {item.imageUrl && (
              <div className="col-md-5">
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: '260px',
                    overflow: 'hidden',
                    borderTopLeftRadius: '1.5rem',
                    borderBottomLeftRadius: '1.5rem',
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}

            <div className={item.imageUrl ? 'col-md-7' : 'col-12'}>
              <div className="card-body p-4 p-md-5">
                <p className="text-uppercase small text-muted mb-1">
                  {item.type === 'LOST' ? 'Lost item' : 'Found item'}
                </p>
                <h1 className="h3 fw-bold mb-2">{item.title}</h1>
                <p className="text-muted mb-3">
                  {item.building}
                  {' '}
                  •
                  {item.term}
                  {' '}
                  •
                  {dateLabel}
                </p>

                <p className="mb-4">{item.description}</p>

                <dl className="row small mb-4">
                  <dt className="col-sm-4 text-muted">Category</dt>
                  <dd className="col-sm-8">{item.category}</dd>

                  <dt className="col-sm-4 text-muted">Status</dt>
                  <dd className="col-sm-8">{statusLabel(item.status)}</dd>

                  {item.locationName && (
                    <>
                      <dt className="col-sm-4 text-muted">
                        Pickup / Turn-in Location
                      </dt>
                      <dd className="col-sm-8">{item.locationName}</dd>
                    </>
                  )}
                </dl>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => router.push('/list')}
                  >
                    Back to Lost/Found feed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
