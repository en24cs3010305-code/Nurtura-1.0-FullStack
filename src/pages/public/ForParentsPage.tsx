import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Heart, BellRing, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const ForParentsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
          Designed for Everyday Family Life
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          Calm, Confident Parenting Every Step of the Way
        </h1>
        <p className="text-sm text-nurturaText-secondary dark:text-stone-300">
          No more panic during 3 AM wakeups. Nurtura gives you a clear, comforting window into your baby’s day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <Heart className="w-8 h-8 text-peach-600" />
          <h3 className="text-base font-heading font-bold">Never Second-Guess</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Quickly check whether your partner has already given the morning Vitamin D3 drops or how many wet diapers were recorded today.
          </p>
        </Card>

        <Card className="space-y-3">
          <BellRing className="w-8 h-8 text-sage-600" />
          <h3 className="text-base font-heading font-bold">Gentle Health Reminders</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Stay ahead of 2-month, 4-month, and 6-month immunization windows without having to track complex clinical calendars manually.
          </p>
        </Card>

        <Card className="space-y-3">
          <Sparkles className="w-8 h-8 text-amber-600" />
          <h3 className="text-base font-heading font-bold">Milestone Celebrations</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Record first smiles, reciprocal babbling, and rolling over. Add personal notes and remember the magic of these early months.
          </p>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Link to="/parent">
          <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Parent Dashboard Demo
          </Button>
        </Link>
      </div>
    </div>
  );
};
