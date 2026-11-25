import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBaby } from '../../contexts/BabyContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { trackingService } from '../../services/trackingService';
import { appointmentService } from '../../services/appointmentService';
import { vaccinationService } from '../../services/vaccinationService';
import { FeedingLog, SleepLog, DiaperLog, Vaccination, Appointment } from '../../types';
import {
  Baby,
  Utensils,
  Moon,
  Sparkles,
  Scale,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Heart,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ParentOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { selectedBaby, babies, setSelectedBabyId } = useBaby();
  const { t } = useLanguage();

  const [feedings, setFeedings] = useState<FeedingLog[]>([]);
  const [sleeps, setSleeps] = useState<SleepLog[]>([]);
  const [diapers, setDiapers] = useState<DiaperLog[]>([]);
  const [vaccines, setVaccines] = useState<Vaccination[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Quick action modals
  const [feedModalOpen, setFeedModalOpen] = useState(false);
  const [sleepModalOpen, setSleepModalOpen] = useState(false);
  const [diaperModalOpen, setDiaperModalOpen] = useState(false);
  const [growthModalOpen, setGrowthModalOpen] = useState(false);

  // Form states for quick log modals
  const [feedType, setFeedType] = useState<'breast' | 'formula' | 'expressed'>('breast');
  const [feedDuration, setFeedDuration] = useState('15');
  const [feedQuantity, setFeedQuantity] = useState('120');
  const [feedNotes, setFeedNotes] = useState('');

  const [sleepType, setSleepType] = useState<'nap' | 'night'>('nap');
  const [sleepDuration, setSleepDuration] = useState('60');

  const [diaperType, setDiaperType] = useState<'wet' | 'dirty' | 'mixed'>('wet');

  const [growthWeight, setGrowthWeight] = useState('');
  const [growthHeight, setGrowthHeight] = useState('');

  const loadData = async () => {
    if (!selectedBaby) return;
    const [f, s, d, v, a] = await Promise.all([
      trackingService.getFeedingLogs(selectedBaby.id),
      trackingService.getSleepLogs(selectedBaby.id),
      trackingService.getDiaperLogs(selectedBaby.id),
      vaccinationService.getVaccinations(selectedBaby.id),
      appointmentService.getAppointmentsForBaby(selectedBaby.id)
    ]);
    setFeedings(f);
    setSleeps(s);
    setDiapers(d);
    setVaccines(v);
    setAppointments(a);
  };

  useEffect(() => {
    loadData();
  }, [selectedBaby]);

  const handleSaveFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addFeedingLog({
      babyId: selectedBaby.id,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: feedType,
      durationMinutes: feedType === 'breast' ? Number(feedDuration) : undefined,
      quantityMl: feedType !== 'breast' ? Number(feedQuantity) : undefined,
      notes: feedNotes || undefined,
      loggedBy: user?.name || 'Parent'
    });
    setFeedModalOpen(false);
    loadData();
  };

  const handleSaveSleep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addSleepLog({
      babyId: selectedBaby.id,
      date: new Date().toISOString().split('T')[0],
      startTime: '13:00',
      endTime: '14:00',
      durationMinutes: Number(sleepDuration),
      type: sleepType,
      quality: 'peaceful'
    });
    setSleepModalOpen(false);
    loadData();
  };

  const handleSaveDiaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addDiaperLog({
      babyId: selectedBaby.id,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: diaperType
    });
    setDiaperModalOpen(false);
    loadData();
  };

  const handleSaveGrowth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    await trackingService.addGrowthRecord({
      babyId: selectedBaby.id,
      date: new Date().toISOString().split('T')[0],
      ageInMonths: 6,
      weightKg: Number(growthWeight) || selectedBaby.currentWeightKg,
      heightCm: Number(growthHeight) || selectedBaby.currentHeightCm,
      headCircumferenceCm: selectedBaby.headCircumferenceCm
    });
    setGrowthModalOpen(false);
    loadData();
  };

  const upcomingVaccine = vaccines.find((v) => v.status === 'upcoming');
  const nextAppointment = appointments.find((a) => a.status === 'confirmed' || a.status === 'requested');

  return (
    <div className="space-y-8">
      {/* 1. WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sage-700 to-sage-800 text-white p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cream-100 text-xs font-medium">
            <Heart className="w-3.5 h-3.5 text-peach-300" />
            <span>Parent Care Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">
            Good morning, {user?.name || 'Sarah'}!
          </h1>
          <p className="text-xs sm:text-sm text-sage-100 font-normal max-w-xl">
            Let's make today a healthy and happy day for your little one.
          </p>
        </div>

        {/* Selected Baby Quick Switch Card */}
        {selectedBaby && (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
            <img
              src={selectedBaby.avatarUrl || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=128'}
              alt={selectedBaby.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-heading font-bold text-white">{selectedBaby.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-peach-300 text-stone-900 font-semibold">
                  {selectedBaby.ageText || '6M'}
                </span>
              </div>
              <p className="text-[11px] text-sage-100">
                DOB: {selectedBaby.dateOfBirth} • {selectedBaby.currentWeightKg} kg
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. QUICK ACTION BAR */}
      <div className="space-y-2">
        <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-nurturaText-secondary">
          Quick Routine Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => setFeedModalOpen(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border shadow-soft hover:shadow hover:-translate-y-0.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-peach-100 dark:bg-peach-950/60 text-peach-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100">Log Feeding</span>
            <span className="text-[10px] text-stone-400">Breast or bottle</span>
          </button>

          <button
            onClick={() => setSleepModalOpen(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border shadow-soft hover:shadow hover:-translate-y-0.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-lavender-100 dark:bg-lavender-950/60 text-purple-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Moon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100">Log Sleep</span>
            <span className="text-[10px] text-stone-400">Nap or night</span>
          </button>

          <button
            onClick={() => setDiaperModalOpen(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border shadow-soft hover:shadow hover:-translate-y-0.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-softYellow-100 dark:bg-amber-950/60 text-amber-800 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100">Record Diaper</span>
            <span className="text-[10px] text-stone-400">Wet or dirty</span>
          </button>

          <button
            onClick={() => setGrowthModalOpen(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border shadow-soft hover:shadow hover:-translate-y-0.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-sage-900/60 text-sage-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100">Add Growth</span>
            <span className="text-[10px] text-stone-400">Weight & height</span>
          </button>

          <Link
            to="/parent/appointments"
            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border shadow-soft hover:shadow hover:-translate-y-0.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100">Book Doctor</span>
            <span className="text-[10px] text-stone-400">Dr. Sharma</span>
          </Link>
        </div>
      </div>

      {/* 3. SIX SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Current Weight</span>
          <div className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            {selectedBaby?.currentWeightKg || 7.8} kg
          </div>
          <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 56th %ile WHO
          </p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Current Length</span>
          <div className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            {selectedBaby?.currentHeightCm || 67.5} cm
          </div>
          <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 58th %ile WHO
          </p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Today's Feeds</span>
          <div className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            {feedings.length} sessions
          </div>
          <p className="text-[10px] text-stone-400">Last: {feedings[0]?.time || 'Morning'}</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Today's Sleep</span>
          <div className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            3.0 hrs
          </div>
          <p className="text-[10px] text-stone-400">2 naps recorded</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Next Vaccine</span>
          <div className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 truncate">
            {upcomingVaccine ? upcomingVaccine.vaccineName.split(' ')[0] : 'None'}
          </div>
          <p className="text-[10px] text-amber-700 dark:text-amber-300 font-medium">Due: Nov 28</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Doctor Visit</span>
          <div className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 truncate">
            {nextAppointment ? nextAppointment.date : 'None'}
          </div>
          <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">Confirmed</p>
        </Card>
      </div>

      {/* 4. DAILY ACTIVITY TIMELINE & UPCOMING REMINDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Timeline (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Today's Activity Timeline
            </h3>
            <Link to="/parent/timeline" className="text-xs font-semibold text-sage-600 hover:underline flex items-center gap-1">
              View full timeline <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="divide-y divide-stone-100 dark:divide-darkBg-border p-0">
            {/* Sample merged activity items */}
            <div className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-peach-100 dark:bg-peach-950 text-peach-700 flex items-center justify-center shrink-0">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-nurturaText-primary dark:text-cream-100">Breastfeeding Session</span>
                  <span className="text-stone-400 text-[10px]">13:30</span>
                </div>
                <p className="text-nurturaText-secondary">Duration: 18 min (Left side) • Logged by Sarah</p>
              </div>
            </div>

            <div className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-lavender-100 dark:bg-lavender-950 text-purple-700 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-nurturaText-primary dark:text-cream-100">Afternoon Nap</span>
                  <span className="text-stone-400 text-[10px]">14:00 – 15:30</span>
                </div>
                <p className="text-nurturaText-secondary">1 hr 30 min • Peaceful sleep in crib</p>
              </div>
            </div>

            <div className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-softYellow-100 dark:bg-amber-950 text-amber-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-nurturaText-primary dark:text-cream-100">Diaper Change (Mixed)</span>
                  <span className="text-stone-400 text-[10px]">11:00</span>
                </div>
                <p className="text-nurturaText-secondary">Normal consistency • Mustard yellow</p>
              </div>
            </div>

            <div className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-peach-100 dark:bg-peach-950 text-peach-700 flex items-center justify-center shrink-0">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-nurturaText-primary dark:text-cream-100">Bottle Feeding (Expressed Milk)</span>
                  <span className="text-stone-400 text-[10px]">10:45</span>
                </div>
                <p className="text-nurturaText-secondary">150 ml • Bottle fed without reflux</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Personalized Upcoming Reminders (1 col) */}
        <div className="space-y-4">
          <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Upcoming Reminders
          </h3>

          <div className="space-y-3">
            <Card className="p-4 space-y-2 border-l-4 border-l-sage-600">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-nurturaText-primary dark:text-cream-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                  6-Month Immunizations Due
                </span>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                  In 7 Days
                </span>
              </div>
              <p className="text-xs text-nurturaText-secondary">
                DTaP-IPV-Hib-HepB (Dose 3) & Influenza scheduled with Dr. Ananya Sharma on Nov 28.
              </p>
            </Card>

            <Card className="p-4 space-y-2 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-nurturaText-primary dark:text-cream-100 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Vitamin D3 Drops
                </span>
                <span className="text-[10px] text-stone-400">Daily routine</span>
              </div>
              <p className="text-xs text-nurturaText-secondary">
                400 IU (1 ml) recommended after morning nursing session.
              </p>
            </Card>

            <Card className="p-4 space-y-2 bg-sage-50/70 dark:bg-darkBg-card border-dashed">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-sage-800 dark:text-sage-200">
                  Ask Nurtura AI
                </span>
                <Link to="/parent/ai" className="text-xs font-semibold text-sage-600 hover:underline">
                  Open Chat
                </Link>
              </div>
              <p className="text-xs text-nurturaText-secondary">
                Prepare your questions about starting solid food purees for the upcoming 6-month checkup.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* QUICK LOG MODALS */}
      {/* 1. Feed Modal */}
      <Modal isOpen={feedModalOpen} onClose={() => setFeedModalOpen(false)} title="Log Feeding Session">
        <form onSubmit={handleSaveFeed} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600">Feeding Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['breast', 'formula', 'expressed'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setFeedType(t)}
                  className={`py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
                    feedType === t ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200 text-stone-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {feedType === 'breast' ? (
            <Input
              label="Duration (Minutes)"
              type="number"
              value={feedDuration}
              onChange={(e) => setFeedDuration(e.target.value)}
              required
            />
          ) : (
            <Input
              label="Quantity (ml)"
              type="number"
              value={feedQuantity}
              onChange={(e) => setFeedQuantity(e.target.value)}
              required
            />
          )}

          <Input
            label="Notes (Optional)"
            placeholder="Latched well, calm feed..."
            value={feedNotes}
            onChange={(e) => setFeedNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setFeedModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Feeding</Button>
          </div>
        </form>
      </Modal>

      {/* 2. Sleep Modal */}
      <Modal isOpen={sleepModalOpen} onClose={() => setSleepModalOpen(false)} title="Log Baby Sleep">
        <form onSubmit={handleSaveSleep} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600">Sleep Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['nap', 'night'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setSleepType(t)}
                  className={`py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
                    sleepType === t ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200 text-stone-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Duration (Minutes)"
            type="number"
            value={sleepDuration}
            onChange={(e) => setSleepDuration(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setSleepModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Sleep</Button>
          </div>
        </form>
      </Modal>

      {/* 3. Diaper Modal */}
      <Modal isOpen={diaperModalOpen} onClose={() => setDiaperModalOpen(false)} title="Record Diaper Change">
        <form onSubmit={handleSaveDiaper} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-600">Diaper Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['wet', 'dirty', 'mixed'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setDiaperType(t)}
                  className={`py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
                    diaperType === t ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200 text-stone-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setDiaperModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Diaper Record</Button>
          </div>
        </form>
      </Modal>

      {/* 4. Growth Modal */}
      <Modal isOpen={growthModalOpen} onClose={() => setGrowthModalOpen(false)} title="Add Growth Measurement">
        <form onSubmit={handleSaveGrowth} className="space-y-4">
          <Input
            label="Weight (kg)"
            type="number"
            step="0.01"
            placeholder="7.8"
            value={growthWeight}
            onChange={(e) => setGrowthWeight(e.target.value)}
            required
          />
          <Input
            label="Length / Height (cm)"
            type="number"
            step="0.1"
            placeholder="67.5"
            value={growthHeight}
            onChange={(e) => setGrowthHeight(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setGrowthModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Measurement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
