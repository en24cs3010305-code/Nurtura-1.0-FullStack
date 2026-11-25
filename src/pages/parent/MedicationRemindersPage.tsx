import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { medicationService } from '../../services/medicationService';
import { MedicationReminder } from '../../types';
import { Pill, Plus, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export const MedicationRemindersPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [reminders, setReminders] = useState<MedicationReminder[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('400 IU (1 ml)');
  const [frequency, setFrequency] = useState('Once daily');
  const [instructions, setInstructions] = useState('Administer after morning nursing');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('2027-05-20');
  const [time, setTime] = useState('09:00');

  const loadReminders = async () => {
    if (!selectedBaby) return;
    const list = await medicationService.getReminders(selectedBaby.id);
    setReminders(list);
  };

  useEffect(() => {
    loadReminders();
  }, [selectedBaby]);

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await medicationService.addReminder({
      babyId: selectedBaby.id,
      medicineName: name,
      dosage,
      frequency,
      instructions,
      startDate,
      endDate,
      reminderTimes: [time],
      status: 'active'
    });
    setModalOpen(false);
    loadReminders();
  };

  const handleToggleStatus = async (id: string, current: string) => {
    const nextStatus = current === 'active' ? 'completed' : 'active';
    await medicationService.toggleStatus(id, nextStatus as any);
    loadReminders();
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Medication Reminders"
        subtitle={`Pediatrician-prescribed vitamin drops and medicines for ${selectedBaby?.name || 'baby'}`}
        actions={
          <Button size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Reminder
          </Button>
        }
      />

      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-xs">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong>Important Clinical Advisory:</strong> Never administer medicines without direct instructions and dosage authorization from your licensed pediatrician. Nurtura does not recommend or compute medical dosages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reminders.map((r) => {
          const isActive = r.status === 'active';

          return (
            <Card key={r.id} className="space-y-4 border-l-4 border-l-amber-500">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {r.status}
                    </span>
                    <span className="text-[10px] text-stone-400 font-semibold">{r.frequency}</span>
                  </div>
                  <h4 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100 mt-1">
                    {r.medicineName}
                  </h4>
                  <p className="text-xs text-amber-900 dark:text-amber-200 font-medium">Dosage: {r.dosage}</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-darkBg-surface border border-stone-100 dark:border-darkBg-border text-xs space-y-1.5">
                <p className="text-nurturaText-secondary">
                  <strong>Instructions: </strong>{r.instructions}
                </p>
                <div className="flex items-center justify-between text-stone-500 pt-1 border-t border-stone-200/50">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Time: {r.reminderTimes.join(', ')}
                  </span>
                  <span>{r.startDate} to {r.endDate}</span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <Button
                  size="sm"
                  variant={isActive ? 'soft' : 'outline'}
                  onClick={() => handleToggleStatus(r.id, r.status)}
                >
                  {isActive ? 'Mark Routine Finished' : 'Reactivate Reminder'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Reminder Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Medication Reminder">
        <form onSubmit={handleAddReminder} className="space-y-4">
          <Input
            label="Prescribed Medicine / Vitamin Name"
            placeholder="Vitamin D3 Infant Drops"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Dosage"
              placeholder="400 IU (1 ml)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />
            <Input
              label="Frequency"
              placeholder="Once daily"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            />
          </div>

          <Input
            label="Instructions"
            placeholder="Give orally after morning feed"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <Input
              label="Reminder Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Reminder</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
