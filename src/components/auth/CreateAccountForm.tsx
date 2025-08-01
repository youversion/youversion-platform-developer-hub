
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import StatementOfFaithModal from '@/components/StatementOfFaithModal';
import TermsOfServiceModal from '@/components/TermsOfServiceModal';

const CreateAccountForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statementOfFaithChecked, setStatementOfFaithChecked] = useState(false);
  const [termsOfServiceChecked, setTermsOfServiceChecked] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [statementOfFaithViewed, setStatementOfFaithViewed] = useState(false);
  const [termsOfServiceViewed, setTermsOfServiceViewed] = useState(false);
  const [organizationType, setOrganizationType] = useState('');
  const [profitStatus, setProfitStatus] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (!statementOfFaithChecked || !termsOfServiceChecked) {
      console.error('Must accept both Statement of Faith and Terms of Service');
      return;
    }

    try {
      // Simulate account creation and automatic login
      await login(email, password);
      console.log('Account created and logged in successfully');
      navigate('/platform');
    } catch (error) {
      console.error('Account creation failed:', error);
    }
  };

  const handleOrganizationTypeChange = (value: string) => {
    setOrganizationType(value);
    if (value === 'bible_publisher') {
      navigate('/yv-connect');
    }
  };

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

  const renderOrganizationFields = () => {
    const profitStatusField = (
      <div>
        <Label htmlFor="profit-status">Profit Status</Label>
        <Select onValueChange={setProfitStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select profit status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="for-profit">For Profit</SelectItem>
            <SelectItem value="non-profit">Non Profit</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );

    switch (organizationType) {
      case 'organization':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="organization-name">Organization Name</Label>
              <Input
                id="organization-name"
                type="text"
                placeholder="Enter organization name"
              />
            </div>
            {profitStatusField}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="zip">Zip</Label>
                <Input
                  id="zip"
                  type="text"
                  placeholder="Enter zip code"
                />
              </div>
            </div>
          </div>
        );
      case 'individual':
        return (
          <div className="space-y-4">
            {profitStatusField}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="zip">Zip</Label>
                <Input
                  id="zip"
                  type="text"
                  placeholder="Enter zip code"
                />
              </div>
            </div>
          </div>
        );
      case 'church':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="church-name">Church Name</Label>
              <Input
                id="church-name"
                type="text"
                placeholder="Enter church name"
              />
            </div>
            <div>
              <Label htmlFor="denomination">Denomination</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select denomination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baptist">Baptist</SelectItem>
                  <SelectItem value="methodist">Methodist</SelectItem>
                  <SelectItem value="presbyterian">Presbyterian</SelectItem>
                  <SelectItem value="lutheran">Lutheran</SelectItem>
                  <SelectItem value="episcopal">Episcopal</SelectItem>
                  <SelectItem value="pentecostal">Pentecostal</SelectItem>
                  <SelectItem value="non-denominational">Non-denominational</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {profitStatusField}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="zip">Zip</Label>
                <Input
                  id="zip"
                  type="text"
                  placeholder="Enter zip code"
                />
              </div>
            </div>
          </div>
        );
      case 'other':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="other-organization-type">Organization Type</Label>
              <Input
                id="other-organization-type"
                type="text"
                placeholder="Specify organization type"
              />
            </div>
            {profitStatusField}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="zip">Zip</Label>
                <Input
                  id="zip"
                  type="text"
                  placeholder="Enter zip code"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="other-details">Other Details</Label>
              <Textarea
                id="other-details"
                placeholder="Please provide additional details"
                rows={3}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="full-name">Full Name</Label>
          <Input
            id="full-name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="create-email">Email</Label>
          <Input
            id="create-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="organization-type">Organization Type</Label>
          <Select onValueChange={handleOrganizationTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select organization type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="organization">Organization or Ministry</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="bible_publisher">Bible Publisher</SelectItem>
              <SelectItem value="church">Church</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {renderOrganizationFields()}
        <div>
          <Label htmlFor="create-password">Password</Label>
          <Input
            id="create-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

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
