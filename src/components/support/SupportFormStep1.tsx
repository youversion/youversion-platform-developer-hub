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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SupportTicketFormData } from '@/schemas/supportTicket';
import { ISSUE_CATEGORIES, IssueCategoryKey } from '@/data/supportCategories';
import { QuickHelpFAQ } from './QuickHelpFAQ';

interface SupportFormStep1Props {
  form: UseFormReturn<SupportTicketFormData>;
  selectedCategory: string;
}

export const SupportFormStep1: React.FC<SupportFormStep1Props> = ({
  form,
  selectedCategory,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Describe Your Issue</h3>
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

      {selectedCategory && ISSUE_CATEGORIES[selectedCategory as IssueCategoryKey]?.subcategories.length > 0 && (
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
                  {ISSUE_CATEGORIES[selectedCategory as IssueCategoryKey].subcategories.map((sub) => (
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

      {selectedCategory && <QuickHelpFAQ selectedCategory={selectedCategory as IssueCategoryKey} />}

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
    </div>
  );
};