
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Mail, FileText, Users } from 'lucide-react';
import SupportTicketForm from '@/components/SupportTicketForm';

const Support = () => {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support</h1>
          <p className="text-xl text-muted-foreground">
            Get help with the YouVersion Platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow hidden">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>
                Get instant help from the YouVersion support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>
                Send us a detailed message about your issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupportTicketForm>
                <Button variant="stroked" className="w-full">
                  Send Email
                </Button>
              </SupportTicketForm>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Browse our comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="stroked" className="w-full" asChild>
                <a href="https://developers.youversion.com">View Docs</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow hidden">
            <CardHeader>
              <Users className="h-8 w-8 text-[#FF3D4D] mb-2" />
              <CardTitle>Community Forum</CardTitle>
              <CardDescription>
                Connect with other developers using the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="stroked" className="w-full">
                Join Forum
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I get started with the YouVersion Platform?</AccordionTrigger>
                <AccordionContent>
                  Sign up for a developer account and follow our quick start guide to get your APP Id and make your first request.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the rate limits?</AccordionTrigger>
                <AccordionContent>
                  Free accounts have a limit of 5,000 requests per day. Paid plans offer higher limits and priority support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I use the YouVersion Platform commercially?</AccordionTrigger>
                <AccordionContent>
                  No, commercial availability will come later as the YouVersion Platform matures.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
