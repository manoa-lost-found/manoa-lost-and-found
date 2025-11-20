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

export default function AddFoundPage() {
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
    locationName: "",
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
          type: "FOUND",
          category: formData.category,
          building: formData.building,
          term: formData.term,
          date: formData.date,
          locationName: formData.locationName || null,
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
        locationName: "",
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
      <h1 className="fw-bold">Report Found Item</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="foundItemName" className="form-label">
            Item Name *
            <input
              id="foundItemName"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="foundDescription" className="form-label">
            Description *
            <textarea
              id="foundDescription"
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
          <label htmlFor="foundCategory" className="form-label">
            Category *
            <select
              id="foundCategory"
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
          <label htmlFor="foundLocation" className="form-label">
            Location Found (Building) *
            <select
              id="foundLocation"
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
          <label htmlFor="foundTerm" className="form-label">
            Term *
            <select
              id="foundTerm"
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
          <label htmlFor="foundDate" className="form-label">
            Date Found *
            <input
              id="foundDate"
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
          <label htmlFor="foundPickupLocation" className="form-label">
            Pickup Location (optional)
            <input
              id="foundPickupLocation"
              name="locationName"
              className="form-control"
              value={formData.locationName}
              onChange={handleChange}
              placeholder="e.g., Information Desk"
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="foundImage" className="form-label">
            Upload Image (optional)
            <input
              id="foundImage"
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
