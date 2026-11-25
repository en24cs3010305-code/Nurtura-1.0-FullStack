import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { Settings, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const DoctorSettingsPage: React.FC = () => {
  const [slotDuration, setSlotDuration] = useState('30');
  const [allowTelehealth, setAllowTelehealth] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Clinical Settings"
        subtitle="Manage consultation schedule slots, tele-health parameters, and clinical alerts"
      />

      {saved && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Consultation schedule preferences saved successfully!</span>
        </div>
      )}

      <Card className="p-6 space-y-5 border-slate-200">
        <h3 className="text-sm font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
          Consultation Slot Configuration
        </h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Standard Encounter Duration</label>
            <select
              value={slotDuration}
              onChange={(e) => setSlotDuration(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs py-2 px-3"
            >
              <option value="20">20 Minutes</option>
              <option value="30">30 Minutes (Recommended)</option>
              <option value="45">45 Minutes (Comprehensive Assessment)</option>
            </select>
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-semibold text-slate-800 block">Offer Video Tele-Consultations</span>
              <span className="text-slate-400">Allow parents to book virtual follow-up appointments</span>
            </div>
            <input
              type="checkbox"
              checked={allowTelehealth}
              onChange={(e) => setAllowTelehealth(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
          </label>

          <div className="flex justify-end pt-2">
            <Button size="sm" type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white">
              Save Clinic Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
