import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { UserRole } from '../../types';
import { Baby, Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowRight, Stethoscope, User, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('sarah.jenkins@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('parent');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password, rememberMe }, selectedRole);
      if (selectedRole === 'parent') navigate('/parent');
      else if (selectedRole === 'doctor') navigate('/doctor');
      else if (selectedRole === 'admin') navigate('/admin');
    } catch (err: any) {
      setError('Login failed. Please check credentials or use demo presets.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoPreset = async (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'parent') {
      setEmail('sarah.jenkins@example.com');
    } else if (role === 'doctor') {
      setEmail('dr.ananya@nurturacare.com');
    } else if (role === 'admin') {
      setEmail('admin@nurtura.app');
    }
    setIsLoading(true);
    await login({ email: role === 'parent' ? 'sarah.jenkins@example.com' : role === 'doctor' ? 'dr.ananya@nurturacare.com' : 'admin@nurtura.app' }, role);
    setIsLoading(false);
    if (role === 'parent') navigate('/parent');
    else if (role === 'doctor') navigate('/doctor');
    else if (role === 'admin') navigate('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-sage-600 flex items-center justify-center text-white shadow-soft">
              <Baby className="w-6 h-6" />
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Welcome Back to Nurtura
          </h2>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300">
            Sign in to access your baby care journal or clinical practice
          </p>
        </div>

        {/* Demo Fast-Login Selector */}
        <div className="p-3.5 rounded-2xl bg-sage-50/80 dark:bg-darkBg-card border border-sage-200/60 dark:border-darkBg-border space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-sage-800 dark:text-sage-200">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-sage-600" />
              One-Click Development Demo Accounts:
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoPreset('parent')}
              className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border hover:border-sage-500 hover:bg-sage-50/50 transition-all text-center"
            >
              <User className="w-4 h-4 text-peach-600 mb-1" />
              <span className="text-[11px] font-bold text-nurturaText-primary dark:text-cream-100">Parent</span>
              <span className="text-[9px] text-stone-400">Sarah</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoPreset('doctor')}
              className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border hover:border-sage-500 hover:bg-sage-50/50 transition-all text-center"
            >
              <Stethoscope className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-nurturaText-primary dark:text-cream-100">Doctor</span>
              <span className="text-[9px] text-stone-400">Dr. Sharma</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoPreset('admin')}
              className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border hover:border-sage-500 hover:bg-sage-50/50 transition-all text-center"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600 mb-1" />
              <span className="text-[11px] font-bold text-nurturaText-primary dark:text-cream-100">Admin</span>
              <span className="text-[9px] text-stone-400">Security</span>
            </button>
          </div>
        </div>

        {/* Card Form */}
        <Card className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-stone-700 dark:hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-nurturaText-secondary">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sage-600 focus:ring-sage-500"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sage-600 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Account
            </Button>
          </form>

          <div className="pt-4 border-t border-stone-100 dark:border-darkBg-border text-center text-xs text-nurturaText-secondary">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-sage-600 hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
