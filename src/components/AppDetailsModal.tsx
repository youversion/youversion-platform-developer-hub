import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Copy } from 'lucide-react';
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

interface AppDetailsModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApp: App) => void;
  isNewApp?: boolean;
}

interface FormData {
  name: string;
  description: string;
  website: string;
  appleAppStore: string;
  googlePlayStore: string;
  commercialStatus: string;
}

const AppDetailsModal = ({ app, isOpen, onClose, onSave, isNewApp = false }: AppDetailsModalProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      website: '',
      appleAppStore: '',
      googlePlayStore: '',
      commercialStatus: 'Non-Commercial'
    }
  });

  React.useEffect(() => {
    if (app) {
      setValue('name', app.name);
      setValue('description', app.description);
      setValue('website', app.website);
      setValue('appleAppStore', app.appleAppStore);
      setValue('googlePlayStore', app.googlePlayStore);
      setValue('commercialStatus', app.commercialStatus || 'Non-Commercial');
    }
  }, [app, setValue]);

  const handleCommercialStatusChange = (value: string) => {
    if (value === 'Commercial') {
      toast({
        title: "Commercial Apps Not Accepted",
        description: "YouVersion Platform isn't accepting apps for Commercial approval at this time.",
        variant: "destructive",
      });
      return;
    }
    setValue('commercialStatus', value);
  };

  const onSubmit = (data: FormData) => {
    if (app && data.name.trim()) {
      const updatedApp = {
        ...app,
        name: data.name,
        description: data.description,
        website: data.website,
        appleAppStore: data.appleAppStore,
        googlePlayStore: data.googlePlayStore,
        commercialStatus: data.commercialStatus,
        updated: new Date().toISOString().split('T')[0],
      };
      onSave(updatedApp);
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const copyApiKey = async () => {
    if (app?.apiKey) {
      try {
        await navigator.clipboard.writeText(app.apiKey);
        toast({
          title: "App Key Copied",
          description: "The app key has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Failed to copy app key to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  // Mock audit log data - sorted newest to oldest
  const auditLog = [
    {
      id: 5,
      action: 'Status Changed',
      timestamp: app?.updated || '2024-06-28',
      details: 'Application status updated to Active'
    },
    {
      id: 4,
      action: 'Store URLs Added',
      timestamp: '2024-04-15',
      details: 'Apple App Store and Google Play Store URLs added'
    },
    {
      id: 3,
      action: 'Description Updated',
      timestamp: '2024-03-10',
      details: 'Application description modified'
    },
    {
      id: 2,
      action: 'App Key Generated',
      timestamp: app?.created || '2024-01-15',
      details: 'Unique app key assigned'
    },
    {
      id: 1,
      action: 'Application Created',
      timestamp: app?.created || '2024-01-15',
      details: 'Initial application setup'
    }
  ];

  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNewApp ? 'Create New Application' : 'Edit Application Details'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Application Name</Label>
                <Input
                  id="name"
                  {...register('name', { required: true })}
                  placeholder="Enter application name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercialStatus">Commercial App Status</Label>
                <Select value={watch('commercialStatus')} onValueChange={handleCommercialStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select commercial status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Non-Commercial">Non-Commercial</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter application description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  {...register('website')}
                  placeholder="https://yourwebsite.com"
                  type="url"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appleAppStore">Apple App Store URL</Label>
                  <Input
                    id="appleAppStore"
                    {...register('appleAppStore')}
                    placeholder="https://apps.apple.com/app/..."
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googlePlayStore">Google Play Store URL</Label>
                  <Input
                    id="googlePlayStore"
                    {...register('googlePlayStore')}
                    placeholder="https://play.google.com/store/apps/details?id=..."
                    type="url"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">App Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="apiKey"
                    value={app.apiKey}
                    readOnly
                    className="bg-muted font-mono text-sm"
                  />
                  <Button type="button" size="sm" variant="stroked" onClick={copyApiKey}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isNewApp && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Created Date</Label>
                    <div className="text-sm text-muted-foreground">
                      {app.created}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Updated Date</Label>
                    <div className="text-sm text-muted-foreground">
                      {app.updated}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Requests</Label>
                    <div className="text-sm text-muted-foreground">
                      {app.requests} requests
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="stroked" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isNewApp ? 'Create Application' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>

          {/* Right column - Audit Log */}
          {!isNewApp && (
            <div className="lg:col-span-1 border-l pl-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Audit Log</Label>
                  <p className="text-sm text-muted-foreground">Recent activity for this application</p>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {auditLog.map((entry) => (
                    <div key={entry.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900">{entry.action}</h4>
                        <time className="text-xs text-gray-500">{entry.timestamp}</time>
                      </div>
                      <p className="text-xs text-gray-600">{entry.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailsModal;
