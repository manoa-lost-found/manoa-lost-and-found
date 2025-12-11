'use client';

/* eslint-disable no-alert, jsx-a11y/label-has-associated-control */

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { BUILDINGS } from '@/data/buildings';
import { CATEGORIES } from '@/data/categories';

type ItemType = 'LOST' | 'FOUND';

type LostFormData = {
  title: string;
  description: string;
  category: string;
  building: string;
  date: string;
  locationName: string;
  imageFile: File | null;
  imagePreview: string | null;
};

export default function ReportLostPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState<LostFormData>({
    title: '',
    description: '',
    category: '',
    building: '',
    date: '',
    locationName: '',
    imageFile: null,
    imagePreview: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: null,
        imagePreview: null,
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: typeof reader.result === 'string' ? reader.result : null,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const body = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: 'LOST' as ItemType,
        category: formData.category,
        building: formData.building,
        date: formData.date,
        locationName: formData.locationName.trim() || null,
        imageUrl: formData.imagePreview,
      };

      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        // eslint-disable-next-line no-console
        console.error('Failed to submit lost item:', data);
        alert(data?.error || 'Failed to submit lost item.');
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      router.push(`/item/${data.item.id}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Something went wrong while submitting your report.');
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

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
          <h1 className="fw-bold mb-2">Report a Lost Item</h1>
          <p className="text-muted mb-0">
            Tell the campus what you are looking for so someone can help you get it back.
          </p>
        </div>

        {!session && (
          <p className="alert alert-info">
            You must be signed in with your UH account to submit a lost item report.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="card border-0 shadow-sm rounded-4"
        >
          <div className="card-body p-4 p-md-5">
            <div className="row g-4">
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
                    placeholder="e.g. Black Hydro Flask, UH ID, laptop"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows={4}
                    placeholder="Include color, brand, stickers, and any unique details."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label fw-semibold">
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
                    <label htmlFor="building" className="form-label fw-semibold">
                      Last seen building *
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
                      Date lost *
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

                  <div className="col-md-6">
                    <label htmlFor="locationName" className="form-label fw-semibold">
                      More location details (optional)
                    </label>
                    <input
                      id="locationName"
                      name="locationName"
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2nd floor study area, near vending machines"
                      value={formData.locationName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

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
                    Add a photo of the item if you have one. This helps others recognize it
                    more easily.
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

            {/* Submit Row */}
            <div className="mt-4 d-flex justify-content-between align-items-start gap-4">
              <p className="text-muted small mb-0">
                By submitting this form, you agree to only post honest and accurate information
                about items lost on or near the UH Mānoa campus.
              </p>
              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={submitting || !session}
              >
                {submitting ? 'Submitting…' : 'Submit report'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
