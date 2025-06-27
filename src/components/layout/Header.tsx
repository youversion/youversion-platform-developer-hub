
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const publicNavItems = [
    { name: 'Get Started', path: '/get-started' },
    { name: 'Docs', path: '/docs' },
    { name: 'Examples', path: '/examples' },
    { name: 'Bible Directory', path: '/bible-directory' },
    { name: 'Support', path: '/support' },
  ];

  const platformNavItems = [
    { name: 'Apps', path: '/platform/apps' },
    { name: 'Analytics', path: '/platform/analytics' },
    { name: 'Settings', path: '/platform/settings' },
    { name: 'Notifications', path: '/platform/notifications' },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-[#FF3D4D] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">YV</span>
            </div>
            <span className="font-bold text-xl">YouVersion Platform</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`${
                      location.pathname.startsWith('/platform') ? 'text-[#FF3D4D]' : ''
                    }`}
                  >
                    Platform <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {platformNavItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={isActive(item.path) ? 'text-[#FF3D4D]' : ''}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  {user?.name} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
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
            {isAuthenticated && (
              <div className="space-y-2">
                <div className="font-medium text-sm text-muted-foreground">Platform</div>
                {platformNavItems.map((item) => (
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
              </div>
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
