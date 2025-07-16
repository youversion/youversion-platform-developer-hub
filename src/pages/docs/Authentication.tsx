import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Key, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import Footer from '@/components/layout/Footer';
import CodeBlock from '@/components/ui/code-block';

const Authentication = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <DocsSidebar />
        <div className="flex-1 canvas-primary flex flex-col">
          <div className="flex-1">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Authentication</h1>
                <p className="text-xl text-muted-foreground">
                  Learn how to authenticate your requests to the YouVersion Platform API
                </p>
              </div>

              {/* Warning notification */}
              <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  Information may be incorrect
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-youversion-600" />
                    API Key Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>All API requests require authentication using your API key in the Authorization header.</p>
                  <CodeBlock language="bash">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
https://api-dev.youversion.com/v1/bibles/206/books/jhn/chapters/3/verses/16`}
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-youversion-600" />
                    Getting Your API Key
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Sign up for a YouVersion Platform account</li>
                    <li>Create a new application in the developer dashboard</li>
                    <li>Copy your API key from the application settings</li>
                    <li>Keep your API key secure and never expose it publicly</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-youversion-600" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Store API keys as environment variables</li>
                    <li>Use different keys for development and production</li>
                    <li>Rotate keys regularly for security</li>
                    <li>Monitor usage in the developer dashboard</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Authentication;
