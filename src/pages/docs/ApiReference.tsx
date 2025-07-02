import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Book, Search, Database } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import CodeBlock from '@/components/ui/code-block';

const ApiReference = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">API Reference</h1>
                <p className="text-xl text-muted-foreground">
                  Complete reference for all YouVersion Platform API endpoints
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-youversion-600" />
                    Verses Endpoint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">GET</Badge>
                    <p className="font-mono text-sm">/v1/verses/{"{reference}"}</p>
                    <p className="text-sm text-muted-foreground">Get a specific Bible verse by reference</p>
                  </div>
                  <CodeBlock language="json">
{`{
  "reference": "John 3:16",
  "text": "For God so loved the world...",
  "version": "NIV",
  "book": "John",
  "chapter": 3,
  "verse": 16
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-youversion-600" />
                    Bibles Endpoint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">GET</Badge>
                    <p className="font-mono text-sm">/v1/bibles</p>
                    <p className="text-sm text-muted-foreground">List all available Bible translations</p>
                  </div>
                  <CodeBlock language="json">
{`{
  "bibles": [
    {
      "id": "niv",
      "name": "New International Version",
      "language": "English"
    },
    {
      "id": "esv",
      "name": "English Standard Version", 
      "language": "English"
    }
  ]
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-youversion-600" />
                    Search Endpoint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">GET</Badge>
                    <p className="font-mono text-sm">/v1/search?q={"{query}"}</p>
                    <p className="text-sm text-muted-foreground">Search Bible content by keyword</p>
                  </div>
                  <CodeBlock language="json">
{`{
  "query": "love",
  "results": [
    {
      "reference": "1 John 4:8",
      "text": "God is love",
      "relevance": 0.95
    }
  ]
}`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ApiReference;