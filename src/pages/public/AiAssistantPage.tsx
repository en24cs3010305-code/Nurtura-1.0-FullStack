import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Bot, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const AiAssistantPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
          Responsible Pediatric Intelligence
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          Meet Nurtura AI: Your Baby Care Companion
        </h1>
        <p className="text-sm text-nurturaText-secondary dark:text-stone-300">
          Designed to educate, organize, and relieve anxiety while adhering to strict pediatric safety guardrails.
        </p>
      </div>

      <div className="rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 p-6 sm:p-8 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-heading font-bold text-amber-900 dark:text-amber-200">
            Pediatric Safety & Ethical Principles
          </h4>
          <p className="text-xs text-amber-800/90 dark:text-amber-300 leading-relaxed">
            Nurtura AI is strictly an educational tool. It does not provide medical diagnoses, prescribe medications, or replace certified clinical advice. In acute medical emergencies, parents are immediately prompted to seek local emergency medical services.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-sage-900 text-sage-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-heading font-bold">Percentile Interpretation</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Explains what WHO growth percentiles mean in simple, reassuring language so you understand that a healthy baby follows their own unique curve.
          </p>
        </Card>

        <Card className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-peach-100 dark:bg-peach-950 text-peach-700 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-base font-heading font-bold">Doctor Visit Question Builder</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Assists you in formulating specific, organized questions for your pediatrician regarding starting solids, sleep regression, or vaccine side effects.
          </p>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Link to="/parent/ai">
          <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Try Nurtura AI in Parent Portal
          </Button>
        </Link>
      </div>
    </div>
  );
};
