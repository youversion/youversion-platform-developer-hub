import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from './SearchBar';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isOnPlatform = location.pathname.startsWith('/platform');

  const publicNavItems = [
    { name: 'Get Started', path: '/get-started' },
    { name: 'Docs', path: '/docs' },
    { name: 'Examples', path: '/examples' },
    { name: 'Bible Directory', path: '/bible-directory' },
    { name: 'Dev Portal Styles', path: '/style-guide' },
    { name: 'Support', path: '/support' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/96d1a6db-0f5a-40d5-83ff-ceb74c2ab021.png" 
              alt="YouVersion Platform Logo" 
              className="h-8 w-8 rounded" 
            />
            <span className="font-bold text-xl tracking-tighter">YouVersion Platform</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {/* Platform link - only show when authenticated */}
            {isAuthenticated && (
              <Link 
                to="/platform" 
                className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/platform') || isOnPlatform ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Platform
                {(isActive('/platform') || isOnPlatform) && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>
                )}
              </Link>
            )}

            {publicNavItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(item.path) ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          
          {!isAuthenticated && (
            <Button asChild variant="filled-contrast">
              <Link to="/login">Get App Keys</Link>
            </Button>
          )}

          <Button 
            variant="borderless" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 space-y-2">
            <div className="mb-4">
              <SearchBar />
            </div>
            
            {isAuthenticated && (
              <Link 
                to="/platform" 
                className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/platform') || isOnPlatform ? 'text-foreground' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </Link>
            )}
            
            {publicNavItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(item.path) ? 'text-foreground' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
