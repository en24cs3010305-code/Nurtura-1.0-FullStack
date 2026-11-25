import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { trackingService } from '../../services/trackingService';
import { SleepLog } from '../../types';
import { Moon, Plus, Sun, Clock, Sparkles } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const SleepTrackerPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [sleeps, setSleeps] = useState<SleepLog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('15:30');
  const [type, setType] = useState<'nap' | 'night'>('nap');
  const [quality, setQuality] = useState<'peaceful' | 'restless' | 'interrupted'>('peaceful');
  const [notes, setNotes] = useState('');

  const loadSleeps = async () => {
    if (!selectedBaby) return;
    const logs = await trackingService.getSleepLogs(selectedBaby.id);
    setSleeps(logs);
  };

  useEffect(() => {
    loadSleeps();
  }, [selectedBaby]);

  const handleAddSleep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addSleepLog({
      babyId: selectedBaby.id,
      date,
      startTime,
      endTime,
      durationMinutes: 90,
      type,
      quality,
      notes: notes || undefined
    });
    setModalOpen(false);
    loadSleeps();
  };

  const weeklySleepData = [
    { day: 'Mon', hours: 13.5 },
    { day: 'Tue', hours: 14.0 },
    { day: 'Wed', hours: 13.2 },
    { day: 'Thu', hours: 14.5 },
    { day: 'Fri', hours: 13.8 },
    { day: 'Sat', hours: 14.2 },
    { day: 'Sun', hours: 13.5 }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Sleep Tracker"
        subtitle={`Daytime nap architecture and nighttime sleep monitoring for ${selectedBaby?.name || 'baby'}`}
        actions={
          <Button size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Log Sleep
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total 24h Sleep</span>
          <div className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            13.5 Hours
          </div>
          <p className="text-xs text-emerald-600 font-medium">Ideal range for 6 months (12–15 hrs)</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Nighttime Stretch</span>
          <div className="text-2xl font-heading font-bold text-purple-700 dark:text-purple-300">
            10.25 Hours
          </div>
          <p className="text-xs text-stone-400">20:30 – 06:45 (Slept through)</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Daytime Naps</span>
          <div className="text-2xl font-heading font-bold text-amber-700 dark:text-amber-300">
            2 Naps (3.0 hrs total)
          </div>
          <p className="text-xs text-stone-400">Consistent wake windows</p>
        </Card>
      </div>

      {/* Sleep Bar Chart */}
      <Card className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-600" />
            Weekly Total Sleep Duration (Hours)
          </h3>
          <span className="text-xs text-stone-400">Target: ~13–14 hrs</span>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySleepData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eeeaf5" opacity={0.6} />
              <XAxis dataKey="day" stroke="#78847E" fontSize={11} />
              <YAxis stroke="#78847E" fontSize={11} domain={[0, 16]} unit="h" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '0.75rem',
                  border: '1px solid #DED5EB',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="hours" fill="#C5B5DC" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Sleep History Table */}
      <div className="space-y-3">
        <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
          Sleep Sessions History
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-darkBg-border shadow-soft bg-white dark:bg-darkBg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-darkBg-surface border-b border-stone-200 dark:border-darkBg-border text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Start – End</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Sleep Quality</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-darkBg-border">
              {sleeps.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50/50 dark:hover:bg-darkBg-surface transition-colors">
                  <td className="py-3 px-4 font-medium">{s.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md font-bold uppercase text-[10px] bg-lavender-100 text-purple-800">
                      {s.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{s.startTime} – {s.endTime}</td>
                  <td className="py-3 px-4 font-bold text-nurturaText-primary dark:text-cream-100">
                    {Math.floor(s.durationMinutes / 60)}h {s.durationMinutes % 60}m
                  </td>
                  <td className="py-3 px-4 capitalize">{s.quality}</td>
                  <td className="py-3 px-4 text-stone-500 italic">{s.notes || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sleep Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Log Sleep Session">
        <form onSubmit={handleAddSleep} className="space-y-4">
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sleep Start"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <Input
              label="Wake-Up Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">Session Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-sm py-2.5 px-3"
              >
                <option value="nap">Daytime Nap</option>
                <option value="night">Nighttime Sleep</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">Sleep Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as any)}
                className="w-full bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-sm py-2.5 px-3"
              >
                <option value="peaceful">Peaceful</option>
                <option value="restless">Restless</option>
                <option value="interrupted">Interrupted</option>
              </select>
            </div>
          </div>

          <Input
            label="Notes"
            placeholder="Fell asleep easily with gentle lullaby..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Sleep</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
