
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Zap, Shield } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';

const Docs = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-secondary ml-64">
          <div className="container py-12">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
                <p className="text-xl text-muted-foreground">
                  Complete guide to integrating with the YouVersion Platform API
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-[#FF3D4D]" />
                        Quick Start
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>Get up and running with the YouVersion Platform API in minutes.</p>
                      <div className="bg-muted p-4 rounded-lg">
                        <code className="text-sm">
                          curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
                          https://api.youversion.com/v1/verses/john.3.16
                        </code>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-[#FF3D4D]" />
                        Authentication
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>All API requests require authentication using your API key in the Authorization header.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#FF3D4D]" />
                        Endpoints
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">GET</Badge>
                        <p className="font-mono text-sm">/v1/verses/{"{reference}"}</p>
                        <p className="text-sm text-muted-foreground">Get a specific Bible verse</p>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">GET</Badge>
                        <p className="font-mono text-sm">/v1/bibles</p>
                        <p className="text-sm text-muted-foreground">List available Bible translations</p>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">GET</Badge>
                        <p className="font-mono text-sm">/v1/plans</p>
                        <p className="text-sm text-muted-foreground">Get reading plans</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Reference</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Verses</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Bibles</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Reading Plans</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Search</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Rate Limits</a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SDKs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">JavaScript</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Python</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">PHP</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Ruby</a>
                      <a href="#" className="block text-sm hover:text-[#FF3D4D]">Swift</a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Docs;
