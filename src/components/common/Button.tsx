import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-sage-600 hover:bg-sage-700 text-white focus:ring-sage-500 shadow-sm hover:shadow',
    secondary: 'bg-cream-200 hover:bg-cream-300 text-nurturaText-primary dark:bg-darkBg-card dark:text-sage-100 dark:hover:bg-darkBg-border',
    outline: 'border border-sage-600/30 text-sage-600 hover:bg-sage-50 dark:border-sage-400 dark:text-sage-300 dark:hover:bg-darkBg-surface',
    ghost: 'text-nurturaText-secondary hover:text-nurturaText-primary hover:bg-black/5 dark:hover:bg-white/5',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
    soft: 'bg-sage-100 text-sage-700 hover:bg-sage-200 dark:bg-sage-900/40 dark:text-sage-200 dark:hover:bg-sage-900/60'
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-2xl'
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 mr-2 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
