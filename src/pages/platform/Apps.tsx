
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Key, Settings, Trash2, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Apps = () => {
  const [apps] = useState([
    {
      id: '1',
      name: 'Bible Study App',
      description: 'Mobile app for daily Bible reading and study',
      apiKey: 'yvp_1234567890abcdef',
      status: 'Active',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      requests: 15420
    },
    {
      id: '2',
      name: 'Church Website',
      description: 'Website integration for verse of the day',
      apiKey: 'yvp_abcdef1234567890',
      status: 'Active',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      requests: 8750
    },
    {
      id: '3',
      name: 'Devotional Bot',
      description: 'Discord bot for sharing daily verses',
      apiKey: 'yvp_567890abcdef1234',
      status: 'Inactive',
      created: '2024-01-01',
      lastUsed: '2024-01-15',
      requests: 2340
    }
  ]);

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Applications</h1>
            <p className="text-muted-foreground">
              Manage your registered applications and API keys
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="space-y-6">
          {apps.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {app.name}
                      <Badge variant={app.status === 'Active' ? 'default' : 'secondary'}>
                        {app.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {app.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Created:</span> {app.created}
                    </div>
                    <div>
                      <span className="font-medium">Last Used:</span> {app.lastUsed}
                    </div>
                    <div>
                      <span className="font-medium">Total Requests:</span> {app.requests.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium mb-2 block">API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="password" 
                        value={app.apiKey} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyApiKey(app.apiKey)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create New App Form */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Create New Application</CardTitle>
            <CardDescription>
              Register a new application to get API access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input id="appName" placeholder="My Bible App" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appType">Application Type</Label>
                  <select 
                    id="appType" 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="">Select type</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="server">Server Application</option>
                    <option value="bot">Bot/Integration</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Brief description of your application" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website URL (optional)</Label>
                <Input id="website" type="url" placeholder="https://example.com" />
              </div>
              
              <Button type="submit">
                Create Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apps;
