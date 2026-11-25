import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-darkBg-card rounded-2xl border border-sage-100/70 dark:border-darkBg-border p-6 shadow-soft transition-all duration-200',
        hoverEffect && 'hover:shadow-medium hover:-translate-y-0.5 transition-transform duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
