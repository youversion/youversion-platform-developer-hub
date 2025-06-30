
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import StatementOfFaithModal from '@/components/StatementOfFaithModal';
import TermsOfServiceModal from '@/components/TermsOfServiceModal';

const CreateAccountForm = () => {
  const [statementOfFaithChecked, setStatementOfFaithChecked] = useState(false);
  const [termsOfServiceChecked, setTermsOfServiceChecked] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [statementOfFaithViewed, setStatementOfFaithViewed] = useState(false);
  const [termsOfServiceViewed, setTermsOfServiceViewed] = useState(false);

  const handleStatementOfFaithClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowStatementModal(true);
    setStatementOfFaithViewed(true);
  };

  const handleTermsOfServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTermsModal(true);
    setTermsOfServiceViewed(true);
  };

  const handleStatementOfFaithAccept = () => {
    setStatementOfFaithChecked(true);
  };

  const handleTermsOfServiceAccept = () => {
    setTermsOfServiceChecked(true);
  };

  const handleStatementOfFaithChange = (checked: boolean | "indeterminate") => {
    setStatementOfFaithChecked(checked === true);
  };

  const handleTermsOfServiceChange = (checked: boolean | "indeterminate") => {
    setTermsOfServiceChecked(checked === true);
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <Label htmlFor="full-name">Full Name</Label>
          <Input
            id="full-name"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="create-email">Email</Label>
          <Input
            id="create-email"
            type="email"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <Label htmlFor="organization-type">Organization Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select organization type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="organization">Organization or Ministry</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="bible_publisher">Bible Publiser</SelectItem>
              <SelectItem value="church">Church</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="create-password">Password</Label>
          <Input
            id="create-password"
            type="password"
            placeholder="Create a password"
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="statement-of-faith" 
              checked={statementOfFaithChecked}
              onCheckedChange={handleStatementOfFaithChange}
              disabled={!statementOfFaithViewed}
            />
            <Label htmlFor="statement-of-faith" className="text-sm leading-5">
              I agree to the{' '}
              <button
                type="button"
                onClick={handleStatementOfFaithClick}
                className="underline font-semibold hover:text-primary"
              >
                Statement of Faith
              </button>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms-of-service" 
              checked={termsOfServiceChecked}
              onCheckedChange={handleTermsOfServiceChange}
              disabled={!termsOfServiceViewed}
            />
            <Label htmlFor="terms-of-service" className="text-sm leading-5">
              I agree to the{' '}
              <button
                type="button"
                onClick={handleTermsOfServiceClick}
                className="underline font-semibold hover:text-primary"
              >
                YouVersion Terms of Service
              </button>
            </Label>
          </div>
        </div>
        <Button className="w-full">
          Create Account
        </Button>
      </div>

      <StatementOfFaithModal
        open={showStatementModal}
        onOpenChange={setShowStatementModal}
        onAccept={handleStatementOfFaithAccept}
      />

      <TermsOfServiceModal
        open={showTermsModal}
        onOpenChange={setShowTermsModal}
        onAccept={handleTermsOfServiceAccept}
      />
    </>
  );
};

export default CreateAccountForm;
