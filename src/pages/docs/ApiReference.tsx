import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Book, Search, Database, ChevronDown, Play } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import Footer from '@/components/layout/Footer';
import CodeBlock from '@/components/ui/code-block';

const ApiReference = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('Get Verse');
  const [selectedReference, setSelectedReference] = useState('JHN.3.16');
  const [selectedVersion, setSelectedVersion] = useState('ESV');
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(true);

  const buildRequestUrl = () => {
    const baseUrl = 'https://api-dev.youversion.com/v1';
    if (selectedEndpoint === 'Get Verse') {
      return `${baseUrl}/verses/${selectedReference}?version=${selectedVersion}`;
    }
    return `${baseUrl}/verses/${selectedReference}?version=${selectedVersion}`;
  };

  const handleTryItOut = async () => {
    const url = buildRequestUrl();
    console.log('Making request to:', url);
    // In a real implementation, you would make the actual API call here
  };

  const getCodeExample = (language: string) => {
    const url = buildRequestUrl();
    
    switch (language) {
      case 'javascript':
        return `const response = await fetch('${url}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Accept': 'application/json'
  }
});

const data = await response.json();
console.log(data);`;

      case 'python':
        return `import requests

url = '${url}'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Accept': 'application/json'
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`;

      case 'swift':
        return `import Foundation

class YouVersionAPI {
    private let apiKey = "YOUR_API_KEY"
    private let baseURL = "https://api-dev.youversion.com/v1"

    func getVerses() async {
        guard let url = URL(string: "${url}") else { return }

        var request = URLRequest(url: url)
        request.setValue("\\(apiKey)", forHTTPHeaderField: "X-App-ID")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        do {
            let (data, _) = try await URLSession.shared.data(for: request)
            let json = try JSONSerialization.jsonObject(with: data)
            print(json)
        } catch {
            print("Error: \\(error)")
        }
    }
}`;

      case 'curl':
        return `curl -X GET '${url}' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Accept: application/json'`;

      default:
        return '';
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <DocsSidebar />
        <div className="flex-1 canvas-primary flex flex-col">
          <div className="flex-1">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">API Reference</h1>
                <p className="text-xl text-muted-foreground">
                  Complete reference for all YouVersion Platform API endpoints
                </p>
              </div>

              {/* API Playground */}
              <Card>
                <CardHeader>
                  <CardTitle 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsPlaygroundOpen(!isPlaygroundOpen)}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${!isPlaygroundOpen ? '-rotate-90' : ''}`} />
                    API Playground
                  </CardTitle>
                </CardHeader>
                {isPlaygroundOpen && (
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Endpoint</label>
                        <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Get Verse">Get Verse</SelectItem>
                            <SelectItem value="Get Bibles">Get Bibles</SelectItem>
                            <SelectItem value="Search">Search</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Reference</label>
                        <Select value={selectedReference} onValueChange={setSelectedReference}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="JHN.3.16">JHN.3.16</SelectItem>
                            <SelectItem value="GEN.1.1">GEN.1.1</SelectItem>
                            <SelectItem value="PSA.23.1">PSA.23.1</SelectItem>
                            <SelectItem value="ROM.8.28">ROM.8.28</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Version</label>
                        <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ESV">ESV</SelectItem>
                            <SelectItem value="NIV">NIV</SelectItem>
                            <SelectItem value="NLT">NLT</SelectItem>
                            <SelectItem value="NASB">NASB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Request URL</label>
                      <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm flex-1">{buildRequestUrl()}</code>
                      </div>
                    </div>

                    <Button onClick={handleTryItOut} className="w-full" size="lg" variant="filled-secondary">
                      <Play className="h-4 w-4 mr-2" />
                      Try it out
                    </Button>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
                      <Tabs defaultValue="javascript" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                          <TabsTrigger value="python">Python</TabsTrigger>
                          <TabsTrigger value="swift">Swift</TabsTrigger>
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                        </TabsList>
                        <TabsContent value="javascript">
                          <CodeBlock language="javascript">
                            {getCodeExample('javascript')}
                          </CodeBlock>
                        </TabsContent>
                        <TabsContent value="python">
                          <CodeBlock language="python">
                            {getCodeExample('python')}
                          </CodeBlock>
                        </TabsContent>
                        <TabsContent value="swift">
                          <CodeBlock language="swift">
                            {getCodeExample('swift')}
                          </CodeBlock>
                        </TabsContent>
                        <TabsContent value="curl">
                          <CodeBlock language="bash">
                            {getCodeExample('curl')}
                          </CodeBlock>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CardContent>
                )}
              </Card>

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
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ApiReference;
