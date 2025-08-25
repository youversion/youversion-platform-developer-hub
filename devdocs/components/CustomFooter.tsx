import React, { useState } from 'react';
import { getPlatformUrl, getDevdocsUrl, isDevelopmentMode } from '../../shared/config/urls';

const CustomFooter = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);
  return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* YouVersion Platform */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">YouVersion Platform</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Build applications and integrate with the world's most popular Bible platform.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-medium mb-3">Platform Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={getPlatformUrl()} className="text-muted-foreground hover:text-foreground transition-colors">
                  Platform Portal
                </a>
              </li>
              <li>
                <a href={getDevdocsUrl()} className="text-muted-foreground hover:text-foreground transition-colors">
                  Developer Documentation
                </a>
              </li>
              {/* Bible Directory link hidden */}
              <li className="hidden">
                <a href="/platform" className="text-muted-foreground hover:text-foreground transition-colors">
                  Platform Dashboard
                </a>
              </li>
              <li className="hidden">
                <a href="/platform/apps" className="text-muted-foreground hover:text-foreground transition-colors">
                  App Management
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`${getPlatformUrl()}/get-started`} className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href={`${getPlatformUrl()}/support`} className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
               <li>
                 <button
                   type="button"
                   onClick={() => setShowTosModal(true)}
                   className="text-muted-foreground hover:text-foreground transition-colors"
                 >
                   Terms of Service
                 </button>
               </li>
             </ul>
           </div>
        </div>

        {isDevelopmentMode() && (
          <>
            {/* Dev-only links */}
            <div className="mt-8">
              <h4 className="font-medium mb-3">Dev Stuff</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`${getPlatformUrl()}/docs/api`} className="text-muted-foreground hover:text-foreground transition-colors">
                    Hackthon API docs
                  </a>
                </li>
                <li>
                  <a href={`${getPlatformUrl()}/docs/examples`} className="text-muted-foreground hover:text-foreground transition-colors">
                    Examples (Hackathon)
                  </a>
                </li>
                <li>
                  <a href={`${getPlatformUrl()}/style-guide`} className="text-muted-foreground hover:text-foreground transition-colors">
                    Dev Portal Styles
                  </a>
                </li>
                <li>
                  <a href={`${getPlatformUrl()}/docs/quick-start`} className="text-muted-foreground hover:text-foreground transition-colors">
                    Old Quick Start
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Privacy Policy Modal */}
        {showPrivacyModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowPrivacyModal(false)}
          >
            <div
              className="bg-background border rounded-md shadow-lg w-[90vw] max-w-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2">Privacy Policy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Placeholder privacy policy content. This will be replaced with the final policy text.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm"
                  onClick={() => setShowPrivacyModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Terms of Service Modal */}
        {showTosModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowTosModal(false)}
          >
            <div
              className="bg-background border rounded-md shadow-lg w-[90vw] max-w-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2">Terms of Service</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Placeholder terms of service content. This will be replaced with the final terms.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm"
                  onClick={() => setShowTosModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 YouVersion. All rights reserved.
          </p>
        </div>
      </div>
  );
};

export default CustomFooter; 