"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ItemType = "LOST" | "FOUND";
type ItemStatus = "OPEN" | "TURNED_IN" | "WAITING_FOR_PICKUP" | "RECOVERED";

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

export default function AddLostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Misc",
    building: "POST 309",
    term: "Fall 2025",
    date: "",
    imageUrl: null as string | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          imageUrl: dataUrl,
        }));
        setImagePreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: "LOST",
          category: formData.category,
          building: formData.building,
          term: formData.term,
          date: formData.date,
          imageUrl: formData.imageUrl || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit item");
      }

      alert("Item reported successfully!");
      setFormData({
        title: "",
        description: "",
        category: "Misc",
        building: "POST 309",
        term: "Fall 2025",
        date: "",
        imageUrl: null,
      });
      setImagePreview(null);
      router.push("/list");
    } catch (err) {
      setError((err as Error).message || "Failed to submit item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Report Lost Item</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="lostItemName" className="form-label">
            Item Name *
            <input
              id="lostItemName"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="lostDescription" className="form-label">
            Description *
            <textarea
              id="lostDescription"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="lostCategory" className="form-label">
            Category *
            <select
              id="lostCategory"
              name="category"
              className="form-control"
              value={formData.category}
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
          <label htmlFor="lostLocation" className="form-label">
            Last Seen Location (Building) *
            <select
              id="lostLocation"
              name="building"
              className="form-control"
              value={formData.building}
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
          <label htmlFor="lostTerm" className="form-label">
            Term *
            <select
              id="lostTerm"
              name="term"
              className="form-control"
              value={formData.term}
              onChange={handleChange}
              required
            >
              <option value="Fall 2025">Fall 2025</option>
              <option value="Spring 2026">Spring 2026</option>
            </select>
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="lostDate" className="form-label">
            Date Lost *
            <input
              id="lostDate"
              name="date"
              type="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="lostImage" className="form-label">
            Upload Image (optional)
            <input
              id="lostImage"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
          </label>
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
