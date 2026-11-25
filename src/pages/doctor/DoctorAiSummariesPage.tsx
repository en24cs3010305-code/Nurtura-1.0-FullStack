import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { Sparkles, Bot, CheckCircle2, ShieldCheck, ArrowRight, User } from 'lucide-react';

export const DoctorAiSummariesPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('Aarav Sharma');
  const [generating, setGenerating] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(true);

  const handleRegenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setSummaryGenerated(true);
    }, 700);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader
        title="Clinical AI Pre-Consultation Summaries"
        subtitle="Automated synthesis of multi-week feeding, sleep, and milestone data for rapid pre-visit prep"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">Synthesize Logs for:</span>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
          >
            <option value="Aarav Sharma">Aarav Sharma (6 Months • Well Child Visit)</option>
            <option value="Tara Sharma">Tara Sharma (2 Years • Routine Review)</option>
            <option value="Liam Patel">Liam Patel (3.5 Months • Colic History)</option>
          </select>
        </div>

        <Button
          size="sm"
          variant="soft"
          onClick={handleRegenerate}
          isLoading={generating}
          leftIcon={<Sparkles className="w-3.5 h-3.5" />}
        >
          Regenerate Longitudinal Synthesis
        </Button>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 border-slate-200 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-heading font-bold text-slate-900">
              Pre-Consultation Brief: {selectedPatient}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
            Synthesized from 120+ Parent Logs
          </span>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500">1. Growth Trajectory</span>
            <p>
              Weight velocity is strictly consistent with WHO 55th–56th percentiles (current 7.8 kg vs 6.8 kg at 4 months, representing ~1.0 kg gain over 60 days). Head circumference velocity is normative (+1.7 cm over 60 days).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500">2. Nutrition & Feeding Patterns</span>
            <p>
              Mother reports combo nursing and expressed bottle feeds (~4–5 sessions per 24 hours, average bottle volume 150 ml). Successfully initiated single-ingredient sweet potato puree without gastrointestinal upset or reflux.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500">3. Sleep Architecture & Milestones</span>
            <p>
              Consolidating nighttime sleep stretches of 6.5–7 hours. Day sleep averages 2 naps totaling ~3 hours. Gross motor milestones include reliable tummy-to-back rolling and emerging independent sitting with tripod hand support.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-amber-700">4. Recommended Action Items for Today's Visit</span>
            <ul className="space-y-1">
              <li>• Administer scheduled 6-month hexavalent immunization booster & influenza.</li>
              <li>• Review allergen introduction protocol (peanut/egg purees in small supervised increments).</li>
              <li>• Assess spinal tone and forward reach during sitting exam.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
