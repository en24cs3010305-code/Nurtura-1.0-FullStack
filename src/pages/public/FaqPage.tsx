import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqItems = [
    {
      q: 'Is Nurtura free for parents?',
      a: 'Nurtura provides essential baby logging, milestone tracking, and growth percentiles completely free for families. Clinical tele-consultations are arranged directly through your healthcare provider.'
    },
    {
      q: 'Where do the growth percentiles come from?',
      a: 'Nurtura strictly uses official World Health Organization (WHO) Child Growth Standards for boys and girls from birth to 5 years.'
    },
    {
      q: 'Can multiple people log feeds and sleep for the same baby?',
      a: 'Yes! Through the Family Access module, you can invite co-parents, grandparents, or babysitters with daily activity logging permissions.'
    },
    {
      q: 'How does doctor verification work?',
      a: 'Doctors must provide their accredited medical qualification, national or state registration number, and clinic affiliation. Our admin compliance team verifies credentials before granting pediatric clinical portal access.'
    },
    {
      q: 'Does Nurtura provide real-time AI diagnoses?',
      a: 'No. Nurtura AI is strictly an educational support companion. It helps organize health histories and explain developmental milestones, but it will never diagnose conditions or prescribe medications.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
          Help & Information
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-nurturaText-secondary dark:text-stone-300 max-w-lg mx-auto">
          Find answers to common questions regarding account setup, WHO standards, and data sharing.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-sage-100 dark:border-darkBg-border bg-white dark:bg-darkBg-card overflow-hidden shadow-soft"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 hover:text-sage-600 transition-colors"
              >
                <span>{item.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-darkBg-border pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
