import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SupportTicketFormData } from '@/schemas/supportTicket';
import { AlertTriangle, FileText } from 'lucide-react';

interface SupportFormStep2Props {
  form: UseFormReturn<SupportTicketFormData>;
}

export const SupportFormStep2: React.FC<SupportFormStep2Props> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Technical Details & Submit</h3>
        <p className="text-sm text-muted-foreground mb-6">
          This information helps us debug your issue faster (all optional)
        </p>
      </div>

      <FormField
        control={form.control}
        name="appId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>App ID</FormLabel>
            <FormControl>
              <Input placeholder="Your YouVersion Platform App ID" {...field} />
            </FormControl>
            <FormDescription>
              Your App ID helps us identify your account and usage patterns
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="errorLogs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Error Logs</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Paste any error messages, console logs, or API responses here"
                className="min-h-[100px] font-mono text-sm"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Browser Information</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Automatically detected: {navigator.userAgent.split(' ').slice(0, 3).join(' ')}...
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            Before you submit
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Check our documentation for common solutions</li>
            <li>• Verify your App ID and authentication</li>
            <li>• Include relevant error messages or logs</li>
            <li>• Expected response time: 24-48 hours</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};