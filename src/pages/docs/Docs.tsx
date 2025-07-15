import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KeyRound, Zap, Shield, UserRound, CodeXml } from 'lucide-react';
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
                      <KeyRound className="h-5 w-5 text-[#FF3D4D]" />
                      Get an App Key
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      To use the YouVersion Platform API, you need to register your app and obtain an <code>X-App-Id</code> (app key).<br />
                      Visit <a href="/get-started" rel="noopener noreferrer" className="text-blue-600 underline">Create an App ID</a> to create an account and register your application.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-[#FF3D4D]" />
                      Your First Request
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>Get up and running with the YouVersion Platform API in minutes.</p>
                    <CodeBlock language="bash">
                    {`curl -H "X-App-Id: YOUR_APP_ID" https://api-dev.youversion.com/v1/bibles/206/books/jhn/chapters/3/verses/16`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CodeXml className="h-5 w-5 text-[#FF3D4D]" />
                      Jump into the SDKs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Build faster with our official SDKs for <strong>Swift</strong>, <strong>React</strong>, and <strong>JavaScript</strong>.
                      Find installation instructions and usage examples in our <a href="/docs/sdks" className="text-blue-600 underline">SDK documentation</a>.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-[#FF3D4D]" />
                      <a href="#authorization" className="hover:underline">Authorization</a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>All API requests require your app key in the <code>X-App-Id</code> header.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserRound className="h-5 w-5 text-[#FF3D4D]" />
                      <a href="#authentication" className="hover:underline">Authentication</a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Requests for user's information require sign in with YouVersion.</p>
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