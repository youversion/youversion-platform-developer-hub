import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, AlignJustify, Book } from 'lucide-react';
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

              {/* Updated: List All Bibles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-youversion-600" />
                    List All Bibles
                  </CardTitle>
                  <CardDescription>
                    Get a collection of Bibles for all regions & variants of the English language.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Request URL</label>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                      <Badge variant="secondary">GET</Badge>
                      <code className="text-sm flex-1">https://api-dev.youversion.com/v1/bibles?language_ranges=en*</code>
                    </div>
                  </div>
                  <CodeBlock language="json">
{`{
  "bibles": [
    {
      "id": 12,
      "abbreviation": "ASV",
      "copyright": "",
      "language": {
        "iso_639_1": "en",
        "iso_639_3": "eng",
        "name": "English",
        "local_name": "English",
        "text_direction": "ltr"
      },
      "local_abbreviation": "ASV",
      "local_title": "American Standard Version",
      "info": "",
      "info_url": "",
      "title": "American Standard Version"
    },
    ...
  ]
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              {/* Updated: Get Bible Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-youversion-600" />
                    Get Bible Details
                  </CardTitle>
                  <CardDescription>
                    Get details for a specific Bible version.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Request URL</label>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                      <Badge variant="secondary">GET</Badge>
                      <code className="text-sm flex-1">https://api-dev.youversion.com/v1/bibles/206</code>
                    </div>
                  </div>
                  <CodeBlock language="json">
{`{
  "id": 206,
  "abbreviation": "engWEBUS",
  "copyright": "This Public Domain Bible text is courtesy of eBible.org.",
  "language": {
    "iso_639_1": "en",
    "iso_639_3": "eng",
    "name": "English",
    "local_name": "English",
    "text_direction": "ltr"
  },
  "local_abbreviation": "WEBUS",
  "local_title": "World English Bible, American English Edition, without Strong's Numbers",
  "info": "",
  "info_url": "",
  "title": "World English Bible, American English Edition, without Strong's Numbers"
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              {/* Updated: List Books in a Bible */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlignJustify className="h-5 w-5 text-youversion-600" />
                    List Books in a Bible
                  </CardTitle>
                  <CardDescription>
                    List books for a specific Bible version.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Request URL</label>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                      <Badge variant="secondary">GET</Badge>
                      <code className="text-sm flex-1">https://api-dev.youversion.com/v1/bibles/206/books</code>
                    </div>
                  </div>
                  <CodeBlock language="json">
{`{
  "data": [
    {
      "usfm": "GEN",
      "title": "Genesis",
      "abbreviation": "Gen",
      "canon": "ot"
    },
    {
      "usfm": "EXO",
      "title": "Exodus",
      "abbreviation": "Exo",
      "canon": "ot"
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

export default Bibles;
