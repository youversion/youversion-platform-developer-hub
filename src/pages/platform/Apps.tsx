
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Smartphone, Key, Activity, CheckCircle, XCircle } from 'lucide-react';
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
}

const Apps = () => {
  const { toast } = useToast();
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apps, setApps] = useState<App[]>([
    {
      name: "My Bible App",
      apiKey: "bv_live_abc123...",
      status: "Active",
      requests: "1,247",
      created: "2024-01-15",
      updated: "2024-06-28",
      approved: true
    },
    {
      name: "Daily Devotions",
      apiKey: "bv_live_def456...",
      status: "Active", 
      requests: "543",
      created: "2024-02-20",
      updated: "2024-06-25",
      approved: true
    },
    {
      name: "Study Notes App",
      apiKey: "bv_test_ghi789...",
      status: "Development",
      requests: "89",
      created: "2024-03-10",
      updated: "2024-06-30",
      approved: false
    }
  ]);

  const handleViewDetails = (app: App) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleSaveApp = (updatedApp: App) => {
    setApps(prevApps => 
      prevApps.map(app => 
        app.apiKey === updatedApp.apiKey ? updatedApp : app
      )
    );
    toast({
      title: "Application Updated",
      description: "The application details have been saved successfully.",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
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
                  <div className="flex items-center gap-2">
                    <Badge variant={app.approved ? 'default' : 'secondary'}>
                      {app.approved ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Approved
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 h-3 w-3" />
                          Pending
                        </>
                      )}
                    </Badge>
                    <Badge variant={app.status === 'Active' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono">{app.apiKey}</span>
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
                  <Button size="sm" variant="stroked">Settings</Button>
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
      />
    </div>
  );
};

export default Apps;
