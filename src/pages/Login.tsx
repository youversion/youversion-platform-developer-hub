
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import StatementOfFaithModal from '@/components/StatementOfFaithModal';
import TermsOfServiceModal from '@/components/TermsOfServiceModal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statementOfFaithChecked, setStatementOfFaithChecked] = useState(false);
  const [termsOfServiceChecked, setTermsOfServiceChecked] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [statementOfFaithViewed, setStatementOfFaithViewed] = useState(false);
  const [termsOfServiceViewed, setTermsOfServiceViewed] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/platform');
    } catch (error) {
      console.error('Login failed:', error);
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

  return (
    <div className="container py-20">
      <Card className="w-full max-w-[620px] mx-auto">
        <CardHeader>
          <CardTitle>Welcome to the YouVersion Platform</CardTitle>
          <CardDescription>
            Access your developer account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="create">Create Account</TabsTrigger>
              <TabsTrigger value="connect">YouVersion Connect</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="create" className="mt-6">
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
                      <SelectItem value="church">Church</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
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
            </TabsContent>
            
            <TabsContent value="connect" className="mt-6">
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Connect with your existing YouVersion account
                </p>
                <Button className="w-full">
                  Connect with YouVersion
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default Login;
