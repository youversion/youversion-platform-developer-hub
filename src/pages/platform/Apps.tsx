import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Image, Key, Activity, Globe, Apple, PlayCircle, Copy } from 'lucide-react';
import AppDetailsModal from '@/components/AppDetailsModal';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface App {
  id: string;
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
  callback_uri?: string;
}

const APPS_URL = 'https://admin-446696173378.us-central1.run.app/admin/apps/list';
const APP_KEYS_URL = 'https://admin-446696173378.us-central1.run.app/admin/apps_keys/list';
const ORG_ID = '3e3c2422-d01f-4d10-91a3-0e0a9bc600ef';

const Apps = () => {
  const { toast } = useToast();
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewApp, setIsNewApp] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creationDialog, setCreationDialog] = useState<{ open: boolean; message: string; appKey: string } | null>(null);

  // Pagination state
  const [pageIndex, setPageIndex] = useState<number>(0);       // Zero-based page number
  const [pageSize, setPageSize] = useState<number>(10);        // Items per page
  const [totalRecords, setTotalRecords] = useState<number>(0); // Total items on the server


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build paginated URL
          const offset = pageIndex * pageSize;
          const appsUrlWithParams = `${APPS_URL}?start=${offset}&length=${pageSize}`;
          const [appsRes, keysRes] = await Promise.all([
          fetch(appsUrlWithParams, {
            headers: {
              'Authorization': 'Basic ' + btoa('admin:findslife'),
              'Accept': 'application/json',
            },
          }),
          fetch(APP_KEYS_URL, {
            headers: {
              'Authorization': 'Basic ' + btoa('admin:findslife'),
              'Accept': 'application/json',
            },
          })
        ]);

        if (!appsRes.ok) throw new Error('Failed to fetch apps');
        if (!keysRes.ok) throw new Error('Failed to fetch app keys');

                        // Parse API JSON responses
        const rawApps = await appsRes.json();
        // Read total count for pagination
        setTotalRecords(rawApps.recordsTotal ?? rawApps.recordsFiltered ?? 0);
        console.debug('Raw Apps:', rawApps);
        const rawKeys = await keysRes.json();
        console.debug('Raw Keys:', rawKeys);

        // Normalize responses to arrays
        // Unwrap pagination wrapper if present

        // Normalize responses to arrays, unwrap possible paginated or named wrappers
        const appsJson: any = rawApps;
        const appsSource = Array.isArray(appsJson.data)
          ? appsJson.data
          : Array.isArray(appsJson.apps)
            ? appsJson.apps
            : appsJson;
        const appsArray: any[] = Array.isArray(appsSource) ? appsSource : [];
        const keysJson: any = rawKeys;
        const keysSource = Array.isArray(keysJson.data)
          ? keysJson.data
          : Array.isArray(keysJson.keys)
            ? keysJson.keys
            : keysJson;
        const keysArray: any[] = Array.isArray(keysSource) ? keysSource : [];

        // Build map app_id -> public_key
        const keyMap: Record<string, string> = {};
        for (const k of keysArray) {
          if (k.app_id && !keyMap[k.app_id]) {
            keyMap[k.app_id] = k.public_key;
          }
        }

        // Use all apps (remove organization filter for now)
        const filtered = appsArray;
        const mapped: App[] = filtered.map((app: any) => ({
          id: app.id,
          name: app.names?.en || 'Untitled',
          description: app.description || '',
          website: app.website_url || '',
          appleAppStore: app.apple_url || '',
          googlePlayStore: app.play_store_url || '',
          apiKey: keyMap[app.id] || '',
          status: app.status || '',
          requests: app.requests?.toLocaleString?.() || '0',
          created: app.created || '',
          updated: app.updated || '',
          approved: app.status === 'active',
          commercialStatus: (app.commercial || '').toLowerCase() === 'commercial' ? 'Commercial' : 'Non-Commercial',
          callback_uri: app.callback_uri || '',
        }));
        setApps(mapped);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageIndex, pageSize]);

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
        title: "App Id Copied",
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
      id: '',
      name: '',
      description: '',
      website: '',
      appleAppStore: '',
      googlePlayStore: '',
      apiKey: '',
      status: 'pending',
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

  const handleSaveApp = async (updatedApp: App) => {
    if (isNewApp) {
      // Call API to create app
      try {
        const response = await fetch('https://admin-446696173378.us-central1.run.app/admin/apps/create', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa('admin:findslife'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organization_id: ORG_ID,
            names: JSON.stringify({ en: updatedApp.name }),
            callback_uri: updatedApp.callback_uri?.trim() || "https://www.youversion.com/",
            bible_licenses: '[1]',
            description: updatedApp.description,
            website_url: updatedApp.website,
            apple_url: updatedApp.appleAppStore,
            play_store_url: updatedApp.googlePlayStore,
            commercial: updatedApp.commercialStatus.toLowerCase() === 'commercial' ? 'commercial' : 'non-commercial',
          }),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || 'Failed to create app');

        // Fetch public_key for the new default_key_id
        let publicKey = '';
        try {
          const keysRes = await fetch(APP_KEYS_URL, {
            headers: {
              'Authorization': 'Basic ' + btoa('admin:findslife'),
              'Accept': 'application/json',
            },
          });
          if (keysRes.ok) {
            const keysData = await keysRes.json();
            const match = keysData.find((k: any) => k.id === data.default_key_id);
            if (match) publicKey = match.public_key;
          }
        } catch {}

        setApps(prevApps => [
          ...prevApps,
          {
            ...updatedApp,
            id: data.app_id,
            apiKey: publicKey,
          },
        ]);
        setCreationDialog({ open: true, message: data.message, appKey: publicKey });
      } catch (err: any) {
        toast({
          title: 'Error',
          description: err.message || 'Failed to create application',
          variant: 'destructive',
        });
      }
    } else {
      setApps(prevApps => prevApps.map(app => app.apiKey === updatedApp.apiKey ? updatedApp : app));
      toast({
        title: 'Application Updated',
        description: 'The application details have been saved successfully.'
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
              Manage your applications and API keys
            </p>
          </div>
          <Button onClick={handleNewApplication}>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading applications...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
        <>
        <div className="grid gap-6 md:grid-cols-2">
          {apps.map((app, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-youversion-50 to-youversion-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-800 dark:text-white">
                    <Image className="h-6 w-6 text-youversion-600 dark:text-slate-500" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={app.commercialStatus === 'Commercial' ? 'default' : 'secondary'} className="text-xs font-medium px-2.5 py-1">
                      {app.commercialStatus}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{app.requests}</span>
                      <span className="text-muted-foreground">requests</span>
                    </div>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg mb-2 text-card-foreground group-hover:text-youversion-600 transition-colors">
                    {app.name}
                  </CardTitle>
                  {app.description && <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                      {app.description}
                    </CardDescription>}
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  {/* API Key Section */}
                  <div className="bg-muted/50 rounded-xl p-4 border dark:bg-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">App Id</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input value={app.apiKey} readOnly disabled className="bg-background font-mono text-xs flex-1 h-9" />
                      <Button size="sm" variant="stroked" onClick={() => copyApiKey(app.apiKey)} className="h-9 w-9 p-0 flex-shrink-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Links */}
                  {(app.website || app.appleAppStore || app.googlePlayStore) && <div className="flex flex-wrap gap-3 pt-2">
                      {app.website && <a href={app.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-foreground hover:underline transition-all font-medium">
                          <Globe className="h-3.5 w-3.5 text-youversion-600" />
                          <span>Website</span>
                        </a>}
                      {app.appleAppStore && <a href={app.appleAppStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-foreground hover:underline transition-all font-medium">
                          <Apple className="h-3.5 w-3.5 text-youversion-600" />
                          <span>App Store</span>
                        </a>}
                      {app.googlePlayStore && <a href={app.googlePlayStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-foreground hover:underline transition-all font-medium">
                          <PlayCircle className="h-3.5 w-3.5 text-youversion-600" />
                          <span>Play Store</span>
                        </a>}
                    </div>}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t">
                  <Button size="sm" variant="stroked" onClick={() => handleViewDetails(app)} className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm">
              Showing {pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, totalRecords)} of {totalRecords}
            </span>
            <div className="space-x-2">
              <Button
                size="sm"
                disabled={pageIndex === 0}
                onClick={() => setPageIndex((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                disabled={(pageIndex + 1) * pageSize >= totalRecords}
                onClick={() => setPageIndex((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
        )}
      </div>

      <AppDetailsModal app={selectedApp} isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveApp} isNewApp={isNewApp} />
      {creationDialog?.open && (
        <Dialog open={creationDialog.open} onOpenChange={() => setCreationDialog(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Application Created</DialogTitle>
              <DialogDescription>{creationDialog.message}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="font-semibold">Public Key:</span>
                <div className="flex items-center gap-2">
                  <Input
                    value={creationDialog.appKey}
                    readOnly
                    className="bg-muted font-mono text-xs"
                  />
                  <Button
                    size="sm"
                    variant="stroked"
                    onClick={() => copyApiKey(creationDialog.appKey)}
                    className="h-9 w-9 p-0 flex-shrink-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={() => setCreationDialog(null)} className="mt-2">Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Apps;
