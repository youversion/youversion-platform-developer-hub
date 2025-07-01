
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

  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNewApp ? 'Create New Application' : 'Edit Application Details'}</DialogTitle>
        </DialogHeader>
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

          <div className="space-y-2">
            <Label htmlFor="commercialStatus">Commercial App Status</Label>
            <Select value={watch('commercialStatus')} onValueChange={(value) => setValue('commercialStatus', value)}>
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
            <>
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="space-y-2">
                <Label>Requests Today</Label>
                <div className="text-sm text-muted-foreground">
                  {app.requests} requests
                </div>
              </div>
            </>
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
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailsModal;
