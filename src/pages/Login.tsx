import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login
  } = useAuth();
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
  return <div className="container py-20">
      <div className="max-w-1/2 mx-auto">
        <Card>
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
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="create" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="create-email">Email</Label>
                    <Input id="create-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="create-password">Password</Label>
                    <Input id="create-password" type="password" placeholder="Create a password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm your password" />
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
                  <Button className="w-full" variant="outline">
                    Connect with YouVersion
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Login;