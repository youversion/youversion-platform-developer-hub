import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Globe, Shield, Download } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import CodeBlock from '@/components/ui/code-block';

const Bibles = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Bibles API</h1>
                <p className="text-xl text-muted-foreground">
                  Access information about available Bible translations and versions
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-youversion-600" />
                    List All Bibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -H "X-App-ID: YOUR_API_KEY" https://api-dev.youversion.com/v1/bibles`}
                  </CodeBlock>
                  <CodeBlock language="json">
{`{
  "bibles": [
    {
      "id": "niv",
      "name": "New International Version",
      "abbreviation": "NIV",
      "language": "English",
      "language_code": "en",
      "public_domain": false,
      "copyright": "Biblica, Inc."
    },
    {
      "id": "esv",
      "name": "English Standard Version",
      "abbreviation": "ESV", 
      "language": "English",
      "language_code": "en",
      "public_domain": false,
      "copyright": "Crossway"
    }
  ]
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-youversion-600" />
                    Filter by Language
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -H "X-App-ID: YOUR_API_KEY" https://api-dev.youversion.com/v1/bibles?language_ranges=spa`}
                  </CodeBlock>
                  <p className="text-sm text-muted-foreground">
                    Filter results by language to find translations in specific languages.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-youversion-600" />
                    Copyright Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Each Bible translation includes copyright information:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>public_domain</strong> - Whether the translation is in public domain</li>
                    <li><strong>copyright</strong> - Copyright holder information</li>
                    <li><strong>license_url</strong> - Link to full license terms</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Always check licensing requirements before using Bible content in your application.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Bibles;
