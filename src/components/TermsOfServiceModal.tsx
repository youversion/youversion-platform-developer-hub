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

interface TermsOfServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

const TermsOfServiceModal = ({ open, onOpenChange, onAccept }: TermsOfServiceModalProps) => {
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
          <DialogTitle>YouVersion Terms of Service</DialogTitle>
          <DialogDescription>
            Please review our Terms of Service below.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea ref={scrollAreaRef} className="h-[400px] pr-4">
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
              <p>By accessing and using the YouVersion Platform, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">2. Use License</h3>
              <p>Permission is granted to temporarily download one copy of the materials on YouVersion's platform for personal, non-commercial transitory viewing only.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">3. Disclaimer</h3>
              <p>The materials on YouVersion's platform are provided on an 'as is' basis. YouVersion makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">4. Limitations</h3>
              <p>In no event shall YouVersion or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on YouVersion's platform.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">5. Privacy Policy</h3>
              <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our platform.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">6. User Conduct</h3>
              <p>You agree to use the platform in a manner consistent with applicable laws and regulations.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">7. Termination</h3>
              <p>We may terminate or suspend your account and access to the platform at our sole discretion.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">8. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
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

export default TermsOfServiceModal;
