import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from './SearchBar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X } from 'lucide-react';
import { getDevdocsUrl, getPlatformUrl } from '../../../shared/config/urls';
import { getDefaultNavItems } from '../../../shared/config/navigation';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    isAuthenticated
  } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/docs/quick-start') {
      return location.pathname.startsWith('/docs');
    }
    return location.pathname === path;
  };
  const isOnPlatform = location.pathname.startsWith('/platform');
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
    // For other items, they should be internal links on the platform site
    return item;
  });
  return <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/96d1a6db-0f5a-40d5-83ff-ceb74c2ab021.png" alt="YouVersion Platform Logo" className="h-8 w-8 rounded" />
            <span className="font-bold text-lg sm:text-xl tracking-tighter hidden xs:block">YouVersion Platform</span>
            <span className="font-bold text-lg tracking-tighter block xs:hidden">YouVersion Platform</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            {/* Platform link - only show when authenticated */}
            {isAuthenticated && <Link to="/platform" className={`relative text-sm font-medium transition-colors hover:text-foreground ${isActive('/platform') || isOnPlatform ? 'text-foreground' : 'text-muted-foreground'}`}>
                Platform
                {(isActive('/platform') || isOnPlatform) && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>}
              </Link>}

            {publicNavItems.map(item => {
              // Check if it's an external link (Dev Docs links to devdocs site)
              const isExternal = item.name === 'Dev Docs';
              if (isExternal) {
                return (
                  <a 
                    key={item.path} 
                    href={item.path} 
                    className="relative text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
                  >
                    {item.name}
                  </a>
                );
              }
              return (
                <Link key={item.path} to={item.path} className={`relative text-sm font-medium transition-colors hover:text-foreground ${isActive(item.path) ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.name}
                  {isActive(item.path) && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:block">
            <SearchBar />
          </div>
          
          <ThemeToggle />
          
          {/* {!isAuthenticated && <Button asChild variant="filled-contrast" size="sm" className="text-sm px-3">
              <Link to="/signin">
                <span className="hidden sm:inline">Get App ID</span>
                <span className="sm:hidden">Get App ID</span>
              </Link>
            </Button>} */}

          <Button variant="borderless" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && <div className="md:hidden border-t">
          <nav className="container py-3 space-y-2 px-4 sm:px-6 lg:px-8">
            <div className="mb-3">
              <SearchBar />
            </div>
            
            {isAuthenticated && <Link to="/platform" className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground ${isActive('/platform') || isOnPlatform ? 'text-foreground' : 'text-muted-foreground'}`} onClick={() => setIsMobileMenuOpen(false)}>
                Platform
              </Link>}
            
            {publicNavItems.map(item => {
              // Check if it's an external link (Dev Docs links to devdocs site)
              const isExternal = item.name === 'Dev Docs';
              if (isExternal) {
                return (
                  <a 
                    key={item.path} 
                    href={item.path} 
                    className="block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                );
              }
              return (
                <Link key={item.path} to={item.path} className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground ${isActive(item.path) ? 'text-foreground' : 'text-muted-foreground'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>}
    </header>;
};
export default Header;