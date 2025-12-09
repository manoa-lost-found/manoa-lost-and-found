'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ----------------------------------------
     LOAD PROFILE DATA
  ----------------------------------------- */
  useEffect(() => {
    async function load() {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setName(data.user.name || '');
        setPreferredContact(data.user.preferredContact || '');
      }
      setLoading(false);
    }
    load();
  }, []);

  /* ----------------------------------------
     SUBMIT HANDLER
  ----------------------------------------- */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    const res = await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        preferredContact,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      setError('Failed to update your profile. Please try again.');
      return;
    }

    setSuccess('Profile updated successfully!');
    setTimeout(() => router.push('/dashboard'), 1200);
  }

  if (loading) {
    return (
      <main className="container py-5">
        <p>Loading profile…</p>
      </main>
    );
  }

  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f1f7f4, #e4f0ea)',
        minHeight: 'calc(100vh - 64px)',
        padding: '3rem 0',
      }}
    >
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 className="fw-bold mb-4 text-center">Edit Profile</h1>

        <div className="rounded-4 shadow-sm bg-white p-4">
          <form onSubmit={handleSubmit}>

            {error && (
              <div className="alert alert-danger py-2 mb-3">{error}</div>
            )}
            {success && (
              <div className="alert alert-success py-2 mb-3">{success}</div>
            )}

            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control rounded-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            {/* Preferred Contact */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Preferred Contact</label>
              <input
                type="text"
                className="form-control rounded-3"
                value={preferredContact}
                onChange={(e) => setPreferredContact(e.target.value)}
                placeholder="e.g. Campus Center, Major, Phone (optional)"
              />
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => router.push('/dashboard')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
