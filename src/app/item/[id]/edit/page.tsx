// src/app/item/[id]/edit/page.tsx

'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

type EditItem = {
  id: number;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  category: string;
  building: string;
  term: string;
  date: string; // YYYY-MM-DD
  locationName?: string | null;
};

const STATUS_OPTIONS: ItemStatus[] = [
  'OPEN',
  'TURNED_IN',
  'WAITING_FOR_PICKUP',
  'RECOVERED',
];

export default function EditItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState<EditItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const id = Number(params.id);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to load item (${res.status})`);
        }
        const data = await res.json();
        const it = data.item;
        setItem({
          id: it.id,
          title: it.title,
          description: it.description,
          type: it.type,
          status: it.status,
          category: it.category,
          building: it.building,
          term: it.term,
          date: it.date,
          locationName: it.locationName,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(id)) {
      load();
    } else {
      setError('Invalid item id');
      setLoading(false);
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (!item) return;
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!item) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          description: item.description,
          category: item.category,
          building: item.building,
          term: item.term,
          date: item.date,
          status: item.status,
          locationName: item.locationName ?? '',
        }),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('You do not have permission to edit this item.');
        }
        throw new Error('Failed to save changes.');
      }

      router.push(`/item/${id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
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
          onClick={() => router.push('/dashboard')}
        >
          Back to dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="fw-bold mb-4">Edit Item</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Item Title *
            <input
              id="title"
              name="title"
              className="form-control"
              value={item.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description *
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows={4}
              value={item.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category *
            <select
              id="category"
              name="category"
              className="form-control"
              value={item.category}
              onChange={handleChange}
              required
            >
              <option value="Bottle">Bottle</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Misc">Misc</option>
            </select>
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="building" className="form-label">
            Building *
            <select
              id="building"
              name="building"
              className="form-control"
              value={item.building}
              onChange={handleChange}
              required
            >
              <option value="POST 309">POST 309</option>
              <option value="Bilger">Bilger</option>
              <option value="Hamilton Library">Hamilton Library</option>
            </select>
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="term" className="form-label">
            Term *
            <select
              id="term"
              name="term"
              className="form-control"
              value={item.term}
              onChange={handleChange}
              required
            >
              <option value="Fall 2025">Fall 2025</option>
              <option value="Spring 2026">Spring 2026</option>
            </select>
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date *
            <input
              id="date"
              name="date"
              type="date"
              className="form-control"
              value={item.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status *
            <select
              id="status"
              name="status"
              className="form-control"
              value={item.status}
              onChange={handleChange}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="locationName" className="form-label">
            Pickup / Turn-in Location (optional)
            <input
              id="locationName"
              name="locationName"
              className="form-control"
              value={item.locationName ?? ''}
              onChange={handleChange}
            />
          </label>
        </div>

        {error && <p className="text-danger mb-3">{error}</p>}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => router.push(`/item/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
