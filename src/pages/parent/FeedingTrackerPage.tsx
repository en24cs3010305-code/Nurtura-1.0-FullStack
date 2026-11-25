import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { trackingService } from '../../services/trackingService';
import { FeedingLog, FeedingType } from '../../types';
import {
  Utensils,
  Plus,
  Clock,
  Droplet,
  Heart,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const FeedingTrackerPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const { user } = useAuth();
  const [feedings, setFeedings] = useState<FeedingLog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [type, setType] = useState<FeedingType>('breast');
  const [duration, setDuration] = useState('20');
  const [quantity, setQuantity] = useState('150');
  const [side, setSide] = useState<'left' | 'right' | 'both'>('both');
  const [notes, setNotes] = useState('');

  const loadFeedings = async () => {
    if (!selectedBaby) return;
    const logs = await trackingService.getFeedingLogs(selectedBaby.id);
    setFeedings(logs);
  };

  useEffect(() => {
    loadFeedings();
  }, [selectedBaby]);

  const handleAddFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addFeedingLog({
      babyId: selectedBaby.id,
      date,
      time,
      type,
      durationMinutes: type === 'breast' ? Number(duration) : undefined,
      quantityMl: type !== 'breast' ? Number(quantity) : undefined,
      side: type === 'breast' ? side : undefined,
      notes: notes || undefined,
      loggedBy: user?.name || 'Parent'
    });
    setModalOpen(false);
    loadFeedings();
  };

  // Weekly aggregate data for chart
  const weeklyData = [
    { day: 'Mon', feeds: 6 },
    { day: 'Tue', feeds: 5 },
    { day: 'Wed', feeds: 7 },
    { day: 'Thu', feeds: 6 },
    { day: 'Fri', feeds: 5 },
    { day: 'Sat', feeds: 6 },
    { day: 'Sun', feeds: 5 }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Feeding Tracker"
        subtitle={`Track nursing durations, bottle feeds, and daily nutrition for ${selectedBaby?.name || 'baby'}`}
        actions={
          <Button size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Log Feeding
          </Button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Today's Feedings</span>
          <div className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            {feedings.length} Sessions
          </div>
          <p className="text-xs text-stone-400">Regular intervals maintained</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Primary Feed Type</span>
          <div className="text-2xl font-heading font-bold text-peach-700 dark:text-peach-300">
            Breastfeeding & Bottle
          </div>
          <p className="text-xs text-stone-400">Combo feeding smoothly</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Avg Session Duration</span>
          <div className="text-2xl font-heading font-bold text-sage-700 dark:text-sage-300">
            18–20 Minutes
          </div>
          <p className="text-xs text-emerald-600 font-medium">Optimal latch time</p>
        </Card>
      </div>

      {/* Weekly Feeding Pattern Chart */}
      <Card className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-peach-600" />
            Weekly Feed Count Distribution
          </h3>
          <span className="text-xs text-stone-400">Last 7 Days</span>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1d3c0" opacity={0.4} />
              <XAxis dataKey="day" stroke="#78847E" fontSize={11} />
              <YAxis stroke="#78847E" fontSize={11} domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '0.75rem',
                  border: '1px solid #F1D3C0',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="feeds" fill="#F1D3C0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Feeding History Table */}
      <div className="space-y-3">
        <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
          Feeding Logs
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-darkBg-border shadow-soft bg-white dark:bg-darkBg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-darkBg-surface border-b border-stone-200 dark:border-darkBg-border text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Duration / Quantity</th>
                <th className="py-3 px-4">Side / Details</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-darkBg-border">
              {feedings.map((f) => (
                <tr key={f.id} className="hover:bg-stone-50/50 dark:hover:bg-darkBg-surface transition-colors">
                  <td className="py-3 px-4 font-medium">{f.date} at {f.time}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md font-bold uppercase text-[10px] bg-peach-100 text-peach-800">
                      {f.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-nurturaText-primary dark:text-cream-100">
                    {f.type === 'breast' ? `${f.durationMinutes} min` : `${f.quantityMl} ml`}
                  </td>
                  <td className="py-3 px-4 capitalize">{f.side ? `${f.side} side` : 'Standard bottle'}</td>
                  <td className="py-3 px-4 text-stone-500 italic">{f.notes || 'No remarks'}</td>
                  <td className="py-3 px-4 text-stone-400">{f.loggedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Feeding Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Log Feeding Session">
        <form onSubmit={handleAddFeed} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Input
              label="Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600">Feeding Method</label>
            <div className="grid grid-cols-3 gap-2">
              {(['breast', 'formula', 'expressed'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
                    type === t ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200 text-stone-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {type === 'breast' ? (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Duration (Minutes)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-600">Nursing Side</label>
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value as any)}
                  className="w-full bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-sm py-2.5 px-3"
                >
                  <option value="both">Both Sides</option>
                  <option value="left">Left Side</option>
                  <option value="right">Right Side</option>
                </select>
              </div>
            </div>
          ) : (
            <Input
              label="Volume (ml)"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          )}

          <Input
            label="Notes"
            placeholder="Good appetite, burped well..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Feeding</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
