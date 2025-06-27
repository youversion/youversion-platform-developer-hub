
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Code, Globe, Key } from 'lucide-react';

const Docs = () => {
  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to integrate with the YouVersion Platform
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Key className="mr-2 h-4 w-4" />
                  Authentication
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Bible API
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  Translations
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Code className="mr-2 h-4 w-4" />
                  SDKs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Authentication */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-[#FF3D4D]" />
                  <CardTitle>Authentication</CardTitle>
                </div>
                <CardDescription>
                  Secure your API requests with OAuth 2.0
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">API Key Authentication</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <code className="text-sm">
                        curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;https://api.youversion.com/v1/verses
                      </code>
                    </div>
                  </div>
                  <Badge variant="secondary">Required for all requests</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Bible API */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-[#FF3D4D]" />
                  <CardTitle>Bible API</CardTitle>
                </div>
                <CardDescription>
                  Access verses, chapters, and books from hundreds of Bible translations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Get Verse</h4>
                    <div className="bg-muted p-4 rounded-lg mb-2">
                      <code className="text-sm">
                        GET /v1/verses/john.3.16?version=NIV
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Retrieve a specific verse with optional version parameter
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Search Verses</h4>
                    <div className="bg-muted p-4 rounded-lg mb-2">
                      <code className="text-sm">
                        GET /v1/search?q=love&version=ESV&limit=10
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Search for verses containing specific terms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Format */}
            <Card>
              <CardHeader>
                <CardTitle>Response Format</CardTitle>
                <CardDescription>
                  All API responses follow a consistent JSON structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`{
  "data": {
    "id": "john.3.16",
    "reference": "John 3:16",
    "text": "For God so loved the world...",
    "version": {
      "id": "NIV",
      "name": "New International Version"
    }
  },
  "meta": {
    "version": "1.0",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
