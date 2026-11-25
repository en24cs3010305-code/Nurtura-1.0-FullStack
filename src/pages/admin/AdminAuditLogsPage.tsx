import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { adminService } from '../../services/adminService';
import { AuditLog } from '../../types';
import { ScrollText, Search, ShieldCheck } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    adminService.getAuditLogs().then(setLogs);
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(filter.toLowerCase()) ||
      l.userName.toLowerCase().includes(filter.toLowerCase()) ||
      l.target.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Security & System Audit Logs"
        subtitle="Immutable chronological trail of clinical actions, doctor verifications, and permission updates"
      />

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
        <input
          type="text"
          placeholder="Filter logs by action, actor, or target..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-300 text-xs bg-white dark:bg-darkBg-card focus:outline-none focus:ring-1 focus:ring-zinc-600"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:bg-darkBg-card shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-50 dark:bg-darkBg-surface border-b border-zinc-200 text-zinc-500 uppercase font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Event ID</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Security Action</th>
              <th className="py-3 px-4">Target Entity</th>
              <th className="py-3 px-4">Origin IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-mono text-[11px]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="py-3 px-4 text-zinc-400">{item.id}</td>
                <td className="py-3 px-4 text-zinc-600">{item.timestamp}</td>
                <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{item.userName}</td>
                <td className="py-3 px-4">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] uppercase">
                    {item.role}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-emerald-700">{item.action}</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">{item.target}</td>
                <td className="py-3 px-4 text-zinc-400">{item.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
