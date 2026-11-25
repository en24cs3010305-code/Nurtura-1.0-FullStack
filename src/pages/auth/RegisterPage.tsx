import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import {
  Baby,
  Stethoscope,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  Building,
  ShieldCheck,
  Info
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'parent' | 'doctor'>('parent');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Parent form fields
  const [pName, setPName] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [pPassword, setPPassword] = useState('');
  const [pConfirmPassword, setPConfirmPassword] = useState('');

  // Doctor form fields
  const [dName, setDName] = useState('');
  const [dEmail, setDEmail] = useState('');
  const [dPhone, setDPhone] = useState('');
  const [dPassword, setDPassword] = useState('');
  const [dQualification, setDQualification] = useState('');
  const [dRegNumber, setDRegNumber] = useState('');
  const [dSpecialization, setDSpecialization] = useState('Pediatrics');
  const [dYears, setDYears] = useState('5');
  const [dClinic, setDClinic] = useState('');
  const [dFile, setDFile] = useState<File | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pPassword !== pConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const session = await authService.registerParent({
        name: pName,
        email: pEmail,
        phone: pPhone,
        password: pPassword
      });
      await login({ email: pEmail }, 'parent');
      navigate('/parent');
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.registerDoctor({
        name: dName,
        email: dEmail,
        phone: dPhone,
        password: dPassword,
        qualification: dQualification,
        registrationNumber: dRegNumber,
        specialization: dSpecialization,
        yearsOfExperience: Number(dYears),
        clinicOrHospital: dClinic,
        documentFile: dFile
      });
      // Redirect to verification pending page
      navigate('/doctor-verification-pending');
    } catch (err: any) {
      setError('Doctor registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-sage-600 flex items-center justify-center text-white shadow-soft">
              <Baby className="w-6 h-6" />
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Create Your Nurtura Account
          </h2>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300">
            Select your account type below to get started
          </p>
        </div>

        {/* Role Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-stone-200/60 dark:bg-darkBg-card border border-stone-300/50 dark:border-darkBg-border">
          <button
            type="button"
            onClick={() => {
              setActiveTab('parent');
              setError('');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-heading font-bold transition-all ${
              activeTab === 'parent'
                ? 'bg-white dark:bg-darkBg-surface text-sage-800 dark:text-cream-100 shadow-soft'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Baby className="w-4 h-4 text-peach-600" />
            <span>Parent / Guardian</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('doctor');
              setError('');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-heading font-bold transition-all ${
              activeTab === 'doctor'
                ? 'bg-white dark:bg-darkBg-surface text-sage-800 dark:text-cream-100 shadow-soft'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>Doctor / Pediatrician</span>
          </button>
        </div>

        {/* Notice regarding Administrator registration */}
        <div className="p-3 rounded-xl bg-stone-100 dark:bg-darkBg-card text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-2 border border-stone-200 dark:border-darkBg-border">
          <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
          <span>
            <strong>Note:</strong> Administrator accounts cannot be created publicly and are provisioned directly by the backend administrative team.
          </span>
        </div>

        <Card className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
              {error}
            </div>
          )}

          {activeTab === 'parent' ? (
            /* PARENT REGISTRATION FORM */
            <form onSubmit={handleParentSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Sarah Jenkins"
                leftIcon={<User className="w-4 h-4" />}
                value={pName}
                onChange={(e) => setPName(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="sarah@example.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={pEmail}
                  onChange={(e) => setPEmail(e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 012-3456"
                  leftIcon={<Phone className="w-4 h-4" />}
                  value={pPhone}
                  onChange={(e) => setPPhone(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={pPassword}
                  onChange={(e) => setPPassword(e.target.value)}
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={pConfirmPassword}
                  onChange={(e) => setPConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                Create Parent Account
              </Button>
            </form>
          ) : (
            /* DOCTOR REGISTRATION FORM */
            <form onSubmit={handleDoctorSubmit} className="space-y-4">
              <Input
                label="Full Name & Title"
                placeholder="Dr. Ananya Sharma"
                leftIcon={<User className="w-4 h-4" />}
                value={dName}
                onChange={(e) => setDName(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Professional Email"
                  type="email"
                  placeholder="doctor@clinic.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={dEmail}
                  onChange={(e) => setDEmail(e.target.value)}
                  required
                />
                <Input
                  label="Contact Phone"
                  type="tel"
                  placeholder="+1 (555) 987-6543"
                  leftIcon={<Phone className="w-4 h-4" />}
                  value={dPhone}
                  onChange={(e) => setDPhone(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Medical Qualification"
                  placeholder="MD, DCH (Pediatrics)"
                  value={dQualification}
                  onChange={(e) => setDQualification(e.target.value)}
                  required
                />
                <Input
                  label="Medical Registration No."
                  placeholder="MED-REG-847291"
                  value={dRegNumber}
                  onChange={(e) => setDRegNumber(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Specialization"
                  placeholder="Pediatrics / Neonatology"
                  value={dSpecialization}
                  onChange={(e) => setDSpecialization(e.target.value)}
                  required
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  placeholder="10"
                  value={dYears}
                  onChange={(e) => setDYears(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Clinic or Hospital Name"
                placeholder="Blossom Children’s Hospital & Care Clinic"
                leftIcon={<Building className="w-4 h-4" />}
                value={dClinic}
                onChange={(e) => setDClinic(e.target.value)}
                required
              />

              <Input
                label="Set Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                value={dPassword}
                onChange={(e) => setDPassword(e.target.value)}
                required
              />

              {/* Supporting Document Upload UI */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-nurturaText-secondary dark:text-sage-300">
                  Supporting Medical Credential / License (PDF / Image)
                </label>
                <div className="border-2 border-dashed border-stone-200 dark:border-darkBg-border rounded-2xl p-4 text-center bg-stone-50 dark:bg-darkBg-surface hover:bg-stone-100 transition-colors">
                  <input
                    type="file"
                    id="doc-upload"
                    className="hidden"
                    accept=".pdf,.png,.jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDFile(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud className="w-7 h-7 text-sage-600 mb-1" />
                    <span className="text-xs font-semibold text-nurturaText-primary dark:text-cream-100">
                      {dFile ? dFile.name : 'Click to upload medical council document'}
                    </span>
                    <span className="text-[10px] text-stone-400 mt-0.5">
                      PDF, PNG or JPG (Max 10MB)
                    </span>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                Submit Pediatrician Application
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-stone-100 dark:border-darkBg-border text-center text-xs text-nurturaText-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-sage-600 hover:underline">
              Log In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
