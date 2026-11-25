import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { appointmentService } from '../../services/appointmentService';
import { Appointment } from '../../types';
import { Calendar, Clock, MapPin, Video, CheckCircle2, XCircle } from 'lucide-react';

export const DoctorAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = async () => {
    const list = await appointmentService.getAppointments();
    setAppointments(list);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleUpdateStatus = async (id: string, status: Appointment['status']) => {
    await appointmentService.updateAppointmentStatus(id, status);
    loadAppointments();
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Consultation Calendar & Requests"
        subtitle="Review, approve, and manage pediatric appointments"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((apt) => (
          <Card key={apt.id} className="space-y-4 border-l-4 border-l-emerald-600">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                  apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                  apt.status === 'requested' ? 'bg-amber-100 text-amber-800' :
                  apt.status === 'completed' ? 'bg-stone-100 text-stone-600' : 'bg-rose-100 text-rose-800'
                }`}>
                  {apt.status}
                </span>
                <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-cream-100 mt-1">
                  Patient: {apt.babyName}
                </h4>
                <p className="text-xs text-slate-500">Parent: {apt.parentName} • {apt.reason}</p>
              </div>

              <div className="text-right text-xs">
                <span className="font-bold text-slate-800 dark:text-cream-100 block">{apt.time}</span>
                <span className="text-stone-400">{apt.date}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-darkBg-surface text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  {apt.type === 'video' ? <Video className="w-3.5 h-3.5 text-indigo-500" /> : <MapPin className="w-3.5 h-3.5 text-emerald-500" />}
                  {apt.type === 'video' ? 'Tele-Consultation Video' : 'In-Person Pediatric Clinic'}
                </span>
                {apt.clinicAddress && <span className="text-stone-400 truncate">{apt.clinicAddress}</span>}
              </div>
            </div>

            {apt.status === 'requested' && (
              <div className="flex justify-end gap-2 pt-1 border-t border-slate-100">
                <Button size="sm" variant="ghost" onClick={() => handleUpdateStatus(apt.id, 'cancelled')}>
                  Decline
                </Button>
                <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white" onClick={() => handleUpdateStatus(apt.id, 'confirmed')}>
                  Confirm Appointment
                </Button>
              </div>
            )}

            {apt.status === 'confirmed' && (
              <div className="flex justify-end gap-2 pt-1 border-t border-slate-100">
                <Button size="sm" variant="soft" onClick={() => handleUpdateStatus(apt.id, 'completed')}>
                  Mark Encounter Completed
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
