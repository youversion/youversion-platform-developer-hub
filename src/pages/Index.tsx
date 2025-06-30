import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LogIn, Zap, Smartphone, Settings, Database, Highlighter } from 'lucide-react';
const Index = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-white via-amber-500 to-pink-500">
        <div className="container">
          <div className="mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-black">
              Build with YouVersion
            </h1>
            <p className="text-xl mb-8 text-black">Integrate the Bible into your applications with our powerful SDKs and APIs.</p>
            <div className="flex flex-col gap-4 items-center">
              <Button size="xl" variant="filled-contrast" onClick={() => navigate('/get-started')} className="text-sm font-bold py-[30px] px-[40px]">
                Join the YouVersion Platform
              </Button>
              <Button size="xl" variant="stroked" onClick={() => navigate('/docs')} className="text-sm font-bold px-[40px] py-[30px]">
                View Documentation
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
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 text-black mb-4 mx-auto" />
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
                <Highlighter className="h-8 w-8 text-black mb-4 mx-auto" />
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
                <LogIn className="h-8 w-8 text-black mb-4 mx-auto" />
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
                <Zap className="h-8 w-8 text-black mb-4 mx-auto" />
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
                <Smartphone className="h-8 w-8 text-black mb-4 mx-auto" />
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
                <Settings className="h-8 w-8 text-black mb-4 mx-auto" />
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
          <div className="bg-[#FF3D4D] rounded-2xl p-8 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers already using YouVersion Platform APIs.
            </p>
            <Button size="lg" variant="filled-secondary" asChild>
              <Link to="/get-started">Get Your API Key</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;