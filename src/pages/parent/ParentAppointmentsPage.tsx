import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import { appointmentService } from '../../services/appointmentService';
import { Appointment } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Plus,
  Stethoscope,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const ParentAppointmentsPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // Form states
  const [doctorName, setDoctorName] = useState('Dr. Ananya Sharma');
  const [date, setDate] = useState('2026-11-28');
  const [time, setTime] = useState('10:30 AM');
  const [type, setType] = useState<'in-person' | 'video'>('in-person');
  const [reason, setReason] = useState('6-Month Well-Baby Health & Vaccination Checkup');

  const loadAppointments = async () => {
    if (!selectedBaby) return;
    const list = await appointmentService.getAppointmentsForBaby(selectedBaby.id);
    setAppointments(list);
  };

  useEffect(() => {
    loadAppointments();
  }, [selectedBaby]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await appointmentService.bookAppointment({
      babyId: selectedBaby.id,
      babyName: selectedBaby.name,
      parentId: user?.id || 'user-parent-1',
      parentName: user?.name || 'Sarah Jenkins',
      doctorId: 'user-doctor-1',
      doctorName,
      specialization: 'Neonatology & Pediatrics',
      date,
      time,
      status: 'requested',
      type,
      reason,
      clinicAddress: type === 'in-person' ? 'Blossom Pediatric Clinic, Suite 402' : undefined
    });
    setBookModalOpen(false);
    loadAppointments();
  };

  const handleCancel = async (id: string) => {
    await appointmentService.updateAppointmentStatus(id, 'cancelled');
    loadAppointments();
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Doctor Appointments"
        subtitle={`Schedule and review pediatric consultations for ${selectedBaby?.name || 'baby'}`}
        actions={
          <Button size="sm" onClick={() => setBookModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Book Appointment
          </Button>
        }
      />

      {/* Available Pediatrician Profile Card */}
      <Card className="p-6 bg-gradient-to-r from-sage-50 to-cream-100 dark:from-darkBg-card dark:to-darkBg-surface border-sage-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256"
              alt="Dr. Ananya Sharma"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                  Dr. Ananya Sharma, MD, DCH
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Verified Pediatrician
                </span>
              </div>
              <p className="text-xs text-nurturaText-secondary">
                Specialist in Neonatology & Child Developmental Health • 12 Yrs Experience
              </p>
              <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" /> Blossom Children’s Hospital & Care Clinic
              </p>
            </div>
          </div>
          <Button size="sm" onClick={() => setBookModalOpen(true)}>
            Select Consultation
          </Button>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
          Scheduled & Past Appointments
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((apt) => {
            const isConfirmed = apt.status === 'confirmed';
            const isRequested = apt.status === 'requested';
            const isCompleted = apt.status === 'completed';
            const isCancelled = apt.status === 'cancelled';

            return (
              <Card key={apt.id} className="space-y-4 border-l-4 border-l-sage-600">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          isConfirmed
                            ? 'bg-emerald-100 text-emerald-800'
                            : isRequested
                            ? 'bg-amber-100 text-amber-800'
                            : isCompleted
                            ? 'bg-stone-100 text-stone-600'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                      <span className="text-[10px] text-stone-400 flex items-center gap-1 font-semibold">
                        {apt.type === 'video' ? <Video className="w-3 h-3 text-indigo-500" /> : <MapPin className="w-3 h-3 text-emerald-500" />}
                        {apt.type === 'video' ? 'Tele-Consultation' : 'In-Person Visit'}
                      </span>
                    </div>
                    <h4 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 mt-1">
                      {apt.doctorName}
                    </h4>
                    <p className="text-xs text-nurturaText-secondary font-medium">{apt.reason}</p>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-sage-50 dark:bg-darkBg-surface text-sage-600 flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-darkBg-surface border border-stone-100 dark:border-darkBg-border text-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                    <span className="font-semibold">{apt.date} at {apt.time}</span>
                    <span className="text-[11px] text-stone-400">Patient: {apt.babyName}</span>
                  </div>
                  {apt.clinicAddress && (
                    <p className="text-[11px] text-stone-500 flex items-center gap-1 pt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" /> {apt.clinicAddress}
                    </p>
                  )}
                  {apt.notes && (
                    <p className="text-[11px] text-stone-500 italic pt-1">
                      Pediatric Notes: "{apt.notes}"
                    </p>
                  )}
                </div>

                {!isCancelled && !isCompleted && (
                  <div className="flex justify-end gap-2 pt-1 border-t border-stone-100 dark:border-darkBg-border">
                    <Button size="sm" variant="outline" onClick={() => handleCancel(apt.id)}>
                      Cancel Visit
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Book Appointment Modal */}
      <Modal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} title="Book Pediatric Consultation">
        <form onSubmit={handleBook} className="space-y-4">
          <Input
            label="Doctor"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            disabled
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">Available Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-sm py-2.5 px-3"
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600">Consultation Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('in-person')}
                className={`py-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 ${
                  type === 'in-person' ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" /> In-Person Clinic
              </button>
              <button
                type="button"
                onClick={() => setType('video')}
                className={`py-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 ${
                  type === 'video' ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Video Call
              </button>
            </div>
          </div>

          <Input
            label="Reason for Visit"
            placeholder="Routine 6-month checkup, vaccination, feeding review..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setBookModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
