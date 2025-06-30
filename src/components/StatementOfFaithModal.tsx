
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface StatementOfFaithModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

const StatementOfFaithModal = ({ open, onOpenChange, onAccept }: StatementOfFaithModalProps) => {
  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Statement of Faith</DialogTitle>
          <DialogDescription>
            Please review our Statement of Faith below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">The Holy Scriptures</h3>
            <p>We believe the Bible to be the inspired, the only infallible, authoritative Word of God.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">The Trinity</h3>
            <p>We believe that there is one God, eternally existent in three persons: Father, Son and Holy Spirit.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Jesus Christ</h3>
            <p>We believe in the deity of our Lord Jesus Christ, in His virgin birth, in His sinless life, in His miracles, in His vicarious and atoning death through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father, and in His personal return in power and glory.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Salvation</h3>
            <p>We believe that for the salvation of lost and sinful people, regeneration by the Holy Spirit is absolutely essential.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">The Holy Spirit</h3>
            <p>We believe in the present ministry of the Holy Spirit by whose indwelling the Christian is enabled to live a godly life.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAccept}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatementOfFaithModal;
