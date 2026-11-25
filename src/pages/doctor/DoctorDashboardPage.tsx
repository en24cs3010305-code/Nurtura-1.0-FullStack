import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { Appointment } from '../../types';
import {
  Users,
  Calendar,
  UserPlus,
  AlertTriangle,
  Stethoscope,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  TrendingUp,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DoctorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadDoctorData = async () => {
      const [pts, apts] = await Promise.all([
        doctorService.getPatients(),
        appointmentService.getAppointments()
      ]);
      setPatients(pts);
      setAppointments(apts);
    };
    loadDoctorData();
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.baby.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.parent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Clinical Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sage-800 to-sage-900 text-white p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Pediatric Practitioner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">
            Welcome, {user?.name || 'Dr. Ananya Sharma'}
          </h1>
          <p className="text-xs sm:text-sm text-sage-200 font-normal">
            {user?.doctorDetails?.clinicOrHospital || 'Blossom Children’s Hospital & Care Clinic'} • Pediatric Workspace
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/doctor/clinical-notes">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" leftIcon={<FileSpreadsheet className="w-4 h-4" />}>
              Create SOAP Note
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Authorized Patients</span>
          <div className="text-2xl font-heading font-bold text-slate-800 dark:text-cream-100">
            {patients.length + 18} Active
          </div>
          <p className="text-[10px] text-emerald-600 font-medium">Under pediatric care</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today's Visits</span>
          <div className="text-2xl font-heading font-bold text-slate-800 dark:text-cream-100">
            4 Consults
          </div>
          <p className="text-[10px] text-slate-400">2 in-person, 2 video</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Requests</span>
          <div className="text-2xl font-heading font-bold text-amber-700 dark:text-amber-300">
            2 Requests
          </div>
          <p className="text-[10px] text-amber-700 font-medium">Requires approval</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Follow-Ups</span>
          <div className="text-2xl font-heading font-bold text-indigo-700 dark:text-indigo-300">
            6 Next Week
          </div>
          <p className="text-[10px] text-slate-400">Routine immunizations</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Health Alerts</span>
          <div className="text-2xl font-heading font-bold text-rose-600">
            1 Alert
          </div>
          <p className="text-[10px] text-rose-600 font-medium">Mild food sensitivity</p>
        </Card>
      </div>

      {/* Main Grid: Patients List & Appointments Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Patient List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-cream-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Patient Registry
            </h3>

            {/* Quick search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search patient or parent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkBg-border text-xs bg-white dark:bg-darkBg-card focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredPatients.map((item, idx) => (
              <Card key={idx} hoverEffect className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.baby.avatarUrl || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=128'}
                      alt={item.baby.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-cream-100">
                          {item.baby.name}
                        </h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.baby.ageText}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Parent: <strong>{item.parent.name}</strong> • Phone: {item.parent.phone}
                      </p>
                    </div>
                  </div>

                  <Link to="/doctor/clinical-notes">
                    <Button size="sm" variant="soft" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      SOAP Note
                    </Button>
                  </Link>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkBg-surface border border-slate-100 dark:border-darkBg-border text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Current Weight: <strong>{item.baby.currentWeightKg} kg</strong></span>
                    <span>Length: <strong>{item.baby.currentHeightCm} cm</strong></span>
                    <span>Next Visit: <strong className="text-emerald-700">{item.nextAppointment}</strong></span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/50">
                    Observation: {item.primaryNotes}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Today's Appointments & Patient Requests (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today's Schedule */}
          <div className="space-y-3">
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-cream-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Upcoming Consultations
            </h3>

            <div className="space-y-3">
              {appointments.slice(0, 3).map((apt) => (
                <Card key={apt.id} className="p-4 space-y-2 border-l-4 border-l-emerald-600">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-cream-100">
                      {apt.babyName} ({apt.parentName})
                    </span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                      {apt.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{apt.reason}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{apt.date} • {apt.type === 'video' ? 'Tele-Consultation' : 'Clinic Visit'}</span>
                    <span className="font-semibold text-emerald-600 capitalize">{apt.status}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Pending Patient Requests */}
          <div className="space-y-3">
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-cream-100 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-600" />
              New Patient Requests
            </h3>

            <Card className="p-4 space-y-3 border-amber-200 bg-amber-50/40 dark:bg-darkBg-card">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-cream-100">Baby Maya Gupta (4 Months)</h4>
                  <p className="text-[11px] text-slate-500">Parent: Rahul Gupta • Requesting pediatrician link</p>
                </div>
                <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md">
                  New
                </span>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-amber-200/50">
                <Button size="sm" variant="ghost" className="text-xs">
                  Decline
                </Button>
                <Button size="sm" variant="primary" className="bg-emerald-700 hover:bg-emerald-800 text-xs">
                  Accept Patient
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
