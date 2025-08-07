import * as z from 'zod';

export const supportTicketSchema = z.object({
  category: z.string().min(1, 'Please select an issue category'),
  subcategory: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  email: z.string().email('Please enter a valid email address'),
  appId: z.string().optional(),
  errorLogs: z.string().optional(),
  browserInfo: z.string().optional(),
});

export type SupportTicketFormData = z.infer<typeof supportTicketSchema>;

export const defaultFormValues: SupportTicketFormData = {
  category: '',
  subcategory: '',
  subject: '',
  description: '',
  email: '',
  appId: '',
  errorLogs: '',
  browserInfo: navigator.userAgent,
};