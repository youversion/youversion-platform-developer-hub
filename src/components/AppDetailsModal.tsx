
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

interface App {
  name: string;
  apiKey: string;
  status: string;
  requests: string;
  created: string;
}

interface AppDetailsModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApp: App) => void;
}

interface FormData {
  name: string;
  status: string;
}

const AppDetailsModal = ({ app, isOpen, onClose, onSave }: AppDetailsModalProps) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();

  React.useEffect(() => {
    if (app) {
      setValue('name', app.name);
      setValue('status', app.status);
    }
  }, [app, setValue]);

  const onSubmit = (data: FormData) => {
    if (app) {
      const updatedApp = {
        ...app,
        name: data.name,
        status: data.status,
      };
      onSave(updatedApp);
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Application Details</DialogTitle>
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
            <Label htmlFor="status">Status</Label>
            <Select value={watch('status')} onValueChange={(value) => setValue('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={app.apiKey}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="created">Created Date</Label>
            <Input
              id="created"
              value={app.created}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requests">Requests Today</Label>
            <Input
              id="requests"
              value={`${app.requests} requests`}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailsModal;
