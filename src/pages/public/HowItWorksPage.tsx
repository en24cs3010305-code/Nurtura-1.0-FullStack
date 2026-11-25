import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Baby, Smartphone, Stethoscope, Share2, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
          User Journey
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          How Nurtura Works in Daily Practice
        </h1>
        <p className="text-sm text-nurturaText-secondary dark:text-stone-300">
          From the first newborn hospital discharge to toddler milestone milestones, here is how Nurtura guides you.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-darkBg-card p-6 sm:p-8 rounded-3xl border border-sage-100 dark:border-darkBg-border shadow-soft">
          <div className="w-14 h-14 rounded-2xl bg-sage-100 dark:bg-sage-900/60 text-sage-700 flex items-center justify-center shrink-0">
            <Baby className="w-7 h-7" />
          </div>
          <div className="space-y-2 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600">Step 1</span>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Set Up Your Baby's Health Profile
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Input your baby's birth details (birth weight, length, head circumference, blood type, and birth date). Nurtura configures the age-specific milestone track and immunization schedule automatically.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-darkBg-card p-6 sm:p-8 rounded-3xl border border-sage-100 dark:border-darkBg-border shadow-soft">
          <div className="w-14 h-14 rounded-2xl bg-peach-100 dark:bg-peach-950/60 text-peach-700 flex items-center justify-center shrink-0">
            <Smartphone className="w-7 h-7" />
          </div>
          <div className="space-y-2 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-peach-600">Step 2</span>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Log Daily Feeds, Naps & Diapers with Quick Taps
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Use single-tap quick action buttons on your dashboard. Whether nursing at 3 AM or recording a quick nap in the afternoon, logging takes less than 5 seconds.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-darkBg-card p-6 sm:p-8 rounded-3xl border border-sage-100 dark:border-darkBg-border shadow-soft">
          <div className="w-14 h-14 rounded-2xl bg-lavender-100 dark:bg-lavender-950/60 text-purple-700 flex items-center justify-center shrink-0">
            <Share2 className="w-7 h-7" />
          </div>
          <div className="space-y-2 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Step 3</span>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Share With Caregivers & Your Pediatrician
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Authorize your pediatrician to access longitudinal charts or download ready-to-print medical summary PDFs for checkups, daycare admission, or travel.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link to="/register">
          <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Start Your Free Baby Journal Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
