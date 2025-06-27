
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Key, Code, Rocket } from 'lucide-react';

const GetStarted = () => {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get Started with YouVersion Platform</h1>
          <p className="text-xl text-muted-foreground">
            Follow these simple steps to integrate Bible content into your application
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FF3D4D] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Create Your Account
                  </CardTitle>
                  <CardDescription>Sign up and get your API credentials</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Create a free developer account to access the YouVersion Platform APIs. 
                You'll receive your API key and secret to authenticate your requests.
              </p>
              <Button asChild>
                <Link to="/login">Create Account <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FF3D4D] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Explore the Documentation
                  </CardTitle>
                  <CardDescription>Learn about our APIs and capabilities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Browse our comprehensive documentation to understand the available endpoints, 
                authentication methods, and response formats.
              </p>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">REST API</Badge>
                <Badge variant="secondary">GraphQL</Badge>
                <Badge variant="secondary">Webhooks</Badge>
              </div>
              <Button variant="outline" asChild>
                <Link to="/docs">View Documentation <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FF3D4D] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Start Building
                  </CardTitle>
                  <CardDescription>Use our examples and SDKs to get up and running quickly</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Check out our code examples and SDKs in multiple programming languages. 
                From simple verse lookups to complex reading plan integrations.
              </p>
              <div className="flex gap-2 mb-4">
                <Badge variant="outline">JavaScript</Badge>
                <Badge variant="outline">Python</Badge>
                <Badge variant="outline">PHP</Badge>
                <Badge variant="outline">Ruby</Badge>
              </div>
              <Button variant="outline" asChild>
                <Link to="/examples">View Examples <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Complete API documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="p-0">
                <Link to="/docs">Browse API Docs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bible Directory</CardTitle>
              <CardDescription>Explore available translations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="p-0">
                <Link to="/bible-directory">View Bibles</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription>Get help when you need it</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="p-0">
                <Link to="/support">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
