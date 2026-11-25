import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { adminService } from '../../services/adminService';
import { AdminStats, AuditLog } from '../../types';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Baby,
  Calendar,
  Lock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentLogs, setRecentLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    adminService.getDashboardMetrics().then(setStats);
    adminService.getAuditLogs().then((logs) => setRecentLogs(logs.slice(0, 5)));
  }, []);

  const platformGrowthData = [
    { month: 'Jun', parents: 1100, babies: 1250, appointments: 1800 },
    { month: 'Jul', parents: 1350, babies: 1520, appointments: 2300 },
    { month: 'Aug', parents: 1600, babies: 1890, appointments: 2900 },
    { month: 'Sep', parents: 1850, babies: 2200, appointments: 3500 },
    { month: 'Oct', parents: 2050, babies: 2580, appointments: 4100 },
    { month: 'Nov', parents: 2190, babies: 2840, appointments: 4620 }
  ];

  return (
    <div className="space-y-8">
      {/* Enterprise Notice */}
      <div className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-base font-heading font-bold">Nurtura Enterprise Management Console</h2>
          </div>
          <p className="text-xs text-zinc-400">
            Platform governance, pediatrician verification audits, and HIPAA-ready telemetry prototype.
          </p>
        </div>
        <Link to="/admin/verifications">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
            Review 14 Pending Doctors
          </Button>
        </Link>
      </div>

      {/* METRIC KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-zinc-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Total Users</span>
          <div className="text-2xl font-heading font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.totalUsers.toLocaleString() || '2,480'}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14% Month-over-Month
          </p>
        </Card>

        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-zinc-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Registered Parents</span>
          <div className="text-2xl font-heading font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.totalParents.toLocaleString() || '2,190'}
          </div>
          <p className="text-[11px] text-zinc-500">Active parent cohort</p>
        </Card>

        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-zinc-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Verified Pediatricians</span>
          <div className="text-2xl font-heading font-bold text-emerald-600">
            {stats?.verifiedDoctors || '185'} MDs
          </div>
          <p className="text-[11px] text-zinc-500">Credentials approved</p>
        </Card>

        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-amber-300 bg-amber-50/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Verification Pending</span>
          <div className="text-2xl font-heading font-bold text-amber-600">
            {stats?.pendingDoctors || '14'} Applications
          </div>
          <p className="text-[11px] text-amber-700 font-semibold">Action required</p>
        </Card>

        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-zinc-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Baby Health Profiles</span>
          <div className="text-2xl font-heading font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.babyProfiles.toLocaleString() || '2,840'}
          </div>
          <p className="text-[11px] text-zinc-500">Total active infants</p>
        </Card>

        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-zinc-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Total Consultations</span>
          <div className="text-2xl font-heading font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.totalAppointments.toLocaleString() || '4,620'}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">Clinic & video</p>
        </Card>

        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-zinc-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Active Accounts</span>
          <div className="text-2xl font-heading font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.activeAccounts.toLocaleString() || '2,410'}
          </div>
          <p className="text-[11px] text-zinc-500">97.2% health score</p>
        </Card>

        <Card className="p-4 space-y-1 bg-white dark:bg-darkBg-card border-zinc-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Suspended Accounts</span>
          <div className="text-2xl font-heading font-bold text-rose-600">
            {stats?.suspendedAccounts || '8'}
          </div>
          <p className="text-[11px] text-zinc-500">Security enforcement</p>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card className="p-6 space-y-4 border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-heading font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Platform Adoption Velocity (6-Month Trend)
            </h3>
            <p className="text-xs text-zinc-500">Parents, Infant Profiles & Pediatric Consultations</p>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={platformGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="parentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="babyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '0.75rem',
                  border: '1px solid #e4e4e7',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="parents" stroke="#10b981" fillOpacity={1} fill="url(#parentGrad)" />
              <Area type="monotone" dataKey="babies" stroke="#6366f1" fillOpacity={1} fill="url(#babyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Audit Log Snippet */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-heading font-bold text-zinc-900 dark:text-zinc-100">
            Recent System Audit Trail
          </h3>
          <Link to="/admin/audit-logs" className="text-xs font-semibold text-emerald-600 hover:underline">
            View All Audit Logs →
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:bg-darkBg-card shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-darkBg-surface border-b border-zinc-200 text-zinc-500 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-mono text-[11px]">
              {recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-2.5 px-4 text-zinc-500">{log.timestamp}</td>
                  <td className="py-2.5 px-4 font-bold text-zinc-900 dark:text-zinc-100">{log.userName}</td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-semibold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-zinc-600">{log.target}</td>
                  <td className="py-2.5 px-4 text-zinc-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
