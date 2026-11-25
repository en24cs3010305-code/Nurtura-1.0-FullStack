import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error loading this information. Please try again.',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-rose-200 dark:border-rose-900/40 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 my-4">
      <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-heading font-semibold text-rose-900 dark:text-rose-200">
        {title}
      </h4>
      <p className="text-xs text-rose-700/80 dark:text-rose-300 max-w-sm mt-1 mb-4">
        {message}
      </p>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
