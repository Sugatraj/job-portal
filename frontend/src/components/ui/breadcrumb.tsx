import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4" />
          )}
          {item.href ? (
            <a 
              href={item.href} 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              {item.icon && item.icon}
              {item.label}
            </a>
          ) : (
            <span className="text-foreground font-medium flex items-center gap-1">
              {item.icon && item.icon}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
