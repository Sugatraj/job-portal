import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  actions?: ActionButton[];
  className?: string;
}

export function PageHeader({ 
  title, 
  onBack, 
  actions = [], 
  className = '' 
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left Side - Back Button */}
      <div className="flex items-center">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Center - Page Title */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
      </div>

      {/* Right Side - Action Buttons */}
      <div className="flex items-center gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'default'}
            onClick={action.onClick}
            disabled={action.disabled}
            className="flex items-center gap-2"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
