import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { BookOpen, LogIn, Zap, Smartphone, Settings, Database, Highlighter } from 'lucide-react';

// Extend window interface for YouVersion SDK callbacks
declare global {
  interface Window {
    onYouVersionAuthComplete?: (authData: { lat?: string }) => void;
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

const apps = [
  {
    name: "Lovable Preview Dev Portal",
    callback_uri: "https://preview--yv-platform-dev.lovable.app/callback",
    app_id: "gGzypYFGGi7eGzFGYEiSyMnlbtDBfAYQs2YO6AHgE7jrjZIF",
  },
  {
    name: "Lovable Editor Dev Portal",
    callback_uri: "https://lovable.dev/projects/1db92764-c613-4359-a989-a9a7c646763e/callback",
    app_id: "gKtUcNTYQ0mcAYte9Uta9KZRUAA4u5FcdOnTYmggiBFtKStJ",
  },
  {
    name: "YV Dev Portal",
    callback_uri: "https://developers.youversion.com/callback",
    app_id: "dkV1PqA2YwNdtzGGYlZWAxAk72mJDUWmVd6QeIRqr9WlLjX2",
  },
  {
    name: "Localhost8080 Dev Portal",
    callback_uri: "http://localhost:8080/callback",
    app_id: "iAfkrb9YmBbmASXMGPXxxwLXEFXkXa7cyLLwzc2GpQuGgtJW",
  },
];


const Index = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedApp, setSelectedApp] = React.useState(() => {
    const currentHostname = window.location.hostname;
    const matchedApp = apps.find((app) => {
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
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
    window.onYouVersionAuthComplete = (authData: { lat?: string }) => {
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

  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 dark:text-white bg-gradient-to-b from-white via-slate-400 to-slate-600 dark:from-slate-900 dark:via-slate-400 dark:to-slate-600">
        <div className="container">
          <div className="mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-black dark:text-white ">
              Build with YouVersion
            </h1>
            <p className="text-xl mb-8 text-black dark:text-slate-200">Integrate the Bible into your applications with our powerful SDKs and APIs.</p>
            <div className="flex flex-col gap-4 items-center">
              <div className="mb-6">
                <sign-in-with-youversion-button callback-uri={selectedApp.callback_uri} theme={getResolvedTheme()} text="Join the YouVersion Platform"></sign-in-with-youversion-button>
              </div>
              <Button size="xl" variant="filled-secondary" onClick={() => navigate('/docs/quick-start')} className="text-sm font-bold px-[40px] py-[30px]">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container items-center ">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">YouVersion Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate YouVersion functionality into your applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 text-foreground mb-4 mx-auto" />
                <CardTitle className="text-2xl">Bible Reader SDK</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  Embed the complete Bible reading experience
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Add the full YouVersion Bible reader to your application with customizable options for versions, reading plans, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Highlighter className="h-8 w-8 text-foreground mb-4 mx-auto" />
                <CardTitle className="text-2xl">Highlights, Notes and Saved Verses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  YouVersion Highlights and Notes in your application and synced
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Access and display users' highlights, notes, and saved verses from their YouVersion account directly in your application.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <LogIn className="h-8 w-8 text-foreground mb-4 mx-auto" />
                <CardTitle className="text-2xl">Sign in with YouVersion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  Seamless authentication for users
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Let users log in with their YouVersion account to access personalized content, bookmarks, highlights, and notes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Zap className="h-8 w-8 text-foreground mb-4 mx-auto" />
                <CardTitle className="text-2xl">Fast Track Bible Licensing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  Streamlined licensing for Bible content
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Get quick access to Bible version licensing through our fast-track approval process for approved developers and organizations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Smartphone className="h-8 w-8 text-foreground mb-4 mx-auto" />
                <CardTitle className="text-2xl">Multi-Platform Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  Support for iOS, Flutter, and Web
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Use our SDKs and APIs across multiple platforms with consistent interfaces and documentation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Settings className="h-8 w-8 text-foreground mb-4 mx-auto" />
                <CardTitle className="text-2xl">Developer Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  Manage your integrations
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Access API keys, monitor usage, and manage your YouVersion integrations from a single dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-2xl p-8 lg:p-16 text-center bg-slate-100 dark:text-white dark:bg-slate-800">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers already using YouVersion Platform APIs.
            </p>
            <Button size="lg" variant="filled-contrast" asChild>
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;