import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { adminService } from '../../services/adminService';
import { User, UserRole } from '../../types';
import { Users, Search, Filter, ShieldCheck, UserX, UserCheck, Mail } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    adminService.getAllUsers().then(setUsers);
  }, []);

  const handleToggleSuspend = (userId: string, userName: string) => {
    setNotice(`Action logged: Account status updated for ${userName} (Development simulation)`);
    setTimeout(() => setNotice(null), 3000);
  };

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Account Management"
        subtitle="Search, filter, and inspect registered parent, doctor, and administrator accounts"
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-800 text-emerald-400 text-xs border border-zinc-700">
          {notice}
        </div>
      )}

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs bg-white dark:bg-darkBg-card focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['all', 'parent', 'doctor', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                roleFilter === r
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                  : 'bg-white dark:bg-darkBg-card border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:bg-darkBg-card shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-50 dark:bg-darkBg-surface border-b border-zinc-200 text-zinc-500 uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Contact Phone</th>
              <th className="py-3 px-4">Joined Date</th>
              <th className="py-3 px-4 text-right">Administrative Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <img src={u.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128'} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{u.name}</span>
                      <span className="text-zinc-400 text-[11px]">{u.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    u.role === 'admin' ? 'bg-indigo-100 text-indigo-800' :
                    u.role === 'doctor' ? 'bg-emerald-100 text-emerald-800' : 'bg-peach-100 text-peach-900'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-zinc-500">{u.phone || 'N/A'}</td>
                <td className="py-3 px-4 text-zinc-400 font-mono text-[11px]">{u.createdAt.split('T')[0]}</td>
                <td className="py-3 px-4 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-rose-600 hover:bg-rose-50"
                    onClick={() => handleToggleSuspend(u.id, u.name)}
                  >
                    Suspend / Toggle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
