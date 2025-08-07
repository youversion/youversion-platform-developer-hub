import { useState } from 'react';
import { SUPPORT_FORM_CONSTANTS } from '@/constants/supportForm';

export const useSupportFormState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const nextStep = () => {
    if (currentStep < SUPPORT_FORM_CONSTANTS.TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setTicketNumber('');
  };

  return {
    currentStep,
    isSubmitted,
    ticketNumber,
    nextStep,
    prevStep,
    resetForm,
    setIsSubmitted,
    setTicketNumber,
  };
};