import React, { useState, useEffect } from 'react';
import { getCurrentSiteUrl, getDevdocsUrl, getPlatformUrl } from '../../shared/config/urls';
import { getDevdocsNavItems, NavItem } from '../../shared/config/navigation';
import DevdocsSearchBar from './DevdocsSearchBar';

interface ZudokuNavigationProps {
  navItems?: NavItem[];
  isAuthenticated?: boolean;
}

export const ZudokuNavigation: React.FC<ZudokuNavigationProps> = ({
  navItems = [],
  isAuthenticated = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Determine if we're on devdocs site immediately to avoid flash
  const isOnDevdocsSite = (() => {
    // If we're in a browser environment, check immediately
    if (typeof window !== 'undefined') {
      const currentSiteUrl = getCurrentSiteUrl();
      const devdocsUrl = getDevdocsUrl();
      return currentSiteUrl === devdocsUrl;
    }
    // For SSR, assume we're on devdocs since this component is only used in devdocs
    return true;
  })();

  // Use shared navigation configuration with proper cross-site URLs
  const publicNavItems = getDevdocsNavItems();

  return (
    <nav className="flex items-center space-x-6">
      <div className="flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Platform link - only show when authenticated */}
            <a 
              href={`${getPlatformUrl()}/platform`}
              className="relative text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
              style={{ fontWeight: 500 }}
            >
              Platform
            </a>

          {/* Navigation Items */}
          {publicNavItems.map((item, index) => {
            const isActiveItem = isOnDevdocsSite && item.name === 'Dev Docs';
            
            if (item.external) {
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`relative text-sm font-medium transition-colors hover:text-foreground mr-4 ${
                    isActiveItem ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {item.name}
                  {isActiveItem && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>}
                </a>
              );
            }
            
            return (
              <a
                key={index}
                href={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-foreground mr-4 ${
                  isActiveItem ? 'text-foreground' : 'text-muted-foreground'
                }`}
                style={{ fontWeight: 500 }}
              >
                {item.name}
                {isActiveItem && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>}
              </a>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Bar */}
          <div className="hidden md:block">
            <DevdocsSearchBar />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden relative text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
            style={{ fontWeight: 500 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-t md:hidden">
          <div className="container py-3 space-y-2 px-4 sm:px-6 lg:px-8">
            <div className="mb-3">
              <DevdocsSearchBar />
            </div>
              <a 
                href={`${getPlatformUrl()}/platform`}
                className="block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
                style={{ fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </a>
            
            {publicNavItems.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.path}
                  className="block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
                  style={{ fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}; 