
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, BookOpen, Zap, Shield } from 'lucide-react';

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
            <h2 className="text-3xl font-bold mb-4">Why Choose YouVersion Platform?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by millions of users worldwide, our platform provides reliable access to Bible content and tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Code className="h-8 w-8 text-[#FF3D4D] mb-2" />
                <CardTitle>Developer Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Clean, well-documented APIs with comprehensive SDKs and code examples.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-[#FF3D4D] mb-2" />
                <CardTitle>Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access to hundreds of Bible translations, reading plans, and devotionals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-[#FF3D4D] mb-2" />
                <CardTitle>Fast & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Global CDN ensures fast response times with 99.9% uptime guarantee.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-[#FF3D4D] mb-2" />
                <CardTitle>Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Enterprise-grade security with OAuth 2.0 and comprehensive rate limiting.
                </CardDescription>
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
