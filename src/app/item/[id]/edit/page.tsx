'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BUILDINGS } from '@/data/buildings';
import { CATEGORIES } from '@/data/categories';

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
  date: string; // YYYY-MM-DD
  locationName?: string | null;
  imageUrl?: string | null;
};

type EditFormData = {
  title: string;
  description: string;
  category: string;
  building: string;
  date: string;
  // For LOST: extra location details
  // For FOUND: not persisted yet, but can be used later
  locationDetails: string;
  // For FOUND: official pickup / turn-in location
  pickupLocation: string;
  imageFile: File | null;
  imagePreview: string | null;
};

const STATUS_OPTIONS: ItemStatus[] = [
  'OPEN',
  'TURNED_IN',
  'WAITING_FOR_PICKUP',
  'RECOVERED',
];

const PICKUP_LOCATIONS: string[] = [
  'Campus Center (Information Desk)',
  'Hamilton Library (Front Desk)',
  'Sinclair Library (Service Desk)',
  'Hemenway Hall (Student Services)',
  'Bilger Hall (Department Office)',
  'Art Building (Main Office)',
];

export default function EditItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState<EditItem | null>(null);
  const [formData, setFormData] = useState<EditFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const id = Number(params.id);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to load item (${res.status})`);
        }
        const data = await res.json();
        const it = data.item as EditItem;

        const baseItem: EditItem = {
          id: it.id,
          title: it.title,
          description: it.description,
          type: it.type,
          status: it.status,
          category: it.category,
          building: it.building,
          date: it.date,
          locationName: it.locationName ?? null,
          imageUrl: it.imageUrl ?? null,
        };

        const isFound = it.type === 'FOUND';

        const initialFormData: EditFormData = {
          title: it.title ?? '',
          description: it.description ?? '',
          category: it.category ?? '',
          building: it.building ?? '',
          date: it.date ?? '',
          locationDetails: isFound ? '' : it.locationName ?? '',
          pickupLocation: isFound ? it.locationName ?? '' : '',
          imageFile: null,
          imagePreview: it.imageUrl ?? null,
        };

        setItem(baseItem);
        setFormData(initialFormData);
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setFormData((prev) => (prev
        ? {
          ...prev,
          imageFile: null,
          imagePreview: item?.imageUrl ?? null,
        }
        : prev));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => (prev
        ? {
          ...prev,
          imageFile: file,
          imagePreview:
              typeof reader.result === 'string' ? reader.result : null,
        }
        : prev));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!item) return;
    const { value } = e.target;
    setItem({ ...item, status: value as ItemStatus });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!item || !formData || saving) return;

    setSaving(true);
    setError(null);

    try {
      const isLost = item.type === 'LOST';

      const body = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        building: formData.building,
        date: formData.date,
        status: item.status,
        // For LOST: extra location detail
        // For FOUND: official pickup location
        locationName: isLost
          ? formData.locationDetails.trim() || null
          : formData.pickupLocation,
        imageUrl: formData.imagePreview,
      };

      const res = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('You do not have permission to edit this item.');
        }
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Failed to save changes.');
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

  if (error || !item || !formData) {
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

  const isLost = item.type === 'LOST';

  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3.5rem 0 4rem',
      }}
    >
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="mb-4 text-center">
          <h1 className="fw-bold mb-2">
            {isLost ? 'Edit Lost Item' : 'Edit Found Item'}
          </h1>
          <p className="text-muted mb-0">
            Update details so other students and staff have the most accurate
            information.
          </p>
        </div>

        {error && (
          <p className="alert alert-danger">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="card border-0 shadow-sm rounded-4"
        >
          <div className="card-body p-4 p-md-5">
            <div className="row g-4">
              {/* LEFT SIDE FORM FIELDS */}
              <div className="col-md-7">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Item name *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder={
                      isLost
                        ? 'e.g. Black Hydro Flask, UH ID, laptop'
                        : 'e.g. Wallet, phone, backpack'
                    }
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows={4}
                    placeholder={
                      isLost
                        ? 'Include color, brand, stickers, and any unique details.'
                        : 'Include color, brand, and any details that might help confirm ownership.'
                    }
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="category"
                      className="form-label fw-semibold"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="building"
                      className="form-label fw-semibold"
                    >
                      {isLost
                        ? 'Last seen building *'
                        : 'Where you found it (building) *'}
                    </label>
                    <select
                      id="building"
                      name="building"
                      className="form-select"
                      value={formData.building}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a building</option>
                      {BUILDINGS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label fw-semibold">
                      {isLost ? 'Date lost *' : 'Date found *'}
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="form-control"
                      max={today}
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {isLost ? (
                    <div className="col-md-6">
                      <label
                        htmlFor="locationDetails"
                        className="form-label fw-semibold"
                      >
                        More location details (optional)
                      </label>
                      <input
                        id="locationDetails"
                        name="locationDetails"
                        type="text"
                        className="form-control"
                        placeholder="e.g. 2nd floor study area, near vending machines"
                        value={formData.locationDetails}
                        onChange={handleInputChange}
                      />
                    </div>
                  ) : (
                    <div className="col-md-6">
                      <label
                        htmlFor="pickupLocation"
                        className="form-label fw-semibold"
                      >
                        Turn-in / pickup location *
                      </label>
                      <select
                        id="pickupLocation"
                        name="pickupLocation"
                        className="form-select"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a pickup location</option>
                        {PICKUP_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                      <p className="form-text">
                        Choose the official office or desk where this item was
                        turned in (or is being kept for pickup).
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <label htmlFor="status" className="form-label fw-semibold">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="form-select"
                    value={item.status}
                    onChange={handleStatusChange}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <p className="form-text">
                    Use this to mark items as turned in, waiting for pickup, or
                    recovered by the owner.
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE — IMAGE PREVIEW / UPLOAD */}
              <div className="col-md-5">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label fw-semibold">
                    Upload image (optional)
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <p className="form-text">
                    You can update the photo if needed. Avoid showing sensitive
                    details like full ID numbers or card information.
                  </p>
                </div>

                {formData.imagePreview && (
                  <div className="border rounded-3 overflow-hidden">
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '220px',
                      }}
                    >
                      <Image
                        src={formData.imagePreview}
                        alt="Item preview"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-between align-items-center">
              <p className="text-muted small mb-0">
                Make sure the details are accurate. Clear information helps items
                get back to the right person faster.
              </p>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => router.push(`/item/${id}`)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success px-4"
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
