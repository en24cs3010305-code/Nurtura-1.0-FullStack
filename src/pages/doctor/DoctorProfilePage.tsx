import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { Stethoscope, ShieldCheck, Building, Award, FileText, CheckCircle2 } from 'lucide-react';

export const DoctorProfilePage: React.FC = () => {
  const { user } = useAuth();
  const details = user?.doctorDetails;

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Doctor Profile & Verification"
        subtitle="Manage your public clinical identity, credentials, and hospital affiliations"
      />

      <Card className="p-8 space-y-6 border-slate-200 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256'}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-heading font-bold text-slate-900">
                  {user?.name || 'Dr. Ananya Sharma'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Approved Pediatrician
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {details?.qualification || 'MD, DCH (Pediatrics), FAAP'} • {details?.specialization || 'Neonatology'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {details?.yearsOfExperience || 12} Years Clinical Experience
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Medical Registration Number</span>
            <p className="font-mono font-bold text-slate-800 text-sm">{details?.registrationNumber || 'MED-REG-847291'}</p>
            <p className="text-emerald-600 font-medium text-[11px] flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3 h-3" /> State Medical Council Attested
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hospital Affiliation</span>
            <p className="font-bold text-slate-800 text-sm">{details?.clinicOrHospital || 'Blossom Children’s Hospital & Care Clinic'}</p>
            <p className="text-slate-400 text-[11px] pt-1">Active Staff Appointment</p>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Practitioner Bio</span>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {details?.bio || 'Board-certified pediatrician passionate about early infant developmental milestones, nutritional guidance, and proactive family-centered care.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Verified Document: <strong>{details?.documentName || 'medical_license_ananya_sharma.pdf'}</strong></span>
          </div>
          <span className="font-semibold text-emerald-700">Verified & Secure</span>
        </div>
      </Card>
    </div>
  );
};
