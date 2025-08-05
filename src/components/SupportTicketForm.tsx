import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Lightbulb,
  Clock
} from 'lucide-react';

const supportTicketSchema = z.object({
  category: z.string().min(1, 'Please select an issue category'),
  subcategory: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  email: z.string().email('Please enter a valid email address'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  appId: z.string().optional(),
  errorLogs: z.string().optional(),
  browserInfo: z.string().optional(),
});

type SupportTicketFormData = z.infer<typeof supportTicketSchema>;

interface SupportTicketFormProps {
  children: React.ReactNode;
}

const ISSUE_CATEGORIES = {
  'api-integration': {
    label: 'API Integration Issues',
    subcategories: ['Connection problems', 'Authentication errors', 'Response format issues', 'Endpoint not working'],
    faqs: [
      { q: 'How do I authenticate with the API?', a: 'Use your App ID in the X-APP-ID header for all requests.' },
      { q: 'Why am I getting a 401 error?', a: 'Check that your App ID is correct and included in the request headers.' }
    ]
  },
  'authentication': {
    label: 'Authentication Problems',
    subcategories: ['App ID issues', 'Invalid credentials', 'Permission errors'],
    faqs: [
      { q: 'Where do I find my App ID?', a: 'Your App ID is available in your platform dashboard after signing up.' },
      { q: 'My App ID isn\'t working', a: 'Ensure you\'re using the correct App ID and that your account is active.' }
    ]
  },
  'rate-limits': {
    label: 'Rate Limit Questions',
    subcategories: ['Exceeded limits', 'Upgrade requests', 'Limit clarification'],
    faqs: [
      { q: 'What are the rate limits?', a: 'Free accounts have 1,000 requests per day. Contact us for higher limits.' },
      { q: 'How can I increase my rate limit?', a: 'We offer paid plans with higher limits and priority support.' }
    ]
  },
  'documentation': {
    label: 'Documentation Feedback',
    subcategories: ['Missing information', 'Unclear instructions', 'Broken examples'],
    faqs: [
      { q: 'How do I report documentation issues?', a: 'Use this form to report any problems with our documentation.' }
    ]
  },
  'account': {
    label: 'Account Management',
    subcategories: ['Account settings', 'Billing questions', 'Profile updates'],
    faqs: [
      { q: 'How do I update my account information?', a: 'Visit your platform dashboard to update your account details.' }
    ]
  },
  'other': {
    label: 'Other Technical Issues',
    subcategories: ['Performance problems', 'Feature requests', 'General questions'],
    faqs: []
  }
};

const SupportTicketForm: React.FC<SupportTicketFormProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const { toast } = useToast();

  const form = useForm<SupportTicketFormData>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      category: '',
      subcategory: '',
      subject: '',
      description: '',
      email: '',
      priority: 'medium',
      appId: '',
      errorLogs: '',
      browserInfo: navigator.userAgent,
    },
  });

  const { watch } = form;
  const selectedCategory = watch('category');
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: SupportTicketFormData) => {
    try {
      // Generate a mock ticket number
      const ticketNum = `YVP-${Date.now().toString().slice(-6)}`;
      setTicketNumber(ticketNum);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Support ticket submitted",
        description: `Your ticket ${ticketNum} has been created successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit support ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(1);
    setIsSubmitted(false);
    setTicketNumber('');
    setIsOpen(false);
  };

  const renderSuccessScreen = () => (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold mb-2">Ticket Submitted Successfully!</h3>
      <p className="text-muted-foreground mb-4">
        Your support ticket <Badge variant="outline">{ticketNumber}</Badge> has been created.
      </p>
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Expected response time: 24-48 hours</span>
        </div>
      </div>
      <div className="space-y-3">
        <Button onClick={resetForm} className="w-full">
          Submit Another Ticket
        </Button>
        <Button variant="stroked" onClick={() => setIsOpen(false)} className="w-full">
          Return to Support
        </Button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What can we help you with?</h3>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an issue category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(ISSUE_CATEGORIES).map(([key, category]) => (
                          <SelectItem key={key} value={key}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedCategory && ISSUE_CATEGORIES[selectedCategory as keyof typeof ISSUE_CATEGORIES]?.subcategories.length > 0 && (
              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Issue</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specific issue (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ISSUE_CATEGORIES[selectedCategory as keyof typeof ISSUE_CATEGORIES].subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedCategory && ISSUE_CATEGORIES[selectedCategory as keyof typeof ISSUE_CATEGORIES]?.faqs.length > 0 && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Lightbulb className="h-4 w-4" />
                    Quick Help
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Check if these answers help before submitting a ticket
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Accordion type="single" collapsible>
                    {ISSUE_CATEGORIES[selectedCategory as keyof typeof ISSUE_CATEGORIES].faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="border-blue-200">
                        <AccordionTrigger className="text-xs">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-xs">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject *</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of your issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Tell us more details</h3>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your issue in detail. Include steps to reproduce, expected behavior, and actual behavior."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be as specific as possible. This helps us resolve your issue faster.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low - General question</SelectItem>
                      <SelectItem value="medium">Medium - Standard issue</SelectItem>
                      <SelectItem value="high">High - Blocking my work</SelectItem>
                      <SelectItem value="urgent">Urgent - Production down</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Technical Information</h3>
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
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll send updates about your ticket to this email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="bg-amber-50/50 border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
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

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? 'Ticket Submitted' : 'Submit Support Ticket'}
          </DialogTitle>
          {!isSubmitted && (
            <DialogDescription>
              Step {currentStep} of {totalSteps} - Help us understand your issue
            </DialogDescription>
          )}
        </DialogHeader>

        {isSubmitted ? (
          renderSuccessScreen()
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Progress value={progress} className="h-2" />
              </div>

              {renderStepContent()}

              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="stroked"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SupportTicketForm;