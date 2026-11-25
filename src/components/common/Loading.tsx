import React from 'react';
import { cn } from '../../utils/cn';

export const Loading: React.FC<{ message?: string; fullPage?: boolean; className?: string }> = ({
  message = 'Loading details...',
  fullPage = false,
  className
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 gap-3 text-sage-600 dark:text-sage-300',
        fullPage && 'min-h-[50vh]',
        className
      )}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-sage-200 dark:border-sage-800 border-t-sage-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-sage-600" />
        </div>
      </div>
      <p className="text-xs font-medium text-nurturaText-secondary dark:text-stone-300">{message}</p>
    </div>
  );
};
