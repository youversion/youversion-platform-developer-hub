import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
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
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/96d1a6db-0f5a-40d5-83ff-ceb74c2ab021.png" 
              alt="YouVersion Platform Logo" 
              className="h-8 w-8 rounded"
            />
            <span className="font-bold text-xl">YouVersion Platform</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {/* Show Platform link only when not on platform routes and authenticated */}
            {isAuthenticated && !isOnPlatform && (
              <Link
                to="/platform"
                className={`text-sm font-medium transition-colors hover:text-[#FF3D4D] ${
                  isActive('/platform') ? 'text-[#FF3D4D]' : 'text-muted-foreground'
                }`}
              >
                Platform
              </Link>
            )}

            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#FF3D4D] ${
                  isActive(item.path) ? 'text-[#FF3D4D]' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {!isAuthenticated && (
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}

          <Button
            variant="ghost"
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
            {isAuthenticated && !isOnPlatform && (
              <Link
                to="/platform"
                className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-[#FF3D4D] ${
                  isActive('/platform') ? 'text-[#FF3D4D]' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </Link>
            )}
            
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-[#FF3D4D] ${
                  isActive(item.path) ? 'text-[#FF3D4D]' : ''
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
