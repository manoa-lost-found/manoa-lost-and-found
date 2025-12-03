'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_OPTIONS = [
  "Bottle",
  "Clothing",
  "Electronics",
  "Wallet",
  "Keys",
  "ID",
  "Jewelry",
  "Bag",
  "Misc",
];

const BUILDINGS = [
  "Hamilton Library",
  "POST Building",
  "Bilger Hall",
  "Campus Center",
  "Gateway House",
  "Sakamaki Hall",
  "Keller Hall",
  "Sinclair Library",
  "Art Building",
  "BusAd",
  "Paradise Palms",
  "Other",
];

export default function ReportLostPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Misc",
    building: "Hamilton Library",
    date: "",
    imageUrl: null as string | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "LOST",
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to submit item");
      }

      setSuccess("Item submitted successfully!");
      router.push("/list");
    } catch (err: any) {
      setError(err.message || "Failed to submit item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Report Lost Item</h1>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}

      <form className="mt-4" onSubmit={handleSubmit}>
        {/* ITEM NAME */}
        <div className="mb-3">
          <label className="form-label">Item Name *</label>
          <input
            name="title"
            className="form-control"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            className="form-control"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-3">
          <label className="form-label">Category *</label>
          <select
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* LAST SEEN LOCATION (BUILDING) */}
        <div className="mb-3">
          <label className="form-label">Last Seen Location (Building) *</label>
          <select
            name="building"
            className="form-control"
            value={formData.building}
            onChange={handleChange}
          >
            {BUILDINGS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* DATE LOST */}
        <div className="mb-3">
          <label className="form-label">Date Lost *</label>
          <input
            type="date"
            name="date"
            className="form-control"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-3">
          <label className="form-label">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                style={{ width: 200, height: 200, objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Submitting…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
