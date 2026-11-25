import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { adminService } from '../../services/adminService';
import { SupportRequest } from '../../types';
import { HelpCircle, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const AdminSupportPage: React.FC = () => {
  const [requests, setRequests] = useState<SupportRequest[]>([]);

  useEffect(() => {
    adminService.getSupportRequests().then(setRequests);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Support Tickets & Inquiries"
        subtitle="Manage parental technical requests, pediatrician document queries, and platform help tickets"
      />

      <div className="space-y-4">
        {requests.map((req) => (
          <Card key={req.id} className="p-5 space-y-3 border-zinc-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  req.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {req.status}
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  {req.subject}
                </span>
              </div>
              <span className="text-zinc-400">{req.createdAt}</span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 dark:bg-darkBg-surface p-3 rounded-xl border border-zinc-100">
              "{req.message}"
            </p>

            <div className="flex items-center justify-between pt-1 text-xs text-zinc-400">
              <span>Submitted by: <strong>{req.userName}</strong> ({req.role})</span>
              <Button size="sm" variant="soft" className="text-xs">
                Reply / Resolve
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
