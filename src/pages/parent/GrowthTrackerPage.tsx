import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { trackingService } from '../../services/trackingService';
import { GrowthRecord } from '../../types';
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
import { Scale, Ruler, Brain, Plus, Info, TrendingUp } from 'lucide-react';

export const GrowthTrackerPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
  const [whoStandards, setWhoStandards] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [ageMonths, setAgeMonths] = useState('6');
  const [weight, setWeight] = useState('7.8');
  const [height, setHeight] = useState('67.5');
  const [headCirc, setHeadCirc] = useState('43.2');
  const [notes, setNotes] = useState('');

  const loadData = async () => {
    if (!selectedBaby) return;
    const [records, standards] = await Promise.all([
      trackingService.getGrowthRecords(selectedBaby.id),
      trackingService.getWhoReferenceStandards()
    ]);
    setGrowthRecords(records);
    setWhoStandards(standards);
  };

  useEffect(() => {
    loadData();
  }, [selectedBaby]);

  const handleAddMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addGrowthRecord({
      babyId: selectedBaby.id,
      date,
      ageInMonths: Number(ageMonths),
      weightKg: Number(weight),
      heightCm: Number(height),
      headCircumferenceCm: Number(headCirc),
      percentileWeight: 56,
      percentileHeight: 58,
      notes: notes || undefined
    });
    setModalOpen(false);
    loadData();
  };

  // Combine WHO standards with the baby's actual measured data for Recharts
  const chartData = whoStandards.map((std) => {
    const matchedRecord = growthRecords.find((r) => r.ageInMonths === std.month);
    return {
      month: `${std.month}M`,
      'WHO 97th %ile': std.p97,
      'WHO 50th %ile (Median)': std.p50,
      'WHO 3rd %ile': std.p3,
      [`${selectedBaby?.name || 'Baby'} Weight (kg)`]: matchedRecord ? matchedRecord.weightKg : (std.babyWeight || null)
    };
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Growth Tracker"
        subtitle={`WHO-standardized growth curves and developmental metrics for ${selectedBaby?.name || 'baby'}`}
        actions={
          <Button size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Measurement
          </Button>
        }
      />

      {/* Clinical Disclaimer banner */}
      <div className="p-4 rounded-2xl bg-sage-50/80 dark:bg-darkBg-card border border-sage-200/60 dark:border-darkBg-border flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-nurturaText-primary dark:text-cream-100">
            WHO Child Growth Standards Reference (Boys 0–12 Months)
          </span>
          <p className="text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Reference curves reflect World Health Organization median percentiles (3rd, 50th median, and 97th). Your baby’s actual measurements are displayed alongside the clinical reference curves for longitudinal comparison.
          </p>
        </div>
      </div>

      {/* Main Interactive Recharts Chart */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100 flex items-center gap-2">
              <Scale className="w-5 h-5 text-sage-600" />
              Weight-for-Age Trajectory
            </h3>
            <p className="text-xs text-stone-400">Kilograms vs. Age in Months</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto">
            Velocity: Healthy ~56th %ile
          </span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5efe9" />
              <XAxis dataKey="month" stroke="#78847E" fontSize={11} />
              <YAxis stroke="#78847E" fontSize={11} domain={[2, 13]} unit="kg" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '1rem',
                  border: '1px solid #C7DED3',
                  boxShadow: '0 4px 20px rgba(46,91,83,0.08)',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="WHO 97th %ile"
                stroke="#d1d5db"
                strokeDasharray="4 4"
                dot={false}
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey="WHO 50th %ile (Median)"
                stroke="#9BC3B3"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="WHO 3rd %ile"
                stroke="#d1d5db"
                strokeDasharray="4 4"
                dot={false}
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey={`${selectedBaby?.name || 'Baby'} Weight (kg)`}
                stroke="#2E5B53"
                strokeWidth={3.5}
                dot={{ r: 5, fill: '#2E5B53', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Historical Measurements Table */}
      <div className="space-y-3">
        <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
          Recorded Measurements History
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-darkBg-border shadow-soft bg-white dark:bg-darkBg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-darkBg-surface border-b border-stone-200 dark:border-darkBg-border text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">Weight (kg)</th>
                <th className="py-3 px-4">Length (cm)</th>
                <th className="py-3 px-4">Head Circ (cm)</th>
                <th className="py-3 px-4">Weight %ile</th>
                <th className="py-3 px-4">Clinical Observations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-darkBg-border">
              {growthRecords.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50/50 dark:hover:bg-darkBg-surface transition-colors">
                  <td className="py-3 px-4 font-medium">{r.date}</td>
                  <td className="py-3 px-4">{r.ageInMonths} months</td>
                  <td className="py-3 px-4 font-bold text-sage-700 dark:text-sage-300">{r.weightKg} kg</td>
                  <td className="py-3 px-4">{r.heightCm} cm</td>
                  <td className="py-3 px-4">{r.headCircumferenceCm} cm</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      ~{r.percentileWeight || 50}th
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-500 max-w-xs truncate">{r.notes || 'Normal routine check'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Growth Measurement Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Record New Growth Measurement">
        <form onSubmit={handleAddMeasurement} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Measurement Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Input
              label="Age (Months)"
              type="number"
              value={ageMonths}
              onChange={(e) => setAgeMonths(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Weight (kg)"
              type="number"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <Input
              label="Length (cm)"
              type="number"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <Input
              label="Head (cm)"
              type="number"
              step="0.1"
              value={headCirc}
              onChange={(e) => setHeadCirc(e.target.value)}
              required
            />
          </div>

          <Input
            label="Pediatric Notes (Optional)"
            placeholder="Measured at clinic well-child visit..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Measurement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
