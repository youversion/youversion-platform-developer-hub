import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';
import { SUPPORT_FORM_CONSTANTS } from '@/constants/supportForm';

interface SupportFormSuccessProps {
  ticketNumber: string;
  onSubmitAnother: () => void;
  onClose: () => void;
}

export const SupportFormSuccess: React.FC<SupportFormSuccessProps> = ({
  ticketNumber,
  onSubmitAnother,
  onClose,
}) => {
  return (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold mb-2">Ticket Submitted Successfully!</h3>
      <p className="text-muted-foreground mb-4">
        Your support ticket <Badge variant="outline">{ticketNumber}</Badge> has been created.
      </p>
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Expected response time: {SUPPORT_FORM_CONSTANTS.EXPECTED_RESPONSE_TIME}</span>
        </div>
      </div>
      <div className="space-y-3">
        <Button onClick={onSubmitAnother} className="w-full">
          Submit Another Ticket
        </Button>
        <Button variant="stroked" onClick={onClose} className="w-full">
          Return to Support
        </Button>
      </div>
    </div>
  );
};