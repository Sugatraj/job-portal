import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface FormHeaderProps {
  title: string;
  onCancel: () => void;
  onSubmit: (e?: React.FormEvent) => void | Promise<void>;
  isSubmitting: boolean;
  isFormValid: boolean;
  submitButtonText: string;
  submitButtonIcon?: React.ReactNode;
  loadingText?: string;
}

export function FormHeader({
  title,
  onCancel,
  onSubmit,
  isSubmitting,
  isFormValid,
  submitButtonText,
  submitButtonIcon = <Save className="mr-2 h-4 w-4" />,
  loadingText = "Processing...",
}: FormHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onCancel}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      
      <Button 
        onClick={() => onSubmit()}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {submitButtonIcon}
            {submitButtonText}
          </>
        )}
      </Button>
    </div>
  );
}