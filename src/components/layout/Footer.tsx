import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">YouVersion Platform</h3>
            <p className="text-sm text-muted-foreground">
              Build meaningful Bible experiences with our comprehensive API
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Documentation</h4>
            <div className="space-y-2 text-sm">
              <a href="/docs/quick-start" className="block text-muted-foreground hover:text-foreground transition-colors">
                Quick Start
              </a>
              <a href="/docs/api" className="block text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </a>
              <a href="/docs/authentication" className="block text-muted-foreground hover:text-foreground transition-colors">
                Authentication
              </a>
              <a href="/docs/examples" className="block text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Platform</h4>
            <div className="space-y-2 text-sm">
              <a href="/platform/apps" className="block text-muted-foreground hover:text-foreground transition-colors">
                My Apps
              </a>
              <a href="/platform/analytics" className="block text-muted-foreground hover:text-foreground transition-colors">
                Analytics
              </a>
              <a href="/platform/settings" className="block text-muted-foreground hover:text-foreground transition-colors">
                Settings
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="/support" className="block text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="/bible-directory" className="block text-muted-foreground hover:text-foreground transition-colors">
                Bible Directory
              </a>
              <a href="mailto:developers@youversion.com" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 YouVersion. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              API Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;