
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Download, ExternalLink } from 'lucide-react';

const Examples = () => {
  const examples = [
    {
      title: "Daily Verse Widget",
      description: "Display a random verse of the day in your application",
      language: "JavaScript",
      difficulty: "Beginner",
      code: `// Fetch verse of the day
const response = await fetch('/api/v1/verse-of-day', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const verse = await response.json();

// Display the verse
document.getElementById('verse').innerHTML = 
  \`<blockquote>\${verse.text}</blockquote>
   <cite>\${verse.reference}</cite>\`;`
    },
    {
      title: "Bible Search Component",
      description: "Search through Bible verses with real-time results",
      language: "React",
      difficulty: "Intermediate",
      code: `import { useState, useEffect } from 'react';

function BibleSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      searchVerses(query);
    }
  }, [query]);

  const searchVerses = async (searchTerm) => {
    const response = await fetch(
      \`/api/v1/search?q=\${searchTerm}\`,
      { headers: { 'Authorization': 'Bearer YOUR_API_KEY' } }
    );
    const data = await response.json();
    setResults(data.verses);
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search verses..."
      />
      {results.map(verse => (
        <div key={verse.id}>
          <p>{verse.text}</p>
          <cite>{verse.reference}</cite>
        </div>
      ))}
    </div>
  );
}`
    },
    {
      title: "Reading Plan Progress",
      description: "Track user progress through Bible reading plans",
      language: "Python",
      difficulty: "Advanced",
      code: `import requests
from datetime import datetime, timedelta

class ReadingPlanTracker:
    def __init__(self, api_key, plan_id):
        self.api_key = api_key
        self.plan_id = plan_id
        self.base_url = "https://api.youversion.com/v1"
        
    def get_today_reading(self, user_id):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        response = requests.get(
            f"{self.base_url}/plans/{self.plan_id}/today",
            headers=headers,
            params={"user_id": user_id}
        )
        return response.json()
    
    def mark_complete(self, user_id, reading_id):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        data = {
            "user_id": user_id,
            "reading_id": reading_id,
            "completed_at": datetime.now().isoformat()
        }
        response = requests.post(
            f"{self.base_url}/progress",
            headers=headers,
            json=data
        )
        return response.json()`
    }
  ];

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Code Examples</h1>
          <p className="text-xl text-muted-foreground">
            Ready-to-use code snippets to jumpstart your integration
          </p>
        </div>

        <div className="space-y-8">
          {examples.map((example, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-[#FF3D4D]" />
                      {example.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {example.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{example.language}</Badge>
                    <Badge 
                      variant={example.difficulty === 'Beginner' ? 'default' : 
                              example.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                    >
                      {example.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SDK Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Official SDKs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['JavaScript', 'Python', 'PHP', 'Ruby'].map((lang) => (
              <Card key={lang} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{lang}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Install SDK
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
