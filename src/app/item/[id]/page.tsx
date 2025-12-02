// src/app/item/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

type DetailItem = {
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
  ownerId?: number;
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
  const { data: session } = useSession();
  const [item, setItem] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const numericId = Number(params.id);
  const currentUserId = Number((session?.user as any)?.id);
  const role = (session?.user as any)?.randomKey;
  const isAdmin = role === 'ADMIN';
  const isOwner = item && currentUserId && item.ownerId === currentUserId;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/items/${numericId}`);
        if (!res.ok) {
          throw new Error('Failed to load item.');
        }
        const data = await res.json();
        setItem(data.item);
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
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

  const handleDeleteConfirmed = async () => {
    if (!item) return;
    setDeleting(true);
    setActionError(null);

    try {
      const res = await fetch(`/api/items/${numericId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete item.');
      }
      router.push('/list');
    } catch (err) {
      setActionError((err as Error).message);
      setDeleting(false);
      setConfirmingDelete(false);
    }
  };

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
                  {' '}
                  {item.term}
                  {' '}
                  •
                  {' '}
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

                <div className="d-flex flex-column gap-2">
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => router.push('/list')}
                    >
                      Back to Lost/Found feed
                    </button>

                    {(isAdmin || isOwner) && !confirmingDelete && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setConfirmingDelete(true)}
                        disabled={deleting}
                      >
                        Delete post
                      </button>
                    )}

                    {(isAdmin || isOwner) && confirmingDelete && (
                      <>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleDeleteConfirmed}
                          disabled={deleting}
                        >
                          {deleting ? 'Deleting…' : 'Confirm delete'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setConfirmingDelete(false)}
                          disabled={deleting}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>

                  {actionError && (
                    <p className="text-danger small mb-0">{actionError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
