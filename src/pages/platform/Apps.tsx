import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Smartphone, Key, Activity } from 'lucide-react';
import AppDetailsModal from '@/components/AppDetailsModal';
import { useToast } from '@/hooks/use-toast';

interface App {
  name: string;
  apiKey: string;
  status: string;
  requests: string;
  created: string;
  updated: string;
  approved: boolean;
  commercialStatus: string;
}

const Apps = () => {
  const { toast } = useToast();
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewApp, setIsNewApp] = useState(false);
  const [apps, setApps] = useState<App[]>([
    {
      name: "My Bible App",
      apiKey: "a39576d5-53b7-446e-b9d0-55ac97384bfe",
      status: "Active",
      requests: "1,247",
      created: "2024-01-15",
      updated: "2024-06-28",
      approved: true,
      commercialStatus: "Non-Commercial"
    },
    {
      name: "Daily Devotions",
      apiKey: "b48687e6-64c8-557f-c0e1-66bd08495cgf",
      status: "Active", 
      requests: "543",
      created: "2024-02-20",
      updated: "2024-06-25",
      approved: true,
      commercialStatus: "Non-Commercial"
    },
    {
      name: "Study Notes App",
      apiKey: "c59798f7-75d9-668g-d1f2-77ce19506dhg",
      status: "Development",
      requests: "89",
      created: "2024-03-10",
      updated: "2024-06-30",
      approved: false,
      commercialStatus: "Commercial"
    }
  ]);

  const generateAppKey = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleViewDetails = (app: App) => {
    setSelectedApp(app);
    setIsNewApp(false);
    setIsModalOpen(true);
  };

  const handleNewApplication = () => {
    const newApp: App = {
      name: '',
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
        description: "The new application has been created successfully.",
      });
    } else {
      setApps(prevApps => 
        prevApps.map(app => 
          app.apiKey === updatedApp.apiKey ? updatedApp : app
        )
      );
      toast({
        title: "Application Updated",
        description: "The application details have been saved successfully.",
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Applications</h1>
            <p className="text-muted-foreground">
              Manage your registered applications and API keys
            </p>
          </div>
          <Button onClick={handleNewApplication}>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="space-y-6">
          {apps.map((app, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-[#FF3D4D]" />
                    <div>
                      <CardTitle>{app.name}</CardTitle>
                      <CardDescription>Created {app.created}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono break-all">{app.apiKey}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{app.requests} requests today</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="stroked" onClick={() => handleViewDetails(app)}>
                    View Details
                  </Button>
                  <Button size="sm" variant="stroked">Regenerate Key</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AppDetailsModal
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveApp}
        isNewApp={isNewApp}
      />
    </div>
  );
};

export default Apps;
