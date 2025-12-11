'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import { BUILDINGS } from '@/data/buildings';
import { CATEGORIES } from '@/data/categories';

type ItemType = 'LOST' | 'FOUND';

type FoundFormData = {
  title: string;
  description: string;
  category: string;
  building: string;
  date: string;
  locationName: string; // extra detail (optional)
  pickupLocation: string; // official location that gets saved
  imageFile: File | null;
  imagePreview: string | null;
};

const PICKUP_LOCATIONS: string[] = [
  'Campus Center (Information Desk)',
  'Hamilton Library (Front Desk)',
  'Sinclair Library (Service Desk)',
  'Hemenway Hall (Student Services)',
  'Bilger Hall (Department Office)',
  'Art Building (Main Office)',
];

// AUTO-RESIZE IMAGE HELPER-
function resizeImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (ev) => {
      if (typeof ev.target?.result !== 'string') {
        reject(new Error('Invalid image data.'));
        return;
      }
      img.src = ev.target.result;
    };

    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context.'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      resolve(dataUrl);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image.'));
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };

    reader.readAsDataURL(file);
  });
}

// MAIN COMPONENT
export default function ReportFoundPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState<FoundFormData>({
    title: '',
    description: '',
    category: '',
    building: '',
    date: '',
    locationName: '',
    pickupLocation: '',
    imageFile: null,
    imagePreview: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageError(null);

    if (!file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: null,
        imagePreview: null,
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFormData((prev) => ({
        ...prev,
        imageFile: null,
        imagePreview: null,
      }));
      setImageError('That image is too large. Please choose a file under 3 MB.');
      return;
    }

    try {
      const resized = await resizeImage(file, 1200, 1200);
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: resized,
      }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setFormData((prev) => ({
        ...prev,
        imageFile: null,
        imagePreview: null,
      }));
      setImageError('We could not process that image. Please try another file.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setFormError(null);
    setSubmitting(true);

    try {
      const body = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: 'FOUND' as ItemType,
        category: formData.category,
        building: formData.building,
        date: formData.date,
        // This is the official pickup / turn-in location
        locationName: formData.pickupLocation,
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

        const message =
          data?.error ||
          (res.status === 413
            ? 'Your image is too large for the server. Please upload a smaller photo.'
            : 'Failed to submit your found item. Please try again.');

        setFormError(message);
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      router.push(`/item/${data.item.id}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setFormError(
        'Something went wrong while submitting your report. If you attached a photo, try a smaller image.',
      );
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
          <h1 className="fw-bold mb-2">Report a Found Item</h1>
          <p className="text-muted mb-2">
            Help a fellow student get their belongings back by sharing where you turned it in.
          </p>
          <p className="text-muted small mb-0">
            Not sure where to go? Use the{' '}
            <a
              href="https://www.hawaii.edu/campusmap/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UH Mānoa campus map
            </a>{' '}
            to find an official service desk or office.
          </p>
        </div>

        {!session && (
          <p className="alert alert-info">
            You must be signed in with your UH account to submit a found item report.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="card border-0 shadow-sm rounded-4"
        >
          <div className="card-body p-4 p-md-5">
            {formError && (
              <div className="alert alert-danger mb-3" role="alert">
                {formError}
              </div>
            )}

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
                    placeholder="e.g. Wallet, phone, backpack"
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
                    placeholder="Include color, brand, and any details that might help confirm ownership."
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
                      Where you found it (building) *
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
                      Date found *
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
                    <label htmlFor="pickupLocation" className="form-label fw-semibold">
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
                      Choose the official office or desk where you turned the item in (or
                      where you will keep it safely for pickup).
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <label htmlFor="locationName" className="form-label fw-semibold">
                    More location details (optional)
                  </label>
                  <input
                    id="locationName"
                    name="locationName"
                    type="text"
                    className="form-control"
                    placeholder="e.g. near front entrance, on 3rd floor hallway"
                    value={formData.locationName}
                    onChange={handleInputChange}
                  />
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
                    Add a photo of the item if you can. Avoid showing sensitive details like
                    full ID numbers.
                  </p>
                  {imageError && (
                    <p className="text-danger small mb-0">{imageError}</p>
                  )}
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
                      <NextImage
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
                By submitting this form, you agree to only post honest and accurate information
                about items found on or near the UH Mānoa campus.
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
