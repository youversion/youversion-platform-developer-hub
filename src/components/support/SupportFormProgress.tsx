import React from 'react';
import { Progress } from '@/components/ui/progress';
import { SUPPORT_FORM_CONSTANTS } from '@/constants/supportForm';

interface SupportFormProgressProps {
  currentStep: number;
}

export const SupportFormProgress: React.FC<SupportFormProgressProps> = ({ currentStep }) => {
  const progress = (currentStep / SUPPORT_FORM_CONSTANTS.TOTAL_STEPS) * 100;

  return <Progress value={progress} className="h-2" />;
};