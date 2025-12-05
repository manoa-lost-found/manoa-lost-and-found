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

  async function enableUser(id: number) {
    await fetch('/api/admin/user-actions/enable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });
    load();
  }

  // Helper to avoid nested ternaries
  function getRoleBadgeClass(roleValue: string) {
    if (roleValue === 'ADMIN') return 'badge bg-danger';
    if (roleValue === 'DISABLED') return 'badge bg-dark';
    return 'badge bg-secondary';
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
              <th style={{ width: '300px' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>

                <td>
                  <span className={getRoleBadgeClass(u.role)}>{u.role}</span>
                </td>

                <td>{u.itemCount}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link
                      href={`/profile/${u.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View Profile
                    </Link>

                    {u.role === 'USER' && (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => promoteUser(u.id)}
                        >
                          Promote
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => disableUser(u.id)}
                        >
                          Disable
                        </button>
                      </>
                    )}

                    {u.role === 'DISABLED' && (
                      <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={() => enableUser(u.id)}
                      >
                        Re-Enable
                      </button>
                    )}

                    {u.role === 'ADMIN' && (
                      <span className="text-muted small">Admin locked</span>
                    )}
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
