import React, { useState } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Baby
} from 'lucide-react';

export const MedicalReportsPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [selectedReport, setSelectedReport] = useState<string>('full_summary');
  const [dateRange, setDateRange] = useState<string>('all_time');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const reportTypes = [
    { id: 'full_summary', label: 'Complete Baby Health Summary', desc: 'Holistic clinical profile including growth, feeding, sleep, and vaccines.' },
    { id: 'growth_report', label: 'Growth & Percentile Curve Report', desc: 'WHO-standardized weight, height, and head circumference history.' },
    { id: 'vaccination_report', label: 'Official Immunization Record', desc: 'Administered vaccines with lot numbers, dates, and doctor sign-offs.' },
    { id: 'feeding_report', label: 'Nutrition & Feeding Diary', desc: 'Breastfeeding durations, bottle intake volumes, and allergen notes.' },
    { id: 'sleep_report', label: 'Sleep Architecture Report', desc: 'Daytime naps, nighttime stretches, and wake window patterns.' }
  ];

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Medical Reports & Export"
        subtitle={`Generate verified PDF health summaries for daycares, travel, or pediatric checkups for ${selectedBaby?.name || 'baby'}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={<Printer className="w-3.5 h-3.5" />}>
              Print Report
            </Button>
            <Button size="sm" onClick={handleDownload} isLoading={isExporting} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Download PDF Report
            </Button>
          </div>
        }
      />

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Report package compiled and downloaded successfully (Prototype export simulation).</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Report selection */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="space-y-3">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-stone-500">
              1. Select Report Type
            </h3>
            <div className="space-y-2">
              {reportTypes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReport(r.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                    selectedReport === r.id
                      ? 'border-sage-600 bg-sage-50/80 dark:bg-darkBg-surface shadow-soft font-bold'
                      : 'border-stone-200 dark:border-darkBg-border hover:bg-stone-50 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                    <span>{r.label}</span>
                    {selectedReport === r.id && <FileCheck className="w-4 h-4 text-sage-600" />}
                  </div>
                  <p className="text-[11px] text-nurturaText-secondary dark:text-stone-400 font-normal mt-1 leading-snug">
                    {r.desc}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-stone-500">
              2. Date Range Scope
            </h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-xs py-2.5 px-3"
            >
              <option value="all_time">All Time (Birth to Present)</option>
              <option value="last_30_days">Past 30 Days</option>
              <option value="last_3_months">Past 3 Months</option>
              <option value="custom">Custom Date Range</option>
            </select>
          </Card>
        </div>

        {/* Right: Live Report Preview Document */}
        <div className="lg:col-span-7">
          <Card className="p-8 space-y-6 border border-stone-200 shadow-medium bg-white dark:bg-darkBg-surface">
            {/* Header Document Preview */}
            <div className="flex items-start justify-between pb-6 border-b border-stone-200 dark:border-darkBg-border">
              <div className="space-y-1">
                <span className="text-xl font-heading font-bold text-sage-800 dark:text-cream-50">
                  Nurtura Health Report
                </span>
                <p className="text-xs text-stone-400">Official Clinical Summary Document</p>
                <p className="text-[10px] text-stone-400 font-mono">Generated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right text-xs">
                <p className="font-bold text-nurturaText-primary dark:text-cream-100">Blossom Pediatric Clinic</p>
                <p className="text-stone-400">Dr. Ananya Sharma, MD, DCH</p>
              </div>
            </div>

            {/* Patient Header */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-darkBg-card border border-stone-100 dark:border-darkBg-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px]">Patient Name</span>
                <span className="font-bold">{selectedBaby?.name || 'Aarav Sharma'}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">DOB</span>
                <span className="font-bold">{selectedBaby?.dateOfBirth || '2026-05-15'}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Current Weight</span>
                <span className="font-bold">{selectedBaby?.currentWeightKg || 7.8} kg (~56th %ile)</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Blood Group</span>
                <span className="font-bold">{selectedBaby?.bloodGroup || 'O+'}</span>
              </div>
            </div>

            {/* Report Content Body Preview */}
            <div className="space-y-4 text-xs">
              <h4 className="font-heading font-bold text-nurturaText-primary dark:text-cream-100 text-sm border-b border-stone-100 dark:border-darkBg-border pb-1">
                Clinical Overview & Growth Assessment
              </h4>
              <p className="text-nurturaText-secondary leading-relaxed">
                Patient is a thriving 6-month-old infant exhibiting consistent, healthy weight and height velocity aligned with WHO reference standards (56th weight percentile, 58th length percentile). All primitive reflexes are resolving appropriately with emerging independent sitting and strong tripod support.
              </p>

              <h4 className="font-heading font-bold text-nurturaText-primary dark:text-cream-100 text-sm border-b border-stone-100 dark:border-darkBg-border pb-1 pt-2">
                Immunization Status
              </h4>
              <ul className="space-y-1 text-stone-600 dark:text-stone-300">
                <li>• BCG & Hepatitis B (Birth Dose): Administered May 16, 2026 (Verified)</li>
                <li>• 6-in-1 Hexavalent Dose 1 & 2: Administered July 16 & Sept 17, 2026 (Verified)</li>
                <li>• 6-Month Booster & Seasonal Influenza: Due Nov 28, 2026 (Scheduled)</li>
              </ul>
            </div>

            {/* Document Signature Sign-off */}
            <div className="pt-8 border-t border-stone-200 dark:border-darkBg-border flex items-center justify-between text-xs text-stone-400">
              <div>
                <p className="font-mono text-[10px]">DOC-ID: NURTURA-MED-894102-AARAV</p>
                <p>Nurtura Pediatric Protocol v3.0</p>
              </div>
              <div className="text-right">
                <div className="font-serif italic text-sm text-stone-700 dark:text-stone-200">
                  Dr. Ananya Sharma
                </div>
                <p className="text-[10px]">Electronically Signed Clinical Attestation</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
