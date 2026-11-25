import React from 'react';
import { Button } from './Button';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-sage-200 dark:border-darkBg-border rounded-3xl bg-sage-50/40 dark:bg-darkBg-card/40 my-4">
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-darkBg-surface flex items-center justify-center text-sage-600 dark:text-sage-300 shadow-soft mb-3">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-base font-heading font-semibold text-nurturaText-primary dark:text-cream-100">
        {title}
      </h4>
      <p className="text-xs text-nurturaText-secondary dark:text-stone-300 max-w-sm mt-1 mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button size="sm" variant="soft" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
