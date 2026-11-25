import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-nurturaText-secondary mb-3">
      <Link to="/" className="hover:text-sage-600 flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            {item.href && !isLast ? (
              <Link to={item.href} className="hover:text-sage-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-nurturaText-primary dark:text-cream-200">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
