import React from 'react';
import { Card } from '../../components/common/Card';
import {
  LineChart,
  Utensils,
  Moon,
  Sparkles,
  ShieldCheck,
  Calendar,
  FileText,
  Users,
  Bot,
  Stethoscope,
  Pill,
  BellRing
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    {
      icon: LineChart,
      title: 'Interactive Growth Tracking',
      desc: 'Plot weight, length, and head circumference alongside WHO reference percentiles with historical trend lines.'
    },
    {
      icon: Utensils,
      title: 'Multimodal Feeding Diary',
      desc: 'Record breastfeeding duration by side, bottle feeding volume in ml, and first solid food trials.'
    },
    {
      icon: Moon,
      title: 'Sleep Architecture Log',
      desc: 'Distinguish between daytime naps and nighttime continuous stretches to evaluate sleep patterns.'
    },
    {
      icon: Sparkles,
      title: 'Diaper Hygiene Tracker',
      desc: 'Keep track of wet, dirty, and mixed diapers to monitor baby hydration and bowel health.'
    },
    {
      icon: ShieldCheck,
      title: 'Vaccine Calendar & Reminders',
      desc: 'Standardized immunization schedules with due dates, administered dates, and doctor verification.'
    },
    {
      icon: Sparkles,
      title: 'Developmental Milestones',
      desc: 'Track motor, cognitive, speech, and social milestones from smiling to standing with pediatric guidance.'
    },
    {
      icon: Pill,
      title: 'Medication & Vitamin Drops',
      desc: 'Reminders for daily Vitamin D3, prescribed antibiotics, or saline drops with dosage guidelines.'
    },
    {
      icon: Calendar,
      title: 'Doctor Appointment Booking',
      desc: 'Search pediatrician availability, select in-person or video checkups, and review booking history.'
    },
    {
      icon: Bot,
      title: 'Nurtura AI Companion',
      desc: 'Educational conversational assistant that explains percentiles and helps formulate doctor questions.'
    },
    {
      icon: FileText,
      title: 'Instant Medical Reports',
      desc: 'Export comprehensive PDF health summaries for daycares, travel, or new healthcare providers.'
    },
    {
      icon: Users,
      title: 'Granular Family Access',
      desc: 'Invite partners, grandparents, and caregivers with view-only or daily logging permissions.'
    },
    {
      icon: Stethoscope,
      title: 'Clinical SOAP Notes',
      desc: 'Pediatricians document Subjective, Objective, Assessment, and Plan notes with electronic sign-offs.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
          Platform Capabilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          Everything Needed for Newborn Health Management
        </h1>
        <p className="text-sm text-nurturaText-secondary dark:text-stone-300">
          Explore the modular features built for both gentle home routines and clinical pediatric accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, i) => {
          const Icon = f.icon;
          return (
            <Card key={i} hoverEffect className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-sage-900/50 text-sage-700 dark:text-sage-300 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                {f.title}
              </h3>
              <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
                {f.desc}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
