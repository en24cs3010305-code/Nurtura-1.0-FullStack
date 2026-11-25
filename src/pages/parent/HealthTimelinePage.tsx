import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { trackingService } from '../../services/trackingService';
import { vaccinationService } from '../../services/vaccinationService';
import { appointmentService } from '../../services/appointmentService';
import {
  Utensils,
  Moon,
  Sparkles,
  Scale,
  ShieldCheck,
  Calendar,
  Filter,
  Clock
} from 'lucide-react';

export const HealthTimelinePage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [filter, setFilter] = useState<string>('all');
  const [timelineItems, setTimelineItems] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedBaby) return;
    const loadTimeline = async () => {
      const [feeds, sleeps, diapers, growth, vaccines, apts] = await Promise.all([
        trackingService.getFeedingLogs(selectedBaby.id),
        trackingService.getSleepLogs(selectedBaby.id),
        trackingService.getDiaperLogs(selectedBaby.id),
        trackingService.getGrowthRecords(selectedBaby.id),
        vaccinationService.getVaccinations(selectedBaby.id),
        appointmentService.getAppointmentsForBaby(selectedBaby.id)
      ]);

      const events: any[] = [];

      feeds.forEach((f) => {
        events.push({
          id: f.id,
          date: f.date,
          time: f.time,
          category: 'feeding',
          title: `Feeding (${f.type})`,
          detail: f.type === 'breast' ? `${f.durationMinutes} min nursing (${f.side || 'both'} side)` : `${f.quantityMl} ml bottle feed`,
          notes: f.notes,
          icon: Utensils,
          color: 'text-peach-700 bg-peach-100 dark:bg-peach-950/60'
        });
      });

      sleeps.forEach((s) => {
        events.push({
          id: s.id,
          date: s.date,
          time: s.startTime,
          category: 'sleep',
          title: `Sleep Session (${s.type})`,
          detail: `${s.durationMinutes} minutes (${s.quality})`,
          notes: s.notes,
          icon: Moon,
          color: 'text-purple-700 bg-lavender-100 dark:bg-lavender-950/60'
        });
      });

      diapers.forEach((d) => {
        events.push({
          id: d.id,
          date: d.date,
          time: d.time,
          category: 'diaper',
          title: `Diaper Change (${d.type})`,
          detail: d.color ? `Color: ${d.color}` : 'Routine check',
          notes: d.notes,
          icon: Sparkles,
          color: 'text-amber-800 bg-softYellow-100 dark:bg-amber-950/60'
        });
      });

      growth.forEach((g) => {
        events.push({
          id: g.id,
          date: g.date,
          time: '10:00',
          category: 'growth',
          title: `Growth Evaluation (${g.ageInMonths}M)`,
          detail: `Weight: ${g.weightKg} kg • Height: ${g.heightCm} cm • Head: ${g.headCircumferenceCm} cm`,
          notes: g.notes,
          icon: Scale,
          color: 'text-sage-700 bg-sage-100 dark:bg-sage-900/60'
        });
      });

      vaccines.filter((v) => v.status === 'completed').forEach((v) => {
        events.push({
          id: v.id,
          date: v.administeredDate || v.dueDate,
          time: '11:00',
          category: 'vaccination',
          title: `Vaccine Administered: ${v.vaccineName}`,
          detail: `Clinic: ${v.clinicName || 'Pediatric Wing'} • Batch: ${v.batchNumber || 'N/A'}`,
          notes: v.notes,
          icon: ShieldCheck,
          color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60'
        });
      });

      apts.forEach((a) => {
        events.push({
          id: a.id,
          date: a.date,
          time: a.time,
          category: 'appointment',
          title: `Doctor Visit: ${a.doctorName}`,
          detail: `${a.reason} (${a.type}) - Status: ${a.status}`,
          notes: a.notes,
          icon: Calendar,
          color: 'text-blue-700 bg-blue-100 dark:bg-blue-950/60'
        });
      });

      // Sort by date descending
      events.sort((a, b) => (a.date < b.date ? 1 : -1));
      setTimelineItems(events);
    };

    loadTimeline();
  }, [selectedBaby]);

  const filteredItems = filter === 'all'
    ? timelineItems
    : timelineItems.filter((item) => item.category === filter);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Health Timeline"
        subtitle={`Chronological events and clinical observations for ${selectedBaby?.name || 'baby'}`}
      />

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'feeding', 'sleep', 'diaper', 'growth', 'vaccination', 'appointment'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-sage-600 text-white shadow-soft'
                : 'bg-white dark:bg-darkBg-card border border-stone-200 dark:border-darkBg-border text-stone-600 dark:text-stone-300 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-sage-200 dark:border-darkBg-border space-y-8">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="relative group">
              {/* Dot on the line */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full bg-white dark:bg-darkBg-card border-2 border-sage-500 flex items-center justify-center text-sage-600 shadow-xs">
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Event card */}
              <Card className="p-4 sm:p-5 space-y-2 hover:shadow-medium transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-nurturaText-primary dark:text-cream-100 text-sm">
                      {item.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${item.color}`}>
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.date} {item.time ? `at ${item.time}` : ''}
                  </span>
                </div>

                <p className="text-xs text-nurturaText-primary dark:text-stone-200 font-medium">
                  {item.detail}
                </p>

                {item.notes && (
                  <p className="text-xs text-nurturaText-secondary dark:text-stone-400 italic bg-stone-50 dark:bg-darkBg-surface p-2 rounded-lg border border-stone-100 dark:border-darkBg-border">
                    "{item.notes}"
                  </p>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
