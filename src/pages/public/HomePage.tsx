import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import {
  Baby,
  Heart,
  LineChart,
  ShieldCheck,
  Sparkles,
  Bot,
  Calendar,
  Utensils,
  Moon,
  Clock,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  FileText,
  Activity
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does Nurtura help me monitor my baby’s growth percentiles?',
      a: 'Nurtura provides clean WHO-aligned growth curves. As you record measurements (weight, length, and head circumference), Nurtura plots historical trajectories so you and your pediatrician can observe health trends over time.'
    },
    {
      q: 'Can my pediatrician directly access my baby’s records on Nurtura?',
      a: 'Yes! Nurtura offers a dedicated clinical portal for pediatricians. Once connected with authorized parental consent, your doctor can view longitudinal feeding, sleep, and growth data, log clinical SOAP notes, and review milestone progress.'
    },
    {
      q: 'What is the role of Nurtura AI?',
      a: 'Nurtura AI is an educational baby care companion. It helps explain routine developmental milestones, suggests pertinent questions for upcoming doctor visits, and provides general infant care information. It does not provide medical diagnoses or prescribe medications.'
    },
    {
      q: 'Can other family members or caregivers help log feeds and diaper changes?',
      a: 'Absolutely. Nurtura Family Access lets you invite partners, grandparents, or trusted caregivers with granular permissions (daily activity logging or view-only access).'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-16 lg:pt-20">
        {/* Soft background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-200/40 dark:bg-sage-900/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-peach-100/60 dark:bg-peach-950/20 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 dark:bg-darkBg-card border border-sage-200/80 dark:border-darkBg-border text-sage-800 dark:text-sage-200 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-sage-600" />
                <span>Next-Gen Pediatric Health & Milestone Tracking</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-nurturaText-primary dark:text-cream-50 leading-[1.15] tracking-tight">
                Every Little Milestone <br />
                <span className="text-sage-600 dark:text-sage-300">Deserves Better Care.</span>
              </h1>

              <p className="text-base sm:text-lg text-nurturaText-secondary dark:text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                One connected space for your baby's health, growth, daily routines and trusted pediatric care.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto shadow-medium" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Features
                  </Button>
                </Link>
              </div>

              {/* Micro Trust markers */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-nurturaText-secondary dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  WHO-Aligned Reference Curves
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Pediatrician Collaboration
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Family Caregiver Sharing
                </span>
              </div>
            </div>

            {/* Right Hero Visual Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Dashboard Preview Card */}
                <div className="bg-white dark:bg-darkBg-card rounded-3xl p-6 shadow-lifted border border-sage-100 dark:border-darkBg-border space-y-5">
                  {/* Card Header: Baby Aarav */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-darkBg-border">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=128"
                        alt="Baby preview"
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-sage-400/30"
                      />
                      <div>
                        <h4 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                          Aarav Sharma
                        </h4>
                        <p className="text-xs text-nurturaText-secondary">6 months old • 7.8 kg (56th %ile)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                      On Track
                    </span>
                  </div>

                  {/* Quick Stat Pill Grid */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-sage-50/70 dark:bg-darkBg-surface border border-sage-100 dark:border-darkBg-border text-center">
                      <Utensils className="w-4 h-4 mx-auto text-sage-600 mb-1" />
                      <div className="text-xs font-bold text-nurturaText-primary dark:text-cream-100">5 Feeds</div>
                      <div className="text-[10px] text-nurturaText-secondary">Today</div>
                    </div>
                    <div className="p-3 rounded-xl bg-peach-50/80 dark:bg-darkBg-surface border border-peach-100/60 dark:border-darkBg-border text-center">
                      <Moon className="w-4 h-4 mx-auto text-amber-700 mb-1" />
                      <div className="text-xs font-bold text-nurturaText-primary dark:text-cream-100">13.2 hrs</div>
                      <div className="text-[10px] text-nurturaText-secondary">Sleep</div>
                    </div>
                    <div className="p-3 rounded-xl bg-lavender-50/80 dark:bg-darkBg-surface border border-lavender-100/60 dark:border-darkBg-border text-center">
                      <ShieldCheck className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                      <div className="text-xs font-bold text-nurturaText-primary dark:text-cream-100">Nov 28</div>
                      <div className="text-[10px] text-nurturaText-secondary">6M Vaccines</div>
                    </div>
                  </div>

                  {/* Growth Sparkline Preview */}
                  <div className="p-4 rounded-2xl bg-cream-50 dark:bg-darkBg-surface border border-stone-200/60 dark:border-darkBg-border space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-nurturaText-primary dark:text-cream-100 flex items-center gap-1.5">
                        <LineChart className="w-3.5 h-3.5 text-sage-600" />
                        Weight Trajectory
                      </span>
                      <span className="text-emerald-600 font-semibold text-[11px]">+1.0 kg vs 4M</span>
                    </div>
                    {/* Visual Curve Representation */}
                    <div className="h-16 flex items-end justify-between gap-1 pt-2 px-1">
                      {[35, 48, 60, 72, 85].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t-md bg-sage-500/70 hover:bg-sage-600 transition-all"
                            style={{ height: `${val}%` }}
                          />
                          <span className="text-[9px] text-stone-400">{i * 1.5}M</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating AI Insight Snippet */}
                  <div className="p-3.5 rounded-2xl bg-sage-600 text-white flex items-start gap-3 shadow-medium">
                    <Bot className="w-5 h-5 text-peach-200 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-semibold text-cream-50">Nurtura AI Companion Insight</p>
                      <p className="text-sage-100 text-[11px] leading-snug mt-0.5">
                        Aarav's consistent weight velocity along the 56th percentile indicates healthy infant nutrition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATS SECTION (Clearly labeled illustrative sample metrics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border p-8 shadow-soft">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
              Illustrative Prototype Metrics
            </span>
            <p className="text-xs text-stone-400">
              Representative performance indicators modeled for clinical adoption
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-sage-700 dark:text-sage-300">
                100,000+
              </div>
              <p className="text-xs text-nurturaText-secondary">Sample Feeds & Sleep Logged</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-sage-700 dark:text-sage-300">
                98.4%
              </div>
              <p className="text-xs text-nurturaText-secondary">On-Time Vaccination Tracking</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-sage-700 dark:text-sage-300">
                50+
              </div>
              <p className="text-xs text-nurturaText-secondary">Standard Pediatric Milestones</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-sage-700 dark:text-sage-300">
                100%
              </div>
              <p className="text-xs text-nurturaText-secondary">Doctor-Parent Shared Transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
            Comprehensive Infant Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
            Engineered for Calm, Confident Parenting
          </h2>
          <p className="text-sm text-nurturaText-secondary dark:text-stone-300">
            Every tool is designed alongside pediatric clinical workflows to provide peace of mind and actionable insight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Growth */}
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-sage-900/40 text-sage-700 dark:text-sage-300 flex items-center justify-center">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              WHO Growth Analytics
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Track weight, length, and head circumference mapped directly against World Health Organization reference curves.
            </p>
          </Card>

          {/* Card 2: Feeding */}
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-peach-100 dark:bg-peach-950/40 text-peach-700 dark:text-peach-300 flex items-center justify-center">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Smart Feeding Diary
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Log nursing side durations, bottle quantities (expressed or formula), and solid food introductions seamlessly.
            </p>
          </Card>

          {/* Card 3: Sleep */}
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-lavender-100 dark:bg-lavender-950/40 text-lavender-700 dark:text-lavender-300 flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Sleep Architecture
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Visualize daytime naps versus nighttime stretches to recognize natural circadian rhythm transitions.
            </p>
          </Card>

          {/* Card 4: Vaccinations */}
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Vaccination Calendar
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Never miss an immunization. Receive timely notifications, review batch numbers, and keep verified records.
            </p>
          </Card>

          {/* Card 5: Pediatrician SOAP */}
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-softYellow-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Pediatrician Collaboration
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Doctors write structured SOAP clinical notes and issue verified prescriptions that parents can review at any time.
            </p>
          </Card>

          {/* Card 6: AI Companion */}
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-200 dark:bg-sage-800 text-sage-800 dark:text-sage-200 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Nurtura AI Companion
            </h3>
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
              Ask questions about baby growth, milestone pacing, and prepare targeted discussion points for your doctor visits.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. HOW NURTURA WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-sage-50/70 dark:bg-darkBg-card/70 border border-sage-100 dark:border-darkBg-border p-8 sm:p-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
              Simple 3-Step Flow
            </span>
            <h2 className="text-3xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
              How Nurtura Seamlessly Connects Care
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-darkBg-surface p-6 rounded-2xl border border-stone-200/60 dark:border-darkBg-border space-y-3 relative shadow-xs">
              <div className="w-8 h-8 rounded-full bg-sage-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                Create Baby Profile
              </h4>
              <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
                Add birth metrics, allergies, and pediatric details. Easily switch between multiple siblings with one click.
              </p>
            </div>

            <div className="bg-white dark:bg-darkBg-surface p-6 rounded-2xl border border-stone-200/60 dark:border-darkBg-border space-y-3 relative shadow-xs">
              <div className="w-8 h-8 rounded-full bg-sage-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                Log Everyday Routines
              </h4>
              <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
                Effortlessly capture feeds, naps, diaper changes, and developmental milestones with rapid touch-friendly quick actions.
              </p>
            </div>

            <div className="bg-white dark:bg-darkBg-surface p-6 rounded-2xl border border-stone-200/60 dark:border-darkBg-border space-y-3 relative shadow-xs">
              <div className="w-8 h-8 rounded-full bg-sage-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                Collaborate With Doctors
              </h4>
              <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
                Share reports with your pediatrician during checkups. Receive clinical SOAP summaries and verified prescriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARENT & DOCTOR DUAL BENEFIT SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Parent Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border space-y-6 shadow-soft">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-peach-100 dark:bg-peach-950/40 text-peach-900 dark:text-peach-200 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 text-peach-600" />
              For Parents & Guardians
            </div>
            <h3 className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Clear Visibility Into Every Day
            </h3>
            <ul className="space-y-3 text-xs text-nurturaText-secondary dark:text-stone-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Eliminate memory fatigue: know exactly when your baby was last fed or woke up.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Receive gentle reminders for medications, vitamin drops, and immunizations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Invite co-parents, grandparents, or babysitters with custom access controls.</span>
              </li>
            </ul>
            <Link to="/for-parents">
              <Button variant="soft" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Parent Features
              </Button>
            </Link>
          </div>

          {/* Doctor Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-darkBg-card border border-sage-100 dark:border-darkBg-border space-y-6 shadow-soft">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-950/40 text-sage-900 dark:text-sage-200 text-xs font-semibold">
              <Stethoscope className="w-3.5 h-3.5 text-sage-600" />
              For Pediatricians & Clinics
            </div>
            <h3 className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Clinical Quality Data at Your Fingertips
            </h3>
            <ul className="space-y-3 text-xs text-nurturaText-secondary dark:text-stone-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Longitudinal percentile curves with WHO standardization.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Structured SOAP note documentation and digital prescription builder.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Review patient requests, accept appointments, and coordinate follow-up care.</span>
              </li>
            </ul>
            <Link to="/for-doctors">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Pediatrician Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SAMPLE TESTIMONIALS (Clearly labeled as sample stories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
            Sample Parent Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
            Designed With Compassion for Real Families
          </h2>
          <p className="text-xs text-stone-400">
            *Representative development stories illustrating daily platform usage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed italic">
              "Being a first-time mother felt overwhelming until we started logging Aarav's feeds on Nurtura. Showing the growth curve to our pediatrician in 10 seconds gave us tremendous reassurance."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100 dark:border-darkBg-border">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=96"
                alt="Sarah"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-nurturaText-primary dark:text-cream-100">Sarah Jenkins</p>
                <p className="text-[10px] text-stone-400">Mother of Aarav (6M) & Tara (2Y)</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed italic">
              "As a pediatrician, having structured longitudinal feeding and sleep data before the checkup helps me identify minor issues before they become chronic concerns."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100 dark:border-darkBg-border">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=96"
                alt="Dr. Ananya Sharma"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-nurturaText-primary dark:text-cream-100">Dr. Ananya Sharma, MD</p>
                <p className="text-[10px] text-stone-400">Pediatrician & Neonatologist</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed italic">
              "The family sharing feature is fantastic. My husband and our nanny can both log bottle feedings so everyone is completely synced up throughout the day."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100 dark:border-darkBg-border">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=96"
                alt="Priya"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-nurturaText-primary dark:text-cream-100">Priya Patel</p>
                <p className="text-[10px] text-stone-400">Mother of Liam (3M)</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-sage-100 dark:border-darkBg-border bg-white dark:bg-darkBg-card overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100 hover:text-sage-600 dark:hover:text-sage-300 transition-colors"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-stone-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-stone-400" />}
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
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-sage-600 dark:bg-sage-800 text-white p-8 sm:p-14 text-center space-y-6 shadow-lifted relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-peach-300/20 blur-xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">
              Ready to Give Your Baby Smarter Healthcare?
            </h2>
            <p className="text-sm text-sage-100 leading-relaxed">
              Join thousands of parents and pediatricians bringing clarity and comfort to newborn care.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 relative z-10">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-white text-sage-800 hover:bg-cream-100 shadow-medium">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white hover:bg-white/10">
                Log In With Demo Credentials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
