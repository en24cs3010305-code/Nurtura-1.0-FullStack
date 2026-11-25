import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { PageHeader } from '../../components/common/PageHeader';
import {
  User,
  Lock,
  Bell,
  Globe,
  Sun,
  Moon,
  Shield,
  Eye,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export const ParentSettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [name, setName] = useState(user?.name || 'Sarah Jenkins');
  const [email, setEmail] = useState(user?.email || 'sarah.jenkins@example.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password fields
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  // Preference switches
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [doctorShare, setDoctorShare] = useState(true);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw) {
      setPwSuccess(true);
      setCurrentPw('');
      setNewPw('');
      setTimeout(() => setPwSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Manage your personal profile, regional language, theme mode, and privacy controls"
      />

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile information updated successfully!</span>
        </div>
      )}

      {/* 1. Profile Information */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-darkBg-border">
          <User className="w-5 h-5 text-sage-600" />
          <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Personal Information
          </h3>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="flex justify-end pt-1">
            <Button size="sm" type="submit">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* 2. Language & Display Theme */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-darkBg-border">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Regional Language & Appearance
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block">
              Interface Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  language === 'en' ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200 text-stone-600'
                }`}
              >
                English (Default)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  language === 'hi' ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200 text-stone-600'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
            <p className="text-[11px] text-stone-400">Select language for titles, buttons, and navigation</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block">
              Color Theme Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'light' ? 'border-sage-600 bg-sage-50 text-sage-700 font-bold' : 'border-stone-200 text-stone-600'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" /> Light Warm
              </button>
              <button
                type="button"
                onClick={() => theme === 'light' && toggleTheme()}
                className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'dark' ? 'border-sage-600 bg-sage-900 text-cream-100 font-bold' : 'border-stone-200 text-stone-600'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" /> Dark Forest
              </button>
            </div>
            <p className="text-[11px] text-stone-400">Eye-friendly contrast designed for late night baby routines</p>
          </div>
        </div>
      </Card>

      {/* 3. Password Security */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-darkBg-border">
          <Lock className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Password & Security
          </h3>
        </div>

        {pwSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
            Password updated in local session state.
          </div>
        )}

        <form onSubmit={handlePasswordSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button size="sm" type="submit" variant="soft">
              Update Password
            </Button>
          </div>
        </form>
      </Card>

      {/* 4. Notification & Privacy Toggles */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-darkBg-border">
          <Shield className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Notification & Privacy Controls
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-darkBg-surface border border-stone-100 dark:border-darkBg-border cursor-pointer">
            <div>
              <span className="font-semibold text-nurturaText-primary dark:text-cream-100 block">
                Vaccination & Checkup Email Reminders
              </span>
              <span className="text-[11px] text-stone-400">Receive alerts 7 days and 24 hours prior to scheduled due dates</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="rounded text-sage-600 focus:ring-sage-500 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-darkBg-surface border border-stone-100 dark:border-darkBg-border cursor-pointer">
            <div>
              <span className="font-semibold text-nurturaText-primary dark:text-cream-100 block">
                Direct Pediatrician Record Sync
              </span>
              <span className="text-[11px] text-stone-400">Allow authorized pediatrician to view feeding and growth logs</span>
            </div>
            <input
              type="checkbox"
              checked={doctorShare}
              onChange={(e) => setDoctorShare(e.target.checked)}
              className="rounded text-sage-600 focus:ring-sage-500 w-4 h-4"
            />
          </label>
        </div>
      </Card>
    </div>
  );
};
