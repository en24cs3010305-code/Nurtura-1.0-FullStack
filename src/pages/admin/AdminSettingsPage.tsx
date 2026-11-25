import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { Settings, Shield, Lock, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [sessionExpiry, setSessionExpiry] = useState('24');
  const [require2FA, setRequire2FA] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Administrative Security & Platform Governance"
        subtitle="Manage global session lifespans, clinician compliance thresholds, and telemetry policies"
      />

      {saved && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Platform security policies updated!</span>
        </div>
      )}

      <Card className="p-6 space-y-5 border-zinc-200">
        <h3 className="text-sm font-heading font-bold text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          HIPAA & Clinical Compliance Policies
        </h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-700">JWT Authentication Session Timeout</label>
            <select
              value={sessionExpiry}
              onChange={(e) => setSessionExpiry(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl text-xs py-2 px-3"
            >
              <option value="12">12 Hours</option>
              <option value="24">24 Hours (Standard)</option>
              <option value="48">48 Hours (Extended)</option>
            </select>
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer">
            <div>
              <span className="font-semibold text-zinc-800 block">Enforce 2-Factor Authentication for Doctors</span>
              <span className="text-zinc-400">Mandatory SMS or authenticator app confirmation on login</span>
            </div>
            <input
              type="checkbox"
              checked={require2FA}
              onChange={(e) => setRequire2FA(e.target.checked)}
              className="rounded text-zinc-800 focus:ring-zinc-600 w-4 h-4"
            />
          </label>

          <div className="flex justify-end pt-2">
            <Button size="sm" type="submit" className="bg-zinc-900 hover:bg-zinc-800 text-white">
              Save Security Policies
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
