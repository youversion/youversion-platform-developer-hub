import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Code, User, BookOpen, Zap } from 'lucide-react';

// Extend window interface for YouVersion SDK callbacks
declare global {
  interface Window {
    onYouVersionAuthComplete?: (authData: {
      lat?: string;
    }) => void;
    onYouVersionAuthLoad?: (authData: unknown) => void;
    onYouVersionSignOut?: () => void;
  }
}

// Declare custom element for YouVersion sign-in button
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sign-in-with-youversion-button': any;
    }
  }
}
const apps = [{
  name: "Lovable Preview Dev Portal",
  callback_uri: "https://preview--yv-platform-dev.lovable.app/callback",
  app_id: "gGzypYFGGi7eGzFGYEiSyMnlbtDBfAYQs2YO6AHgE7jrjZIF"
}, {
  name: "Lovable Editor Dev Portal",
  callback_uri: "https://lovable.dev/projects/1db92764-c613-4359-a989-a9a7c646763e/callback",
  app_id: "gKtUcNTYQ0mcAYte9Uta9KZRUAA4u5FcdOnTYmggiBFtKStJ"
}, {
  name: "YV Dev Portal",
  callback_uri: "https://developers.youversion.com/callback",
  app_id: "dkV1PqA2YwNdtzGGYlZWAxAk72mJDUWmVd6QeIRqr9WlLjX2"
}, {
  name: "Localhost8080 Dev Portal",
  callback_uri: "http://localhost:8080/callback",
  app_id: "iAfkrb9YmBbmASXMGPXxxwLXEFXkXa7cyLLwzc2GpQuGgtJW"
}];
const GetStarted = () => {
  const navigate = useNavigate();
  const {
    theme
  } = useTheme();
  const [selectedApp, setSelectedApp] = React.useState(() => {
    const currentHostname = window.location.hostname;
    const matchedApp = apps.find(app => {
      try {
        const appHostname = new URL(app.callback_uri).hostname;
        return appHostname === currentHostname;
      } catch (e) {
        return false;
      }
    });
    return matchedApp || apps[0];
  });

  // Helper function to get the resolved theme
  const getResolvedTheme = () => {
    if (theme === "light") {
      return "dark";
    } else if (theme === "dark") {
      return "light";
    }
    return theme;
  };

  // Load the YouVersion Platform SDK and set up auth callbacks
  useEffect(() => {
    // Load the SDK script if not already loaded
    if (!document.querySelector('script[src="https://api-dev.youversion.com/sdk.js"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://api-dev.youversion.com/sdk.js";
      document.head.appendChild(script);
    }

    // Set the app ID for the SDK
    document.body.dataset.youversionPlatformAppId = selectedApp.app_id;

    // Set up auth callback handlers
    window.onYouVersionAuthComplete = (authData: {
      lat?: string;
    }) => {
      console.log("Login successful!", authData);
      if (authData?.lat) {
        // Store the LAT token and navigate to callback
        localStorage.setItem('yvp_lat', authData.lat);
        navigate('/callback');
      }
    };
    window.onYouVersionAuthLoad = (authData: unknown) => {
      console.log("Auth data loaded:", authData);
    };
    window.onYouVersionSignOut = () => {
      console.log("User logged out");
      localStorage.removeItem('yvp_lat');
    };

    // Cleanup function to remove the app ID when component unmounts
    return () => {
      delete (document.body.dataset as Record<string, string>).youversionPlatformAppId;
    };
  }, [navigate, selectedApp]);
  return <div className="container py-12">
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
              <CardDescription className="mb-4">Already have a YouVersion account? Use your existing credentials to sign in. 

New to YouVersion? No problem—create a new account to get started. Once you're signed up, create an App key to begin making requests to the YouVersion APIs.

            </CardDescription>
              <sign-in-with-youversion-button callback-uri={selectedApp.callback_uri} theme={getResolvedTheme()} stroked></sign-in-with-youversion-button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>2. Make Your First Request</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Once you're signed up, create an App key to begin making requests to the YouVersion APIs.

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
    </div>;
};
export default GetStarted;