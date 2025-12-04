'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type UserRecord = {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER';
  itemCount: number;
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.randomKey; // your NextAuth sets randomKey = role
  const isAdmin = role === 'ADMIN';

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
      setLoading(false);
    }

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

  // API ACTION HELPERS
  async function promoteUser(id: number) {
    await fetch('/api/admin/users/promote', {
      method: 'POST',
      body: JSON.stringify({ userId: id }),
    });
    window.location.reload(); // reload table after update
  }

  async function disableUser(id: number) {
    await fetch('/api/admin/users/disable', {
      method: 'POST',
      body: JSON.stringify({ userId: id }),
    });
    window.location.reload(); // reload table after update
  }

  return (
    <main className="container py-4">
      <h1 className="fw-bold mb-4">Admin: User Accounts</h1>

      <div className="card p-3 shadow-sm">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Posts</th>
              <th style={{ width: '250px' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>

                <td>
                  <span
                    className={
                      u.role === 'ADMIN'
                        ? 'badge bg-danger'
                        : 'badge bg-secondary'
                    }
                  >
                    {u.role}
                  </span>
                </td>

                <td>{u.itemCount}</td>

                <td>
                  <div className="d-flex gap-2">

                    {/* VIEW USER PROFILE */}
                    <Link
                      href={`/profile/${u.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View Profile
                    </Link>

                    {/* PROMOTE BUTTON */}
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      disabled={u.role === 'ADMIN'}
                      onClick={() => promoteUser(u.id)}
                    >
                      Promote to Admin
                    </button>

                    {/* DISABLE BUTTON */}
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      disabled={u.role === 'ADMIN'}
                      onClick={() => disableUser(u.id)}
                    >
                      Disable User
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
