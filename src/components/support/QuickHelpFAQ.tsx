import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb } from 'lucide-react';
import { ISSUE_CATEGORIES, IssueCategoryKey } from '@/data/supportCategories';

interface QuickHelpFAQProps {
  selectedCategory: IssueCategoryKey;
}

export const QuickHelpFAQ: React.FC<QuickHelpFAQProps> = ({ selectedCategory }) => {
  const category = ISSUE_CATEGORIES[selectedCategory];
  
  if (!category?.faqs.length) return null;

  return (
    <Card className="border-accent bg-accent/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Lightbulb className="h-4 w-4 text-accent-foreground" />
          Quick Help
        </CardTitle>
        <CardDescription className="text-xs">
          Check if these answers help before submitting a ticket
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible>
          {category.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-accent/30">
              <AccordionTrigger className="text-xs text-foreground">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};