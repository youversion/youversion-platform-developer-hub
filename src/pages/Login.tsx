
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import CreateAccountForm from '@/components/auth/CreateAccountForm';
import ConnectForm from '@/components/auth/ConnectForm';

const Login = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const location = useLocation();

  useEffect(() => {
    // Set active tab based on current route
    if (location.pathname === '/signin') {
      setActiveTab('signin');
    } else if (location.pathname === '/create-account') {
      setActiveTab('create');
    } else if (location.pathname === '/yv-connect') {
      setActiveTab('connect');
    }
  }, [location.pathname]);

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="create">Create Account</TabsTrigger>
              <TabsTrigger value="connect">YouVersion Connect</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="mt-6">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="create" className="mt-6">
              <CreateAccountForm />
            </TabsContent>
            
            <TabsContent value="connect" className="mt-6">
              <ConnectForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
