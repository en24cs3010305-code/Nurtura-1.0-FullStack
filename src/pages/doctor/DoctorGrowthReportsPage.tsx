import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { trackingService } from '../../services/trackingService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Scale, Info, CheckCircle2 } from 'lucide-react';

export const DoctorGrowthReportsPage: React.FC = () => {
  const [whoStandards, setWhoStandards] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('Aarav Sharma');

  useEffect(() => {
    trackingService.getWhoReferenceStandards().then(setWhoStandards);
  }, []);

  const chartData = whoStandards.map((std) => ({
    month: `${std.month}M`,
    'WHO 97th %ile': std.p97,
    'WHO 85th %ile': std.p85,
    'WHO 50th %ile (Median)': std.p50,
    'WHO 15th %ile': std.p15,
    'WHO 3rd %ile': std.p3,
    [`${selectedPatient} Actual`]: std.babyWeight || null
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Clinical Growth Analytics & WHO Standards"
        subtitle="Longitudinal percentile curves for clinical evaluation of infant nutritional velocity"
      />

      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-darkBg-card border border-slate-200">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">Patient Cohort:</span>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
          >
            <option value="Aarav Sharma">Aarav Sharma (6 Months, Male)</option>
            <option value="Tara Sharma">Tara Sharma (2 Years, Female)</option>
            <option value="Liam Patel">Liam Patel (3.5 Months, Male)</option>
          </select>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
          WHO Reference Standard: Boys 0–24 Months
        </span>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-cream-100 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            Weight-for-Age Percentile Curves
          </h3>
          <span className="text-xs text-slate-500">Clinical Interpretation: Normal Velocity (~56th %ile)</span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[2, 13]} unit="kg" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '1rem',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="WHO 97th %ile" stroke="#cbd5e1" strokeDasharray="4 4" dot={false} />
              <Line type="monotone" dataKey="WHO 85th %ile" stroke="#cbd5e1" strokeDasharray="2 2" dot={false} />
              <Line type="monotone" dataKey="WHO 50th %ile (Median)" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="WHO 15th %ile" stroke="#cbd5e1" strokeDasharray="2 2" dot={false} />
              <Line type="monotone" dataKey="WHO 3rd %ile" stroke="#cbd5e1" strokeDasharray="4 4" dot={false} />
              <Line
                type="monotone"
                dataKey={`${selectedPatient} Actual`}
                stroke="#0f766e"
                strokeWidth={3.5}
                dot={{ r: 5, fill: '#0f766e', strokeWidth: 2, stroke: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
