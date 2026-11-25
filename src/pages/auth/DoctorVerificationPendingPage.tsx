import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ShieldCheck, Clock, FileText, ArrowRight } from 'lucide-react';

export const DoctorVerificationPendingPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6">
        <Card className="text-center py-10 px-8 space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-50 dark:ring-amber-900/20">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
              Verification in Progress
            </span>
            <h2 className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              Credentials Under Clinical Review
            </h2>
          </div>

          <p className="text-xs text-nurturaText-secondary leading-relaxed">
            Thank you for applying to join Nurtura's pediatric network. To ensure infant patient safety, our compliance committee verifies each practitioner's state medical council registration and hospital credentials.
          </p>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-darkBg-surface border border-stone-200/60 dark:border-darkBg-border text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-500 font-medium">
              <span>Estimated Review Turnaround:</span>
              <span className="font-bold text-stone-700 dark:text-stone-300">24 – 48 Hours</span>
            </div>
            <div className="flex items-center justify-between text-stone-500 font-medium">
              <span>Documents Uploaded:</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Medical License PDF
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-500 font-medium">
              <span>Notification:</span>
              <span className="text-stone-700 dark:text-stone-300">Sent via email upon decision</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/doctor" className="w-full sm:w-auto">
              <Button variant="soft" size="sm" className="w-full">
                Preview Doctor Portal (Demo Mode)
              </Button>
            </Link>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
