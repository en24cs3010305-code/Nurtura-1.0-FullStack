import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { doctorService } from '../../services/doctorService';
import { Link } from 'react-router-dom';
import { Users, Search, ArrowRight, Shield, AlertTriangle, Phone, Calendar } from 'lucide-react';

export const DoctorPatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    doctorService.getPatients().then(setPatients);
  }, []);

  const filtered = patients.filter((p) =>
    p.baby.name.toLowerCase().includes(search.toLowerCase()) ||
    p.parent.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Patients"
        subtitle="Active infant patient cohort with authorized parental health record sharing"
      />

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search by baby or parent name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-darkBg-border text-xs bg-white dark:bg-darkBg-card focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <Card key={idx} hoverEffect className="space-y-4 border-slate-200">
            <div className="flex items-center gap-3">
              <img
                src={item.baby.avatarUrl || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=128'}
                alt={item.baby.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-cream-100 truncate">
                  {item.baby.name}
                </h4>
                <p className="text-xs text-slate-500">{item.baby.ageText} • {item.baby.gender}</p>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  Blood Group: {item.baby.bloodGroup}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkBg-surface border border-slate-100 dark:border-darkBg-border text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Weight: <strong>{item.baby.currentWeightKg} kg</strong></span>
                <span>Length: <strong>{item.baby.currentHeightCm} cm</strong></span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Parent: <strong>{item.parent.name}</strong> ({item.parent.phone})
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">Allergies: {item.baby.allergies.join(', ') || 'None'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Next Checkup: {item.nextAppointment}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-darkBg-border flex gap-2">
              <Link to="/doctor/clinical-notes" className="flex-1">
                <Button size="sm" variant="soft" className="w-full text-xs">
                  SOAP Notes
                </Button>
              </Link>
              <Link to="/doctor/growth-reports" className="flex-1">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Growth Curve
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
