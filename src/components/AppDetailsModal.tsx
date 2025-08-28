import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { yvpFetch } from '@/lib/utils';

interface App {
  id?: string;
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
  callback_uri?: string;
  confirmNonCommercial: boolean;
  confirmNoPaywalls: boolean;
  confirmNoAdvertisements: boolean;
}

const AppDetailsModal = ({ app, isOpen, onClose, onSave, isNewApp = false }: AppDetailsModalProps) => {
  const { toast } = useToast();
  const { organization } = useAuth();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      website: '',
      appleAppStore: '',
      googlePlayStore: '',
      commercialStatus: 'Non-Commercial',
      callback_uri: '',
      confirmNonCommercial: false,
      confirmNoPaywalls: false,
      confirmNoAdvertisements: false,
    }
  });
  const [saving, setSaving] = React.useState(false);
  const [publicKey, setPublicKey] = React.useState<string>('');
  const [loadingPublicKey, setLoadingPublicKey] = React.useState(false);
  const [confirmNonCommercial, setConfirmNonCommercial] = React.useState(false);
  const [confirmNoPaywalls, setConfirmNoPaywalls] = React.useState(false);
  const [confirmNoAdvertisements, setConfirmNoAdvertisements] = React.useState(false);

  React.useEffect(() => {
    if (app) {
      setValue('name', app.name);
      setValue('description', app.description);
      setValue('website', app.website);
      setValue('appleAppStore', app.appleAppStore);
      setValue('googlePlayStore', app.googlePlayStore);
      setValue('commercialStatus', app.commercialStatus || 'Non-Commercial');
      setValue('callback_uri', app.callback_uri || '');
    }
  }, [app, setValue]);

  // Fetch public key for existing apps
  React.useEffect(() => {
    const fetchPublicKey = async () => {
      if (!app || !app.id || isNewApp || !organization?.id) {
        setPublicKey('');
        return;
      }

      setLoadingPublicKey(true);
      try {
        const response = await yvpFetch(`/admin/developers/${organization.id}/apps/${app.id}/keys`, { credentials: 'omit' });

        if (!response.ok) {
          throw new Error(`Failed to fetch app keys: ${response.status} ${response.statusText}`);
        }

        const keys = await response.json();
        // Show the first public_key as requested
        if (Array.isArray(keys) && keys.length > 0 && keys[0].public_key) {
          setPublicKey(keys[0].public_key);
        } else {
          setPublicKey('No public key found');
        }
      } catch (error) {
        console.error('Error fetching public key:', error);
        setPublicKey('Failed to load public key');
      } finally {
        setLoadingPublicKey(false);
      }
    };

    fetchPublicKey();
  }, [app, isNewApp, organization?.id]);

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

  const onSubmit = async (data: FormData) => {
    // Validate required checkboxes for new applications
    if (isNewApp && (!confirmNonCommercial || !confirmNoPaywalls || !confirmNoAdvertisements)) {
      toast({
        title: "Required Confirmations",
        description: "Please confirm all required statements about non-commercial use.",
        variant: "destructive",
      });
      return;
    }

    if (app && data.name.trim()) {
      const updatedApp = {
        ...app,
        name: data.name,
        description: data.description,
        website: data.website,
        appleAppStore: data.appleAppStore,
        googlePlayStore: data.googlePlayStore,
        commercialStatus: data.commercialStatus,
        callback_uri: data.callback_uri,
        updated: new Date().toISOString().split('T')[0],
        apiKey: isNewApp ? '' : app.apiKey,
      };
      setSaving(true);
      try {
        await onSave(updatedApp);
        onClose();
      } finally {
        setSaving(false);
      }
    }
  };

  const handleClose = () => {
    reset();
    setConfirmNonCommercial(false);
    setConfirmNoPaywalls(false);
    setConfirmNoAdvertisements(false);
    onClose();
  };

  const copyPublicKey = async () => {
    if (publicKey && publicKey !== 'No public key found' && publicKey !== 'Failed to load public key') {
      try {
        await navigator.clipboard.writeText(publicKey);
        toast({
          title: "Public Key Copied",
          description: "The public key has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Failed to copy public key to clipboard.",
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
      action: 'App Id Generated',
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
      <DialogContent className={`${isNewApp ? 'sm:max-w-[800px]' : 'sm:max-w-[1200px]'} max-h-[80vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{isNewApp ? 'Create New Application' : 'Edit Application Details'}</DialogTitle>
        </DialogHeader>
        
        <div className={`grid grid-cols-1 ${isNewApp ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-6`}>
          {/* Left column - Form */}
          <div className={`${isNewApp ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Application Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  {...register('name', { 
                    required: 'Application name is required',
                    minLength: {
                      value: 1,
                      message: 'Application name cannot be empty'
                    }
                  })}
                  placeholder="Enter application name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
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

              {isNewApp && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <Label className="text-base font-semibold">We confirm that our use of the licensed IP</Label>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confirmNonCommercial"
                      checked={confirmNonCommercial}
                      onCheckedChange={(checked) => setConfirmNonCommercial(checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="confirmNonCommercial" className="text-sm leading-relaxed cursor-pointer">
                      will be truly non-commercial per the definition provided and free of charge in all respects
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confirmNoPaywalls"
                      checked={confirmNoPaywalls}
                      onCheckedChange={(checked) => setConfirmNoPaywalls(checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="confirmNoPaywalls" className="text-sm leading-relaxed cursor-pointer">
                      will not offer any materials/access behind paywalls
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confirmNoAdvertisements"
                      checked={confirmNoAdvertisements}
                      onCheckedChange={(checked) => setConfirmNoAdvertisements(checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="confirmNoAdvertisements" className="text-sm leading-relaxed cursor-pointer">
                      will not run any advertisements, etc. as part of our platform/website/mobile application
                    </Label>
                  </div>
                </div>
              )}

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

              <div className="space-y-2">
                <Label htmlFor="callback_uri">Callback URI</Label>
                <Input
                  id="callback_uri"
                  {...register('callback_uri', {
                    validate: (value: string) => {
                      if (!value) return true;
                      try {
                        const url = new URL(value);
                        if (url.protocol === 'https:') return true;
                        if (url.protocol === 'youversionauth:') return true;
                        if (
                          url.protocol === 'http:' &&
                          (url.hostname === 'localhost' || url.hostname === '127.0.0.1')
                        )
                          return true;
                        return 'Callback URI must use https or youversionauth scheme, unless using localhost or 127.0.0.1';
                      } catch {
                        return 'Invalid URL';
                      }
                    },
                  })}
                  placeholder="https://yourapp.com/callback"
                  type="url"
                  className={errors.callback_uri ? 'border-red-500' : ''}
                />
                {errors.callback_uri && (
                  <p className="text-sm text-red-500">
                    {errors.callback_uri.message}
                  </p>
                )}
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

              {!isNewApp && (
                <div className="space-y-2">
                  <Label htmlFor="publicKey">App ID</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="publicKey"
                      value={loadingPublicKey ? 'Loading...' : publicKey}
                      readOnly
                      className="bg-muted font-mono text-sm"
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="stroked" 
                      onClick={copyPublicKey}
                      disabled={loadingPublicKey || !publicKey || publicKey === 'No public key found' || publicKey === 'Failed to load public key'}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

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
                <Button type="submit" disabled={saving}>
                  {saving ? (isNewApp ? 'Creating...' : 'Saving...') : (isNewApp ? 'Create Application' : 'Save Changes')}
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
                    <div key={entry.id} className="bg-muted rounded-lg p-3 border border-border">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-medium text-foreground">{entry.action}</h4>
                        <time className="text-xs text-muted-foreground">{entry.timestamp}</time>
                      </div>
                      <p className="text-xs text-muted-foreground">{entry.details}</p>
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
