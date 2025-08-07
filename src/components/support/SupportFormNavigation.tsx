import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SUPPORT_FORM_CONSTANTS } from '@/constants/supportForm';

interface SupportFormNavigationProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  isSubmitting: boolean;
}

export const SupportFormNavigation: React.FC<SupportFormNavigationProps> = ({
  currentStep,
  onPrevStep,
  onNextStep,
  isSubmitting,
}) => {
  return (
    <div className="flex justify-between pt-6 border-t">
      <Button
        type="button"
        variant="stroked"
        onClick={onPrevStep}
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {currentStep < SUPPORT_FORM_CONSTANTS.TOTAL_STEPS ? (
        <Button
          type="button"
          onClick={onNextStep}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
        </Button>
      )}
    </div>
  );
};