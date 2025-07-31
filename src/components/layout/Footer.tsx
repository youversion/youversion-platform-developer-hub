import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      {/* Notification Bar */}
      <div className="bg-amber-50 border-b border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Footer is a placeholder and not final
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* YouVersion Developers */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">YouVersion Developers</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Build applications and integrate with the world's most popular Bible platform.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-medium mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/bible-directory" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bible Directory
                </Link>
              </li>
              <li>
                <Link to="/platform" className="text-muted-foreground hover:text-foreground transition-colors">
                  Platform Dashboard
                </Link>
              </li>
              <li>
                <Link to="/platform/apps" className="text-muted-foreground hover:text-foreground transition-colors">
                  App Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/docs/quick-start" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/docs/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                  Examples
                </Link>
               </li>
               <li>
                 <Link to="/style-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                   Dev Portal Styles
                 </Link>
               </li>
             </ul>
           </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
               <li>
                 <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                   Terms of Service
                 </a>
               </li>
             </ul>
           </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 YouVersion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;