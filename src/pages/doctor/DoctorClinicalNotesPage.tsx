import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { doctorService } from '../../services/doctorService';
import { ClinicalSoapNote } from '../../types';
import { FileSpreadsheet, Plus, CheckCircle2, ShieldCheck, Clock, User } from 'lucide-react';

export const DoctorClinicalNotesPage: React.FC = () => {
  const [soapNotes, setSoapNotes] = useState<ClinicalSoapNote[]>([]);
  const [babyName, setBabyName] = useState('Aarav Sharma');
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadNotes = async () => {
    const list = await doctorService.getSoapNotes();
    setSoapNotes(list);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjective || !objective || !assessment || !plan) return;

    await doctorService.saveSoapNote({
      babyId: 'baby-1',
      babyName,
      doctorId: 'user-doctor-1',
      doctorName: 'Dr. Ananya Sharma',
      date: new Date().toISOString().split('T')[0],
      subjective,
      objective,
      assessment,
      plan
    });

    setSaveSuccess(true);
    setSubjective('');
    setObjective('');
    setAssessment('');
    setPlan('');
    loadNotes();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader
        title="Clinical SOAP Documentation"
        subtitle="Structured pediatric notes (Subjective, Objective, Assessment, Plan) with clinician authentication"
      />

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Clinical SOAP note successfully recorded and digitally signed!</span>
        </div>
      )}

      {/* Editor Form */}
      <Card className="p-6 sm:p-8 space-y-6 border-slate-200 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-darkBg-border gap-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-heading font-bold text-slate-800 dark:text-cream-100">
              New Pediatric SOAP Encounter Note
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Patient:</span>
            <select
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              className="py-1 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white dark:bg-darkBg-surface"
            >
              <option value="Aarav Sharma">Aarav Sharma (6M)</option>
              <option value="Tara Sharma">Tara Sharma (2Y)</option>
              <option value="Liam Patel">Liam Patel (3.5M)</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleSaveNote} className="space-y-5">
          {/* S - Subjective */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-center leading-5 text-[11px] font-black">
                S
              </span>
              Subjective (Parent's report, chief complaint, feeding & sleep history)
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Mother reports infant is feeding well on breastmilk with single-ingredient puree trial. Sleeping 6-7 hours stretch without nocturnal coughing..."
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              className="w-full p-3 bg-white dark:bg-darkBg-surface border border-slate-200 dark:border-darkBg-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* O - Objective */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-center leading-5 text-[11px] font-black">
                O
              </span>
              Objective (Vital signs, physical exam, weight/height percentiles)
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Weight: 7.8 kg (56th %ile). Length: 67.5 cm (58th %ile). Fontanelle flat/soft. Heart rate regular, no murmurs. Lungs clear bilaterally. Abdomen soft, non-distended..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-3 bg-white dark:bg-darkBg-surface border border-slate-200 dark:border-darkBg-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* A - Assessment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-center leading-5 text-[11px] font-black">
                A
              </span>
              Assessment (Clinical diagnosis, milestone evaluation, nutritional state)
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Well 6-month-old infant thriving with appropriate developmental velocity. Age-appropriate motor tone with good tripod sitting..."
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              className="w-full p-3 bg-white dark:bg-darkBg-surface border border-slate-200 dark:border-darkBg-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* P - Plan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-center leading-5 text-[11px] font-black">
                P
              </span>
              Plan (Immunizations, nutritional guidance, medication, follow-up timeline)
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. 1. Administer 6-month hexavalent booster and seasonal influenza.\n2. Continue daily Vitamin D3 400 IU.\n3. Return at 9 months for routine developmental check."
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 bg-white dark:bg-darkBg-surface border border-slate-200 dark:border-darkBg-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-darkBg-border">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Signed by Dr. Ananya Sharma (MED-REG-847291)</span>
            </div>
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white">
              Save & Sign SOAP Note
            </Button>
          </div>
        </form>
      </Card>

      {/* Historical SOAP Records */}
      <div className="space-y-4">
        <h3 className="text-base font-heading font-bold text-slate-900 dark:text-cream-100">
          Encounter History Records
        </h3>

        <div className="space-y-4">
          {soapNotes.map((note) => (
            <Card key={note.id} className="p-6 space-y-4 border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-darkBg-border text-xs">
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-cream-100 text-sm">
                    {note.babyName} • Encounter Note
                  </h4>
                  <p className="text-[11px] text-slate-500">Date: {note.date} • Attending: {note.doctorName}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Signed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkBg-surface space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200 uppercase text-[10px]">Subjective</span>
                  <p className="text-slate-600 leading-relaxed">{note.subjective}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkBg-surface space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200 uppercase text-[10px]">Objective</span>
                  <p className="text-slate-600 leading-relaxed">{note.objective}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkBg-surface space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200 uppercase text-[10px]">Assessment</span>
                  <p className="text-slate-600 leading-relaxed">{note.assessment}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkBg-surface space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200 uppercase text-[10px]">Plan</span>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">{note.plan}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
