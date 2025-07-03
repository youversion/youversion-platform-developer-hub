import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Zap, Shield } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import CodeBlock from '@/components/ui/code-block';
const Docs = () => {
  return <SidebarProvider>
      <div className="flex w-full" style={{
      height: 'calc(100vh - 64px)'
    }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Quick Start Guide</h1>
                <p className="text-xl text-muted-foreground">
                  Get up and running with the YouVersion Platform API in minutes
                </p>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-[#FF3D4D]" />
                      Quick Start
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>Get up and running with the YouVersion Platform API in minutes.</p>
                    <CodeBlock language="bash">
                    {`curl -H "X-App-Key: YOUR_APP_KEY" https://api-dev.youversion.com/v1/bibles/206/usfms/JHN.3.16`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-[#FF3D4D]" />
                      Authorization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>All API requests require your app key in the `X-App-Key` header.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-[#FF3D4D]" />
                      Authentiation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Requests for user's information require sign in with YouVersion.</p>
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
                      <p className="font-mono text-sm">/v1/bibles/{"{version_id}"}/usfms/JHN.3.16</p>
                      <p className="text-sm text-muted-foreground">Get a specific Bible verse</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <p className="font-mono text-sm">/v1/bibles</p>
                      <p className="text-sm text-muted-foreground">List Bible versions available with your app key.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>;
};
export default Docs;
