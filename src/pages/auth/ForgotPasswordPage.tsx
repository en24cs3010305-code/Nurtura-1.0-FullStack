import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Reset Password
          </h2>
          <p className="text-xs text-nurturaText-secondary dark:text-stone-300">
            Enter your registered email address to receive password reset instructions
          </p>
        </div>

        <Card>
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-heading font-bold">Check Your Inbox</h3>
              <p className="text-xs text-nurturaText-secondary leading-relaxed">
                If an account exists for <strong>{email}</strong>, a recovery link has been sent. Follow the instructions to reset your password.
              </p>
              <div className="pt-2">
                <Link to="/reset-password">
                  <Button variant="soft" size="sm">
                    Proceed to Reset UI (Demo Link)
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-darkBg-border text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-600 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
