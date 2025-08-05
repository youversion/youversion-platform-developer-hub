import React, { useState, useEffect } from 'react';
import { getPlatformUrl, getDevdocsUrl, getBiblesUrl, getCurrentSiteUrl } from '../../shared/config/urls';
import { NavItem, getDefaultNavItems } from '../../shared/config/navigation';
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
  const [isOnDevdocsSite, setIsOnDevdocsSite] = useState(false);

  // Check if we're on the devdocs site - only on client-side to avoid hydration issues
  useEffect(() => {
    const currentSiteUrl = getCurrentSiteUrl();
    const devdocsUrl = getDevdocsUrl();
    setIsOnDevdocsSite(currentSiteUrl === devdocsUrl);
  }, []);

  // Use shared navigation configuration but override paths for cross-site navigation
  const sharedNavItems = getDefaultNavItems();
  const publicNavItems = sharedNavItems.map(item => {
    if (item.name === 'Dev Docs') {
      // Link to devdocs site
      return {
        ...item,
        path: `${getDevdocsUrl()}/introduction`
      };
    }
    if (item.name === 'Bible Directory') {
      // Link to bibles site
      return {
        ...item,
        path: getBiblesUrl()
      };
    }
    // For other items, they should be internal links on the platform site
    return item;
  });

  // Create cross-site links for devdocs context
  const createLink = (item: NavItem) => {
    // When on devdocs site, all items except "Dev Docs" should link to platform site
    if (item.name === 'Dev Docs') {
      return item.path; // Internal devdocs link
    }
    // All other items should link to platform site
    return `${getPlatformUrl()}${item.path}`;
  };

  return (
    <nav className="flex items-center space-x-6">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/96d1a6db-0f5a-40d5-83ff-ceb74c2ab021.png" alt="YouVersion Platform Logo" className="h-8 w-8 rounded" />
            <span className="font-bold text-lg sm:text-xl tracking-tighter hidden xs:block">YouVersion Platform</span>
            <span className="font-bold text-lg tracking-tighter block xs:hidden antialiased">YouVersion Platform</span>
          </a>
        </div> */}
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Platform link - only show when authenticated */}
          {isAuthenticated && (
            <a 
              href={`${getPlatformUrl()}/platform`}
              className="relative text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
            >
              Platform
            </a>
          )}

          {/* Navigation Items */}
          {publicNavItems.map((item, index) => {
            const isActiveItem = isOnDevdocsSite && item.name === 'Dev Docs';
            const linkHref = createLink(item);
            
            return (
              <a
                key={index}
                href={linkHref}
                className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                  isActiveItem ? 'text-foreground' : 'text-muted-foreground'
                }`}
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
            
            {isAuthenticated && (
              <a 
                href={`${getPlatformUrl()}/platform`}
                className="block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </a>
            )}
            
            {publicNavItems.map((item, index) => {
              const linkHref = createLink(item);
              return (
                <a
                  key={index}
                  href={linkHref}
                  className="block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
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