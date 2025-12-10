'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <main className="container py-5">
        <p>Checking your admin access…</p>
      </main>
    );
  }

  // REAL role field
  const role = (session?.user as any)?.role;
  const isAdmin = role === 'ADMIN';

  if (!isAdmin) {
    return (
      <main className="container py-5">
        <h1 className="fw-bold">Access Denied</h1>
        <p className="text-muted">You must be an administrator to view this page.</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="fw-bold mb-4">Admin Control Center</h1>
      <p className="lead text-muted mb-4">Administrative tools for site management.</p>

      <div className="list-group rounded-3 shadow-sm">
        <Link href="/admin/items" className="list-group-item list-group-item-action py-3">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-1">Manage All Items</h5>
              <p className="mb-1 text-muted small">View, edit, or delete ANY item.</p>
            </div>
            <span className="align-self-center text-primary fw-bold">→</span>
          </div>
        </Link>

        <Link href="/admin/users" className="list-group-item list-group-item-action py-3">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-1">User Accounts</h5>
              <p className="mb-1 text-muted small">View users, emails, and item counts.</p>
            </div>
            <span className="align-self-center text-primary fw-bold">→</span>
          </div>
        </Link>

        <Link href="/admin/settings" className="list-group-item list-group-item-action py-3">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-1">System Settings</h5>
              <p className="mb-1 text-muted small">Edit buildings, categories, locations.</p>
            </div>
            <span className="align-self-center text-primary fw-bold">→</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
