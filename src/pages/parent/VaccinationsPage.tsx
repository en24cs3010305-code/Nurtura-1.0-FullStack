import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { vaccinationService } from '../../services/vaccinationService';
import { Vaccination } from '../../types';
import {
  ShieldCheck,
  Calendar,
  AlertCircle,
  Plus,
  CheckCircle2,
  Clock,
  Building
} from 'lucide-react';

export const VaccinationsPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [vaccines, setVaccines] = useState<Vaccination[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [modalOpen, setModalOpen] = useState(false);

  // Add custom vaccination fields
  const [vacName, setVacName] = useState('');
  const [diseaseTarget, setDiseaseTarget] = useState('');
  const [ageLabel, setAgeLabel] = useState('6 Months');
  const [dueDate, setDueDate] = useState('2026-11-28');

  const loadVaccines = async () => {
    if (!selectedBaby) return;
    const list = await vaccinationService.getVaccinations(selectedBaby.id);
    setVaccines(list);
  };

  useEffect(() => {
    loadVaccines();
  }, [selectedBaby]);

  const handleAddVaccine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await vaccinationService.addCustomVaccination({
      babyId: selectedBaby.id,
      vaccineName: vacName,
      diseaseTarget,
      recommendedAgeMonths: 6,
      recommendedAgeLabel: ageLabel,
      dueDate,
      status: 'upcoming'
    });
    setModalOpen(false);
    loadVaccines();
  };

  const handleMarkAdministered = async (id: string) => {
    await vaccinationService.updateVaccinationStatus(id, 'completed', new Date().toISOString().split('T')[0]);
    loadVaccines();
  };

  const upcomingList = vaccines.filter((v) => v.status === 'upcoming');
  const completedList = vaccines.filter((v) => v.status === 'completed');
  const pendingList = vaccines.filter((v) => v.status === 'pending');

  const displayedList =
    activeTab === 'upcoming'
      ? upcomingList
      : activeTab === 'completed'
      ? completedList
      : vaccines;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Vaccination Management"
        subtitle={`Immunization schedule and verified clinical records for ${selectedBaby?.name || 'baby'}`}
        actions={
          <Button size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Custom Vaccine
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-darkBg-border pb-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeTab === 'upcoming'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          Upcoming ({upcomingList.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeTab === 'completed'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Completed ({completedList.length})
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100'
          }`}
        >
          All Timeline ({vaccines.length})
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedList.map((vac) => {
          const isCompleted = vac.status === 'completed';
          const isUpcoming = vac.status === 'upcoming';

          return (
            <Card key={vac.id} className="space-y-4 relative border-l-4 border-l-sage-600">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-stone-100 dark:bg-darkBg-surface text-stone-600 dark:text-stone-300">
                      {vac.recommendedAgeLabel}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isUpcoming
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {vac.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                    {vac.vaccineName}
                  </h3>
                  <p className="text-xs text-nurturaText-secondary">Protects against: {vac.diseaseTarget}</p>
                </div>

                <div className="w-9 h-9 rounded-xl bg-sage-50 dark:bg-sage-950 flex items-center justify-center text-sage-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-darkBg-surface border border-stone-100 dark:border-darkBg-border text-xs space-y-1">
                <div className="flex items-center justify-between text-stone-500">
                  <span>Scheduled Due Date:</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">{vac.dueDate}</span>
                </div>
                {vac.administeredDate && (
                  <div className="flex items-center justify-between text-stone-500">
                    <span>Administered Date:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{vac.administeredDate}</span>
                  </div>
                )}
                {vac.batchNumber && (
                  <div className="flex items-center justify-between text-stone-500 font-mono text-[11px]">
                    <span>Batch Number:</span>
                    <span>{vac.batchNumber}</span>
                  </div>
                )}
                {vac.clinicName && (
                  <div className="flex items-center justify-between text-stone-500">
                    <span>Clinic:</span>
                    <span>{vac.clinicName}</span>
                  </div>
                )}
              </div>

              {isUpcoming && (
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-darkBg-border">
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={() => handleMarkAdministered(vac.id)}
                    leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  >
                    Mark as Given
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Add Custom Vaccine Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Vaccination Schedule Item">
        <form onSubmit={handleAddVaccine} className="space-y-4">
          <Input
            label="Vaccine Name"
            placeholder="MMR Dose 1"
            value={vacName}
            onChange={(e) => setVacName(e.target.value)}
            required
          />
          <Input
            label="Target Disease / Protection"
            placeholder="Measles, Mumps, Rubella"
            value={diseaseTarget}
            onChange={(e) => setDiseaseTarget(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age Label"
              placeholder="9 Months or 12 Months"
              value={ageLabel}
              onChange={(e) => setAgeLabel(e.target.value)}
              required
            />
            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Vaccine</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
