import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Mail, CheckCircle2, RotateCw } from 'lucide-react';

export const EmailVerificationPage: React.FC = () => {
  const [resending, setResending] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setSentMessage(true);
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <Card className="text-center py-8 px-6 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-sage-100 dark:bg-sage-900/60 text-sage-700 flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-nurturaText-primary dark:text-cream-100">
            Verify Your Email
          </h2>
          <p className="text-xs text-nurturaText-secondary leading-relaxed">
            We have sent a verification confirmation link to your email address. Please click the link inside to activate full access.
          </p>

          {sentMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
              New verification email dispatched!
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={handleResend} isLoading={resending} leftIcon={<RotateCw className="w-3.5 h-3.5" />}>
              Resend Verification Email
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="w-full">
                Return to Login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
