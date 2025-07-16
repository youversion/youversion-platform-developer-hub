import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Filter, Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import CodeBlock from '@/components/ui/code-block';

const SearchDocs = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Search API</h1>
                <p className="text-xl text-muted-foreground">
                  Search Bible content with powerful filtering and ranking
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800 mb-8">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm text-amber-800 dark:text-amber-200">Placeholder page only - not real data or usage instructions</span>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-youversion-600" />
                    Basic Search
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
https://api.youversion.com/v1/search?q=love`}
                  </CodeBlock>
                  <CodeBlock language="json">
{`{
  "query": "love",
  "total_results": 686,
  "results": [
    {
      "reference": "1 John 4:8",
      "text": "Whoever does not love does not know God, because God is love.",
      "version": "NIV",
      "relevance_score": 0.95,
      "book": "1 John",
      "chapter": 4,
      "verse": 8
    }
  ]
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-youversion-600" />
                    Advanced Filtering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
https://api.youversion.com/v1/search?q=love&book=john&version=niv&limit=10`}
                  </CodeBlock>
                  <p>Available filters:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>book</strong> - Filter by book name</li>
                    <li><strong>version</strong> - Specific Bible translation</li>
                    <li><strong>testament</strong> - old or new testament</li>
                    <li><strong>limit</strong> - Number of results (max 100)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-youversion-600" />
                    Relevance Scoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Search results include relevance scores (0.0 to 1.0):</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>1.0</strong> - Exact match</li>
                    <li><strong>0.8-0.9</strong> - Very relevant</li>
                    <li><strong>0.6-0.7</strong> - Moderately relevant</li>
                    <li><strong>0.3-0.5</strong> - Somewhat relevant</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Results are automatically sorted by relevance score.
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

export default SearchDocs;
