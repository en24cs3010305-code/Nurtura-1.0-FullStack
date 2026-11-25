import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions, badge }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-sage-100/60 dark:border-darkBg-border mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-nurturaText-primary dark:text-cream-50">
            {title}
          </h1>
          {badge}
        </div>
        {subtitle && (
          <p className="text-sm text-nurturaText-secondary dark:text-stone-300">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5 flex-wrap">{actions}</div>}
    </div>
  );
};
