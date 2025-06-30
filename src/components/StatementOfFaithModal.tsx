import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StatementOfFaithModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

const StatementOfFaithModal = ({ open, onOpenChange, onAccept }: StatementOfFaithModalProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setHasScrolledToBottom(false);
    }
  }, [open]);

  useEffect(() => {
    if (!scrollAreaRef.current || !open) return;

    const scrollViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollViewport) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollViewport;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setHasScrolledToBottom(isAtBottom);
    };

    scrollViewport.addEventListener('scroll', handleScroll);
    
    // Check initial state
    handleScroll();

    return () => {
      scrollViewport.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Statement of Faith</DialogTitle>
          <DialogDescription>
            Please review our Statement of Faith below.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea ref={scrollAreaRef} className="h-[400px] pr-4">
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
            
            <div>
              <h3 className="font-semibold mb-2">The Church</h3>
              <p>We believe in the spiritual unity of believers in our Lord Jesus Christ.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">The Second Coming</h3>
              <p>We believe in the personal return of Jesus Christ to earth in power and glory.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Eternal Life</h3>
              <p>We believe in the resurrection of both the saved and the lost; they that are saved unto the resurrection of life and they that are lost unto the resurrection of damnation.</p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAccept} disabled={!hasScrolledToBottom}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatementOfFaithModal;
