import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Hash, Globe, Star } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import CodeBlock from '@/components/ui/code-block';

const Verses = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Verses API</h1>
                <p className="text-xl text-muted-foreground">
                  Retrieve Bible verses using flexible reference formats
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-youversion-600" />
                    Reference Formats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>The verses endpoint supports multiple reference formats:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><code>john.3.16</code> - Book, chapter, verse</li>
                    <li><code>john.3.16-18</code> - Verse range</li>
                    <li><code>john.3</code> - Entire chapter</li>
                    <li><code>1john.4.8</code> - Books with numbers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-youversion-600" />
                    Single Verse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -H "X-App-ID: YOUR_API_KEY" https://api-dev.youversion.com/v1/bibles/206/usfms/JHN.3.16`}
                  </CodeBlock>
                  <CodeBlock language="json">
{`{
  "reference": "John 3:16",
  "text": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  "version": "NIV",
  "book": "John",
  "chapter": 3,
  "verse": 16,
  "usfm": "43",
  "book_name": "John"
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-youversion-600" />
                    Verse Range
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -H "X-App-ID: YOUR_API_KEY" https://api-dev.youversion.com/v1/bibles/206/usfms/JHN.3.16-18`}
                  </CodeBlock>
                  <CodeBlock language="json">
{`{
  "reference": "John 3:16-18",
  "verses": [
    {
      "verse": 16,
      "text": "For God so loved the world..."
    },
    {
      "verse": 17,
      "text": "For God did not send his Son..."
    },
    {
      "verse": 18,
      "text": "Whoever believes in him..."
    }
  ],
  "version": "NIV"
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

export default Verses;
