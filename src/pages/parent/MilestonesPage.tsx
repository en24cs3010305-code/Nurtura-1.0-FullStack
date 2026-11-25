import React, { useState, useEffect } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { milestoneService } from '../../services/milestoneService';
import { Milestone, MilestoneCategory, MilestoneStatus } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Heart,
  MessageCircle,
  Brain,
  Activity,
  Info
} from 'lucide-react';

export const MilestonesPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [activeCategory, setActiveCategory] = useState<MilestoneCategory | 'all'>('all');

  const loadMilestones = async () => {
    if (!selectedBaby) return;
    const list = await milestoneService.getMilestones(selectedBaby.id);
    setMilestones(list);
  };

  useEffect(() => {
    loadMilestones();
  }, [selectedBaby]);

  const handleUpdateStatus = async (id: string, status: MilestoneStatus) => {
    await milestoneService.updateMilestoneStatus(id, status);
    loadMilestones();
  };

  const achievedCount = milestones.filter((m) => m.status === 'achieved').length;
  const progressPercent = milestones.length > 0 ? Math.round((achievedCount / milestones.length) * 100) : 0;

  const filtered = activeCategory === 'all'
    ? milestones
    : milestones.filter((m) => m.category === activeCategory);

  const getCategoryIcon = (cat: MilestoneCategory) => {
    switch (cat) {
      case 'motor': return Activity;
      case 'cognitive': return Brain;
      case 'communication': return MessageCircle;
      case 'social_emotional': return Heart;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Development Milestones"
        subtitle={`Track gross motor, communication, and social milestones for ${selectedBaby?.name || 'baby'}`}
      />

      {/* Gentle Pediatric Disclaimer */}
      <div className="p-4 rounded-2xl bg-peach-50/80 dark:bg-darkBg-card border border-peach-200/80 dark:border-darkBg-border flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-peach-700 shrink-0 mt-0.5" />
        <p className="text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
          <strong className="text-peach-900 dark:text-peach-200">Every baby develops at their own unique pace.</strong> Expected age markers represent typical reference ranges, not rigid deadlines. If you have any developmental questions, consult your pediatrician.
        </p>
      </div>

      {/* Overall Progress Card */}
      <Card className="p-6 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-heading font-bold text-nurturaText-primary dark:text-cream-100 text-sm">
            Milestone Journey Progress
          </span>
          <span className="font-bold text-sage-700 dark:text-sage-300">
            {achievedCount} of {milestones.length} Recorded Milestones Achieved ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-stone-100 dark:bg-darkBg-surface overflow-hidden">
          <div
            className="h-full bg-sage-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </Card>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'bg-white dark:bg-darkBg-card border border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          All Categories
        </button>
        <button
          onClick={() => setActiveCategory('motor')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'motor'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'bg-white dark:bg-darkBg-card border border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          Motor Development
        </button>
        <button
          onClick={() => setActiveCategory('cognitive')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'cognitive'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'bg-white dark:bg-darkBg-card border border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          Cognitive Exploration
        </button>
        <button
          onClick={() => setActiveCategory('communication')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'communication'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'bg-white dark:bg-darkBg-card border border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          Communication & Speech
        </button>
        <button
          onClick={() => setActiveCategory('social_emotional')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'social_emotional'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'bg-white dark:bg-darkBg-card border border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          Social & Emotional
        </button>
      </div>

      {/* Milestones Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const Icon = getCategoryIcon(item.category);
          const isAchieved = item.status === 'achieved';
          const isEmerging = item.status === 'emerging';

          return (
            <Card key={item.id} className="space-y-4 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sage-50 dark:bg-darkBg-surface flex items-center justify-center text-sage-600 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Expected ~{item.expectedAgeMonths} Months
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          isAchieved
                            ? 'bg-emerald-100 text-emerald-800'
                            : isEmerging
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>

              <p className="text-xs text-nurturaText-secondary leading-relaxed">
                {item.description}
              </p>

              {item.notes && (
                <p className="text-xs text-sage-800 dark:text-sage-200 italic bg-sage-50 dark:bg-darkBg-surface p-2.5 rounded-xl border border-sage-100 dark:border-darkBg-border">
                  "{item.notes}"
                </p>
              )}

              {/* Status Toggle Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-darkBg-border text-xs">
                <span className="text-[11px] text-stone-400">
                  {item.achievedDate ? `Achieved on ${item.achievedDate}` : 'In progress'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'emerging')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isEmerging ? 'bg-amber-100 text-amber-800 font-bold' : 'hover:bg-stone-100 text-stone-500'
                    }`}
                  >
                    Emerging
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'achieved')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isAchieved ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-stone-100 text-stone-500'
                    }`}
                  >
                    Achieved
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
