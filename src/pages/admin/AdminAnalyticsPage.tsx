import React from 'react';
import { Card } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { BarChart3, TrendingUp, Users, ShieldCheck, Activity } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const dailyFeedLogsData = [
    { day: 'Mon', count: 1420 },
    { day: 'Tue', count: 1650 },
    { day: 'Wed', count: 1580 },
    { day: 'Thu', count: 1720 },
    { day: 'Fri', count: 1890 },
    { day: 'Sat', count: 2100 },
    { day: 'Sun', count: 1980 }
  ];

  const distributionData = [
    { name: 'Breastfeeding', value: 48, color: '#F1D3C0' },
    { name: 'Formula Feeds', value: 32, color: '#C7DED3' },
    { name: 'Expressed Milk', value: 20, color: '#DED5EB' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Platform Telemetry & Clinical Analytics"
        subtitle="Aggregated population health trends and system throughput metrics"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Feed Logs */}
        <Card className="p-6 space-y-4 border-zinc-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Daily Event Throughput (Feeding & Sleep Logs)
            </h3>
            <span className="text-xs text-zinc-400">Past 7 Days</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyFeedLogsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    border: '1px solid #e4e4e7',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#2E5B53" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Nutritional Breakdown Pie Chart */}
        <Card className="p-6 space-y-4 border-zinc-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              Infant Nutritional Modality Breakdown
            </h3>
            <span className="text-xs text-zinc-400">Sample Cohort %</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
