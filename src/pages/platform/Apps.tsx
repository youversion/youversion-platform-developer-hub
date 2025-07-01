import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Image, Key, Activity, Globe, Apple, PlayCircle, Copy } from 'lucide-react';
import AppDetailsModal from '@/components/AppDetailsModal';
import { useToast } from '@/hooks/use-toast';

interface App {
  name: string;
  description: string;
  website: string;
  appleAppStore: string;
  googlePlayStore: string;
  apiKey: string;
  status: string;
  requests: string;
  created: string;
  updated: string;
  approved: boolean;
  commercialStatus: string;
}

const Apps = () => {
  const {
    toast
  } = useToast();
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewApp, setIsNewApp] = useState(false);

  const [apps, setApps] = useState<App[]>([{
    name: "My Bible App",
    description: "A comprehensive Bible reading app with daily devotionals and study tools",
    website: "https://mybibleapp.com",
    appleAppStore: "https://apps.apple.com/app/my-bible-app/id123456789",
    googlePlayStore: "https://play.google.com/store/apps/details?id=com.mybibleapp",
    apiKey: "a39576d5-53b7-446e-b9d0-55ac97384bfe",
    status: "Active",
    requests: "1,247",
    created: "2024-01-15",
    updated: "2024-06-28",
    approved: true,
    commercialStatus: "Non-Commercial"
  }, {
    name: "Daily Devotions",
    description: "Start your day with inspiring devotions and Bible verses",
    website: "https://dailydevotions.org",
    appleAppStore: "",
    googlePlayStore: "https://play.google.com/store/apps/details?id=com.dailydevotions",
    apiKey: "b48687e6-64c8-557f-c0e1-66bd08495cgf",
    status: "Active",
    requests: "543",
    created: "2024-02-20",
    updated: "2024-06-25",
    approved: true,
    commercialStatus: "Non-Commercial"
  }, {
    name: "Study Notes App",
    description: "Take and organize your Bible study notes with powerful search features",
    website: "",
    appleAppStore: "",
    googlePlayStore: "",
    apiKey: "c59798f7-75d9-668g-d1f2-77ce19506dhg",
    status: "Development",
    requests: "89",
    created: "2024-03-10",
    updated: "2024-06-30",
    approved: false,
    commercialStatus: "Commercial"
  }]);
  const generateAppKey = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };
  const copyApiKey = async (apiKey: string) => {
    try {
      await navigator.clipboard.writeText(apiKey);
      toast({
        title: "App Key Copied",
        description: "The app key has been copied to your clipboard."
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy app key to clipboard.",
        variant: "destructive"
      });
    }
  };
  const handleViewDetails = (app: App) => {
    setSelectedApp(app);
    setIsNewApp(false);
    setIsModalOpen(true);
  };
  const handleNewApplication = () => {
    const newApp: App = {
      name: '',
      description: '',
      website: '',
      appleAppStore: '',
      googlePlayStore: '',
      apiKey: generateAppKey(),
      status: 'Development',
      requests: '0',
      created: new Date().toISOString().split('T')[0],
      updated: new Date().toISOString().split('T')[0],
      approved: false,
      commercialStatus: 'Non-Commercial'
    };
    setSelectedApp(newApp);
    setIsNewApp(true);
    setIsModalOpen(true);
  };
  const handleSaveApp = (updatedApp: App) => {
    if (isNewApp) {
      setApps(prevApps => [...prevApps, updatedApp]);
      toast({
        title: "Application Created",
        description: "The new application has been created successfully."
      });
    } else {
      setApps(prevApps => prevApps.map(app => app.apiKey === updatedApp.apiKey ? updatedApp : app));
      toast({
        title: "Application Updated",
        description: "The application details have been saved successfully."
      });
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
    setIsNewApp(false);
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Applications</h1>
            <p className="text-muted-foreground">
              Manage your applications and API keys
            </p>
          </div>
          <Button onClick={handleNewApplication}>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="space-y-6">
          {apps.map((app, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center">
                    <Image className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{app.name}</h3>
                      <Badge 
                        variant={app.commercialStatus === 'Commercial' ? 'default' : 'secondary'} 
                        className={app.commercialStatus === 'Commercial' 
                          ? "bg-neutral-700 text-white text-xs" 
                          : "bg-neutral-300 text-neutral-700 text-xs"
                        }
                      >
                        {app.commercialStatus}
                      </Badge>
                    </div>
                    {app.description && (
                      <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">{app.requests}</span>
                      <span className="text-muted-foreground">requests today</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">API Key</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={app.apiKey}
                      readOnly
                      disabled
                      className="bg-white font-mono text-sm flex-1 border-gray-200"
                    />
                    <Button size="sm" variant="stroked" onClick={() => copyApiKey(app.apiKey)} className="h-8 w-8 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {app.website && (
                    <a href={app.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  )}
                  {app.appleAppStore && (
                    <a href={app.appleAppStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      <Apple className="h-4 w-4" />
                      <span>App Store</span>
                    </a>
                  )}
                  {app.googlePlayStore && (
                    <a href={app.googlePlayStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      <PlayCircle className="h-4 w-4" />
                      <span>Play Store</span>
                    </a>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="stroked" onClick={() => handleViewDetails(app)} className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="stroked" className="flex-1">
                    Regenerate Key
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AppDetailsModal app={selectedApp} isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveApp} isNewApp={isNewApp} />
    </div>
  );
};

export default Apps;
