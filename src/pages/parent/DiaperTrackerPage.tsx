import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { trackingService } from '../../services/trackingService';
import { DiaperLog } from '../../types';
import { Sparkles, Plus, Droplets, CheckCircle2 } from 'lucide-react';

export const DiaperTrackerPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [diapers, setDiapers] = useState<DiaperLog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [type, setType] = useState<'wet' | 'dirty' | 'mixed'>('wet');
  const [color, setColor] = useState('Mustard yellow');
  const [notes, setNotes] = useState('');

  const loadDiapers = async () => {
    if (!selectedBaby) return;
    const logs = await trackingService.getDiaperLogs(selectedBaby.id);
    setDiapers(logs);
  };

  useEffect(() => {
    loadDiapers();
  }, [selectedBaby]);

  const handleAddDiaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addDiaperLog({
      babyId: selectedBaby.id,
      date,
      time,
      type,
      color: type !== 'wet' ? color : undefined,
      notes: notes || undefined
    });
    setModalOpen(false);
    loadDiapers();
  };

  const wetCount = diapers.filter((d) => d.type === 'wet' || d.type === 'mixed').length;
  const dirtyCount = diapers.filter((d) => d.type === 'dirty' || d.type === 'mixed').length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Diaper Tracker"
        subtitle={`Hydration, bowel movements and hygiene tracking for ${selectedBaby?.name || 'baby'}`}
        actions={
          <Button size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Record Diaper
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Recorded Today</span>
          <div className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            {diapers.length} Changes
          </div>
          <p className="text-xs text-emerald-600 font-medium">Adequate daily hydration</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Wet Diapers</span>
          <div className="text-2xl font-heading font-bold text-blue-700 dark:text-blue-300">
            {wetCount} Wet
          </div>
          <p className="text-xs text-stone-400">Target: At least 4–6 daily</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Bowel Movements</span>
          <div className="text-2xl font-heading font-bold text-amber-800 dark:text-amber-300">
            {dirtyCount} Dirty / Mixed
          </div>
          <p className="text-xs text-stone-400">Normal consistency</p>
        </Card>
      </div>

      {/* History table */}
      <div className="space-y-3">
        <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
          Diaper Log Entries
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-darkBg-border shadow-soft bg-white dark:bg-darkBg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-darkBg-surface border-b border-stone-200 dark:border-darkBg-border text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Color / Stool Notes</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-darkBg-border">
              {diapers.map((d) => (
                <tr key={d.id} className="hover:bg-stone-50/50 dark:hover:bg-darkBg-surface transition-colors">
                  <td className="py-3 px-4 font-medium">{d.date} at {d.time}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md font-bold uppercase text-[10px] bg-softYellow-100 text-amber-900">
                      {d.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{d.color || 'Standard wet'}</td>
                  <td className="py-3 px-4 text-stone-500 italic">{d.notes || 'Normal'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Diaper Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Record Diaper Change">
        <form onSubmit={handleAddDiaper} className="space-y-4">
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
            <label className="text-xs font-semibold text-stone-600">Change Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['wet', 'dirty', 'mixed'] as const).map((t) => (
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

          {type !== 'wet' && (
            <Input
              label="Color / Consistency"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          )}

          <Input
            label="Notes (Optional)"
            placeholder="Skin healthy, no rash..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Diaper Record</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
