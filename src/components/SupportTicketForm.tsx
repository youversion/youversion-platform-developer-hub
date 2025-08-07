import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { supportTicketSchema, SupportTicketFormData, defaultFormValues } from '@/schemas/supportTicket';
import { SUPPORT_FORM_CONSTANTS } from '@/constants/supportForm';
import { useSupportFormState } from '@/hooks/useSupportFormState';
import { useSupportTicketSubmission } from '@/hooks/useSupportTicketSubmission';
import { SupportFormStep1 } from '@/components/support/SupportFormStep1';
import { SupportFormStep2 } from '@/components/support/SupportFormStep2';
import { SupportFormProgress } from '@/components/support/SupportFormProgress';
import { SupportFormNavigation } from '@/components/support/SupportFormNavigation';
import { SupportFormSuccess } from '@/components/support/SupportFormSuccess';

interface SupportTicketFormProps {
  children: React.ReactNode;
}


const SupportTicketForm: React.FC<SupportTicketFormProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentStep,
    isSubmitted,
    ticketNumber,
    nextStep,
    prevStep,
    resetForm: resetFormState,
    setIsSubmitted,
    setTicketNumber,
  } = useSupportFormState();
  const { submitTicket } = useSupportTicketSubmission();

  const form = useForm<SupportTicketFormData>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: defaultFormValues,
  });

  const { watch } = form;
  const selectedCategory = watch('category');

  const onSubmit = async (data: SupportTicketFormData) => {
    try {
      const ticketNum = await submitTicket(data);
      setTicketNumber(ticketNum);
      setIsSubmitted(true);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const resetForm = () => {
    form.reset();
    resetFormState();
    setIsOpen(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SupportFormStep1 form={form} selectedCategory={selectedCategory} />;
      case 2:
        return <SupportFormStep2 form={form} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? 'Ticket Submitted' : 'Submit Support Ticket'}
          </DialogTitle>
          {!isSubmitted && (
            <DialogDescription>
              Step {currentStep} of {SUPPORT_FORM_CONSTANTS.TOTAL_STEPS} - Help us understand your issue
            </DialogDescription>
          )}
        </DialogHeader>

        {isSubmitted ? (
          <SupportFormSuccess
            ticketNumber={ticketNumber}
            onSubmitAnother={resetForm}
            onClose={() => setIsOpen(false)}
          />
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <SupportFormProgress currentStep={currentStep} />
              {renderStepContent()}
              <SupportFormNavigation
                currentStep={currentStep}
                onPrevStep={prevStep}
                onNextStep={nextStep}
                isSubmitting={form.formState.isSubmitting}
              />
            </form>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SupportTicketForm;