'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type UserRecord = {
  id: string;
  name: string | null;
  email: string;
  role: string | null; // "ADMIN" | "USER"
  itemCount: number;   // how many items they posted
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.randomKey;
  const isAdmin = role === 'ADMIN';

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch('/api/admin/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isAdmin) {
      load();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <main className="container py-5">
        <h1 className="fw-bold">Access Denied</h1>
        <p className="text-muted">Admins only.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="container py-5">
        <p>Loading users…</p>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="fw-bold mb-3">Admin: User Accounts</h1>

      <div className="card p-3">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Posts</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name ?? '—'}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={
                      u.role === 'ADMIN'
                        ? 'badge bg-danger'
                        : 'badge bg-secondary'
                    }
                  >
                    {u.role ?? 'USER'}
                  </span>
                </td>
                <td>{u.itemCount}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link
                      href={`/profile/${u.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => alert('Promote coming soon')}
                    >
                      Promote
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => alert('Disable coming soon')}
                    >
                      Disable
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </main>
  );
}

