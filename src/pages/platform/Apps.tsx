import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Image, Key, Activity, Globe, Apple, PlayCircle, Copy, Trash2 } from 'lucide-react';
import AppDetailsModal from '@/components/AppDetailsModal';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { yvpFetch } from '@/lib/utils';

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

const Apps = () => {
  const { toast } = useToast();
  const { organization } = useAuth();
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewApp, setIsNewApp] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creationDialog, setCreationDialog] = useState<{ open: boolean; message: string; appKey: string } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<App | null>(null);

  // Pagination state
  const [pageIndex, setPageIndex] = useState<number>(0);       // Zero-based page number
  const [pageSize, setPageSize] = useState<number>(10);        // Items per page
  const [totalRecords, setTotalRecords] = useState<number>(0); // Total items on the server

  const fetchData = useCallback(async () => {
    // Don't fetch if organization is not available yet
    if (!organization?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Fetch apps for the current organization
      const appsUrl = `/admin/organizations/${organization.id}/apps`;
      const keysUrl = `/admin/apps_keys/list`;
      
      console.log('Fetching apps for organization:', organization.id);
      
      const [appsRes, keysRes] = await Promise.all([
        yvpFetch(appsUrl),
        yvpFetch(keysUrl)
      ]);

      if (!appsRes.ok) {
        throw new Error(`Failed to fetch apps: ${appsRes.status} ${appsRes.statusText}`);
      }
      if (!keysRes.ok) {
        throw new Error(`Failed to fetch app keys: ${keysRes.status} ${keysRes.statusText}`);
      }

      const rawApps = await appsRes.json();
      const rawKeys = await keysRes.json();
      
      console.debug('Raw Apps:', rawApps);
      console.debug('Raw Keys:', rawKeys);

      // The org-specific API returns an array directly
      const appsArray: any[] = Array.isArray(rawApps) ? rawApps : [];
      
      // For pagination, we'll use client-side pagination for now
      setTotalRecords(appsArray.length);
      const startIndex = pageIndex * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedApps = appsArray.slice(startIndex, endIndex);

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
      
      const mapped: App[] = paginatedApps.map((app: any) => ({
        id: app.id,
        name: app.names?.en || 'Untitled',
        description: app.description || '',
        website: app.website_url || '',
        appleAppStore: app.apple_url || '',
        googlePlayStore: app.play_store_url || '',
        apiKey: keyMap[app.id] || '',
        status: app.status || '',
        requests: app.requests?.toLocaleString?.() || '0', // This endpoint might not have `requests`
        created: app.created || '', // This endpoint might not have `created`
        updated: app.updated || '', // This endpoint might not have `updated`
        approved: app.status === 'active',
        commercialStatus: (app.commercial || '').toLowerCase() === 'commercial' ? 'Commercial' : 'Non-Commercial',
        callback_uri: app.callback_uri || '',
      }));
      
      setApps(mapped);
    } catch (err: any) {
      console.error('Error fetching apps:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [organization?.id, pageIndex, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const copyPublicKey = async (publicKey: string) => {
    try {
      await navigator.clipboard.writeText(publicKey);
      toast({
        title: "Public Key Copied",
        description: "The public key has been copied to your clipboard."
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy public key to clipboard.",
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

  const handleDeleteClick = (app: App) => {
    setAppToDelete(app);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteApp = async () => {
    if (!appToDelete) return;

    try {
      const response = await yvpFetch('/admin/apps/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pk: appToDelete.id }),
      });

      if (!response.ok) {
        // Try to parse error message from response
        const errorData = await response.json().catch(() => ({ message: `Request failed with status ${response.status}` }));
        throw new Error(errorData.message || `Failed to delete application`);
      }

      toast({
        title: 'Application Deleted',
        description: `"${appToDelete.name}" has been deleted successfully.`,
      });

      // Refresh the list of apps
      await fetchData();

    } catch (err: any) {
      toast({
        title: 'Delete Failed',
        description: err.message || 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
        setAppToDelete(null);
        setIsDeleteDialogOpen(false);
    }
  };

  const handleSaveApp = async (updatedApp: App) => {
    if (isNewApp) {
      // Call API to create app
      try {
        if (!organization?.id) {
          throw new Error('No organization found');
        }

        const response = await yvpFetch('/admin/apps/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organization_id: organization.id,
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

        // Per user instruction, use default_key_id for the dialog
        const publicKey = data.default_key_id;

        // Also update the local state with the new app
        // We'll use the default_key_id as the apiKey for now, until the next full refresh
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
      setApps(prevApps => prevApps.map(app => app.id === updatedApp.id ? updatedApp : app));
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
          <Button onClick={handleNewApplication} disabled={!organization}>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>
        {!organization ? (
          <div className="text-center py-12 text-muted-foreground">Loading organization...</div>
        ) : loading ? (
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

              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4 flex-1">
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
                <div className="mt-6 pt-4 border-t flex items-center gap-3">
                  <Button size="sm" variant="stroked" onClick={() => handleViewDetails(app)} className="w-full">
                    View Details
                  </Button>
                  <Button size="sm" variant="stroked" onClick={() => handleDeleteClick(app)} className="w-full border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm">
              Showing {Math.min(pageIndex * pageSize + 1, totalRecords)}–{Math.min((pageIndex + 1) * pageSize, totalRecords)} of {totalRecords}
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
                disabled={(pageIndex + 1) * pageSize >= totalRecords || apps.length < pageSize}
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
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the application <span className="font-bold">"{appToDelete?.name}"</span> and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAppToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteApp} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                    onClick={() => copyPublicKey(creationDialog.appKey)}
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
