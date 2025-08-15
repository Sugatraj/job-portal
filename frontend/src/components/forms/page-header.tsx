import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  actionButton?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export function PageHeader({
  title,
  onBack,
  actionButton,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      
      {actionButton && (
        <Button onClick={actionButton.onClick}>
          {actionButton.icon}
          {actionButton.text}
        </Button>
      )}
    </div>
  );
}
