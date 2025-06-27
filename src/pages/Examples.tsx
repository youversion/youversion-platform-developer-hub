import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink } from 'lucide-react';

const Examples = () => {
  const examples = [
    {
      title: "Daily Verse Widget",
      description: "Display a verse of the day in your application",
      language: "JavaScript",
      difficulty: "Beginner",
    },
    {
      title: "Bible Reading Tracker",
      description: "Track reading progress through Bible plans",
      language: "React",
      difficulty: "Intermediate",
    },
    {
      title: "Verse Search Engine",
      description: "Search and filter Bible verses by keyword",
      language: "Python",
      difficulty: "Advanced",
    },
    {
      title: "Mobile Bible App",
      description: "Complete mobile application with offline reading",
      language: "Swift",
      difficulty: "Advanced",
    },
  ];

  return (
    <div className="container py-12 canvas-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Code Examples</h1>
          <p className="text-xl text-muted-foreground">
            Learn by example with these sample implementations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Code className="h-8 w-8 text-[#FF3D4D]" />
                  <div className="flex gap-2">
                    <Badge variant="secondary">{example.language}</Badge>
                    <Badge 
                      variant={example.difficulty === 'Beginner' ? 'default' : 
                              example.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                    >
                      {example.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm">
                    View Code
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Example?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our team can help create custom examples for your use case.
          </p>
          <Button>Request Custom Example</Button>
        </div>
      </div>
    </div>
  );
};

export default Examples;
