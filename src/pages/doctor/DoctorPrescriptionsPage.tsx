import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { doctorService } from '../../services/doctorService';
import { Prescription } from '../../types';
import { Pill, Plus, CheckCircle2, ShieldAlert, FileText, Trash2 } from 'lucide-react';

export const DoctorPrescriptionsPage: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [babyName, setBabyName] = useState('Aarav Sharma');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for multi-item prescription
  const [medicines, setMedicines] = useState([
    {
      name: 'Cholecalciferol (Vitamin D3) Pediatric Drops',
      dosage: '400 IU (1 ml)',
      frequency: 'Once a day',
      duration: 'Ongoing until 12 months',
      instructions: 'Give orally after morning feed'
    }
  ]);

  const loadPrescriptions = async () => {
    const list = await doctorService.getPrescriptions();
    setPrescriptions(list);
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const handleAddMedicineRow = () => {
    setMedicines((prev) => [
      ...prev,
      {
        name: '',
        dosage: '',
        frequency: 'Twice daily',
        duration: '7 days',
        instructions: ''
      }
    ]);
  };

  const handleRemoveRow = (idx: number) => {
    if (medicines.length <= 1) return;
    setMedicines((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleMedicineChange = (idx: number, field: string, val: string) => {
    setMedicines((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleSavePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    await doctorService.createPrescription({
      babyId: 'baby-1',
      babyName,
      doctorId: 'user-doctor-1',
      doctorName: 'Dr. Ananya Sharma, MD, DCH',
      date: new Date().toISOString().split('T')[0],
      medicines,
      doctorSignatureRequired: false,
      notes: 'Prescribed during clinical pediatric encounter'
    });

    setSaveSuccess(true);
    loadPrescriptions();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader
        title="Pediatric Prescriptions"
        subtitle="Digital clinical prescription builder with explicit dosing and parent instructions"
      />

      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Clinician Authorization Requirement:</strong> All prescriptions generated in Nurtura are signed under the attending physician’s medical license. Verify weight-based pediatric dosing before signing.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Prescription successfully verified, digitally signed, and delivered to parent portal!</span>
        </div>
      )}

      {/* Prescription Form */}
      <Card className="p-6 sm:p-8 space-y-6 border-slate-200 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-darkBg-border gap-2">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-cream-100">
              New Pediatric Prescription Form
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Patient:</span>
            <select
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              className="py-1 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white dark:bg-darkBg-surface"
            >
              <option value="Aarav Sharma">Aarav Sharma (6M • 7.8 kg)</option>
              <option value="Tara Sharma">Tara Sharma (2Y • 12.4 kg)</option>
              <option value="Liam Patel">Liam Patel (3.5M • 6.2 kg)</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleSavePrescription} className="space-y-6">
          <div className="space-y-4">
            {medicines.map((med, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-darkBg-surface border border-slate-200/80 dark:border-darkBg-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Medicine Item #{idx + 1}
                  </span>
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      className="text-stone-400 hover:text-rose-600 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Medicine Name & Formulation"
                    placeholder="e.g. Paracetamol Pediatric Suspension (120mg/5ml)"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                    required
                  />
                  <Input
                    label="Prescribed Dosage"
                    placeholder="e.g. 2.5 ml (~15mg/kg)"
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Frequency"
                    placeholder="e.g. Every 6 hours as needed for fever"
                    value={med.frequency}
                    onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                    required
                  />
                  <Input
                    label="Duration"
                    placeholder="e.g. 3–5 days"
                    value={med.duration}
                    onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Specific Parental Instructions"
                  placeholder="e.g. Give with feed. Shake bottle well. Do not exceed 4 doses in 24 hours."
                  value={med.instructions}
                  onChange={(e) => handleMedicineChange(idx, 'instructions', e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddMedicineRow}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Another Medicine Item
          </Button>

          <div className="pt-4 border-t border-slate-100 dark:border-darkBg-border flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Dr. Ananya Sharma • License: MED-REG-847291
            </span>
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white">
              Authorize & Sign Prescription
            </Button>
          </div>
        </form>
      </Card>

      {/* Issued Prescriptions Archive */}
      <div className="space-y-4">
        <h3 className="text-base font-heading font-bold text-slate-900 dark:text-cream-100">
          Issued Prescriptions
        </h3>

        <div className="space-y-4">
          {prescriptions.map((p) => (
            <Card key={p.id} className="p-6 space-y-4 border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-darkBg-border text-xs">
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-cream-100 text-sm">
                    Prescription for {p.babyName}
                  </h4>
                  <p className="text-[11px] text-slate-400">Issued: {p.date} • Prescriber: {p.doctorName}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                  Authorized & Active
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-darkBg-border">
                {p.medicines.map((m, i) => (
                  <div key={i} className="py-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-cream-100 block">{m.name}</span>
                      <span className="text-slate-500 text-[11px]">Instructions: {m.instructions}</span>
                    </div>
                    <div className="text-left sm:text-right font-mono text-[11px] text-slate-600">
                      <span>{m.dosage} • {m.frequency}</span>
                      <span className="block text-slate-400">{m.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
