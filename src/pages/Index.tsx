
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LogIn, Zap, Smartphone, Settings, Database } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Build with the{' '}
              <span className="text-[#FF3D4D]">YouVersion Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access the world's most popular Bible platform through our developer APIs. 
              Integrate Bible content, verses, and reading plans into your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/get-started">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">YouVersion Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate YouVersion functionality into your applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-xl">Bible Reader SDK</CardTitle>
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
              <CardHeader>
                <LogIn className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-xl">Sign in with YouVersion</CardTitle>
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
              <CardHeader>
                <Zap className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-xl">Fast Track Bible Licensing</CardTitle>
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
              <CardHeader>
                <Smartphone className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-xl">Multi-Platform</CardTitle>
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
              <CardHeader>
                <Settings className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-xl">Developer Dashboard</CardTitle>
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

            <Card>
              <CardHeader>
                <Database className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-xl">Bible Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  Access hundreds of Bible versions
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Browse and search through our extensive directory of Bible versions in hundreds of languages for your users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-[#FF3D4D] rounded-2xl p-8 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers already using YouVersion Platform APIs.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/get-started">Get Your API Key</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
