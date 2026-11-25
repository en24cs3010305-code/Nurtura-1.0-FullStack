import React from 'react';
import { Card } from '../../components/common/Card';
import { Heart, ShieldCheck, Stethoscope, Sparkles, Target, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
          Our Mission & Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          Built for the Fragile, Joyful Journey of Early Life.
        </h1>
        <p className="text-base text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
          Nurtura was envisioned by passionate healthcare designers and frontend engineers to transform newborn care from scattered paper notes and stressful guesswork into calm, connected clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-sage-900 text-sage-700 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-heading font-bold">Gentle & Caring</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Our interfaces use soft, eye-friendly tones (sage, peach, warm cream) so sleep-deprived parents can log night feeds effortlessly without harsh glare.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-heading font-bold">Clinically Trustworthy</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Every growth curve strictly aligns with World Health Organization (WHO) reference standards, never fabricating pseudo-medical assumptions.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-100 dark:bg-lavender-900 text-purple-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-heading font-bold">Family Connected</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Both parents, grandparents, and trusted sitters collaborate in one shared environment, eliminating double-feeding and miscommunication.
          </p>
        </Card>
      </div>

      <div className="rounded-3xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border p-8 sm:p-10 space-y-6 shadow-soft">
        <h2 className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
          The Story Behind Nurtura 3.0
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
          <p>
            When a child is born, parents are faced with an overwhelming stream of details: ounces of milk, diaper counts, sleep durations, and immunization deadlines. At the same time, pediatricians often receive scattered descriptions that make diagnosis challenging.
          </p>
          <p>
            Nurtura bridges this divide. By providing parents with intuitive touch-based trackers and pediatricians with structured SOAP clinical records and growth percentiles, care becomes proactive rather than reactive.
          </p>
        </div>
      </div>
    </div>
  );
};
