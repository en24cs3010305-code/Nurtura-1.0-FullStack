import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { BellRing, AlertTriangle, CheckCircle2, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DoctorHealthAlertsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Clinical Health Alerts"
        subtitle="Priority physiological flags, immunization delays, or maternal concerns"
      />

      <div className="space-y-4">
        <Card className="p-5 border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-darkBg-card space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-cream-100">
                  Tara Sharma (2 Years) • Peanut Food Allergy Sensitivity
                </h4>
                <p className="text-[11px] text-slate-500">Parent: Sarah Jenkins • Logged 3 days ago</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
              Observation Active
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mild erythematous skin rash noted on chin following contact with peanut snack. No wheezing, breathing compromise, or lip edema reported. Managed at home. Scheduled for routine pediatric speech & allergy review on Dec 5.
          </p>
          <div className="flex justify-end gap-2 pt-1 border-t border-amber-200/50">
            <Link to="/doctor/messages">
              <Button size="sm" variant="outline" className="text-xs">
                Message Parent
              </Button>
            </Link>
            <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs">
              Acknowledge Alert
            </Button>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-600 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-cream-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Aarav Sharma • 6-Month Immunization Series Ready
            </span>
            <span className="text-stone-400">Scheduled: Nov 28</span>
          </div>
          <p className="text-xs text-slate-500">
            DTaP-IPV-Hib-HepB Dose 3 batch confirmed at Blossom clinic dispensary.
          </p>
        </Card>
      </div>
    </div>
  );
};
