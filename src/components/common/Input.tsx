import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-nurturaText-secondary dark:text-sage-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-nurturaText-secondary dark:text-sage-300">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-white dark:bg-darkBg-card border border-stone-200 dark:border-darkBg-border rounded-xl text-sm text-nurturaText-primary dark:text-cream-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 py-2.5 px-3.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-600 disabled:opacity-50 disabled:bg-stone-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-nurturaText-secondary dark:text-sage-300">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-nurturaText-secondary dark:text-stone-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
