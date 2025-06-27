import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Code, Key, BookOpen, Zap } from 'lucide-react';

const GetStarted = () => {
  return (
    <div className="container py-12 canvas-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get Started with YouVersion Platform</h1>
          <p className="text-xl text-muted-foreground">
            Start building with Bible content in just a few steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Key className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>1. Get Your API Key</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Sign up for a developer account and get your free API key to start making requests.
              </CardDescription>
              <Button asChild>
                <Link to="/login">Create Account</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>2. Make Your First Request</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Learn how to authenticate and make your first API call to retrieve Bible content.
              </CardDescription>
              <Button variant="outline" asChild>
                <Link to="/docs">View Documentation</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>3. Explore Bible Content</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Browse our directory of available Bible translations and choose the ones for your app.
              </CardDescription>
              <Button variant="outline" asChild>
                <Link to="/bible-directory">Browse Bibles</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>4. Build Amazing Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Use our examples and code samples to quickly integrate Bible content into your applications.
              </CardDescription>
              <Button variant="outline" asChild>
                <Link to="/examples">View Examples</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you get started with the YouVersion Platform.
          </p>
          <Button variant="outline" asChild>
            <Link to="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
