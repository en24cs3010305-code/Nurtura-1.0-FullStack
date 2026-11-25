import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Stethoscope, FileSpreadsheet, ShieldCheck, ArrowRight, LineChart } from 'lucide-react';

export const ForDoctorsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Pediatrician & Clinical Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
          Streamline Pediatric Consultations with Longitudinal Data
        </h1>
        <p className="text-sm text-nurturaText-secondary dark:text-stone-300">
          Spend less time asking routine questions and more time providing high-impact developmental and clinical guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <LineChart className="w-8 h-8 text-emerald-600" />
          <h3 className="text-base font-heading font-bold">Standardized Growth Charts</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Review historical percentiles for weight, length, and head circumference instantly to detect growth faltering or microcephaly risk early.
          </p>
        </Card>

        <Card className="space-y-3">
          <FileSpreadsheet className="w-8 h-8 text-sage-600" />
          <h3 className="text-base font-heading font-bold">SOAP Note Builder</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Structured Subjective, Objective, Assessment, and Plan fields with instant timestamped clinical history.
          </p>
        </Card>

        <Card className="space-y-3">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          <h3 className="text-base font-heading font-bold">Verified Prescriptions</h3>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
            Issue digital prescriptions with explicit pediatric dosage, frequencies, and administration instructions.
          </p>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Link to="/doctor">
          <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Access Pediatrician Workspace Demo
          </Button>
        </Link>
      </div>
    </div>
  );
};
