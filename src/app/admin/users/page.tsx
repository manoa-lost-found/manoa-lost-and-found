'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type UserRecord = {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER' | 'DISABLED';
  itemCount: number;
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
    if (isAdmin) load();
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

  async function promoteUser(id: number) {
    await fetch('/api/admin/user-actions/promote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });
    load();
  }

  async function disableUser(id: number) {
    await fetch('/api/admin/user-actions/disable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });
    load();
  }

  async function restoreUser(id: number) {
    await fetch('/api/admin/user-actions/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });
    load();
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
              <th style={{ width: '350px' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>

                {/* ROLE BADGE */}
                <td>
                  <span
                    className={
                      u.role === 'ADMIN'
                        ? 'badge bg-danger'
                        : u.role === 'DISABLED'
                          ? 'badge bg-dark'
                          : 'badge bg-secondary'
                    }
                  >
                    {u.role}
                  </span>
                </td>

                <td>{u.itemCount}</td>

                <td>
                  <div className="d-flex gap-2">

                    {/* VIEW PROFILE */}
                    <Link
                      href={`/profile/${u.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View Profile
                    </Link>

                    {/* PROMOTE */}
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      disabled={u.role === 'ADMIN'}
                      onClick={() => promoteUser(u.id)}
                    >
                      Promote
                    </button>

                    {/* DISABLE */}
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      disabled={u.role === 'DISABLED'}
                      onClick={() => disableUser(u.id)}
                    >
                      Disable
                    </button>

                    {/* RESTORE */}
                    <button
                      type="button"
                      className="btn btn-sm btn-success"
                      disabled={u.role !== 'DISABLED'}
                      onClick={() => restoreUser(u.id)}
                    >
                      Restore
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
