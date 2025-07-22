import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Code, User, BookOpen, Zap } from 'lucide-react';


const GetStarted = () => {
  const navigate = useNavigate();

  // Load the YouVersion Platform SDK and set up auth callbacks
  useEffect(() => {
    // Load the SDK script if not already loaded
    if (!document.querySelector('script[src="https://api-dev.youversion.com/sdk.js"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://api-dev.youversion.com/sdk.js";
      document.head.appendChild(script);
    }

    // Set a default app ID for the SDK (you can change this)
    document.body.dataset.youversionPlatformAppId = "HA4jkyN78myh9BIiPE5Bo9FMzBcE5pjGANJOQNIx542llAC3";

    // Set up auth callback handlers
    (window as any).onYouVersionAuthComplete = (authData: any) => {
      console.log("Login successful!", authData);
      if (authData?.lat) {
        // Store the LAT token and navigate to platform
        localStorage.setItem('yvp_lat', authData.lat);
        navigate('/platform');
      }
    };

    (window as any).onYouVersionAuthLoad = (authData: any) => {
      console.log("Auth data loaded:", authData);
    };

    (window as any).onYouVersionSignOut = () => {
      console.log("User logged out");
      localStorage.removeItem('yvp_lat');
    };

    // Cleanup function
    return () => {
      delete (document.body.dataset as Record<string, string>).youversionPlatformAppId;
    };
  }, [navigate]);

  return (
    <div className="container py-12">
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
              <User className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>1. Sign in with YouVersion and connect to the Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Sign up for a developer account and create an App key to start making requests to the YouVersion APIs.</CardDescription>
              {/* @ts-ignore – custom web component from the YouVersion SDK */}
              <sign-in-with-youversion-button></sign-in-with-youversion-button>
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
              <Button asChild variant="default">
                <Link to="/docs/quick-start">View Documentation</Link>
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
              <Button asChild variant="default">
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
              <Button asChild variant="default">
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
          <Button asChild variant="filled-secondary">
            <Link to="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
