import React from 'react';
import { getPlatformUrl, getDevdocsUrl, getCurrentSiteUrl } from '../../shared/config/urls';
import { NavItem, getDefaultNavItems } from '../../shared/config/navigation';

interface ZudokuNavigationProps {
  navItems?: NavItem[];
  isAuthenticated?: boolean;
}

export const ZudokuNavigation: React.FC<ZudokuNavigationProps> = ({
  navItems = [],
  isAuthenticated = false
}) => {
  //const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on the devdocs site
  const currentSiteUrl = getCurrentSiteUrl();
  const devdocsUrl = getDevdocsUrl();
  const isOnDevdocsSite = currentSiteUrl === devdocsUrl;
  // Use shared navigation configuration but override for devdocs site
  const defaultNavItems = getDefaultNavItems();
  const finalNavItems = navItems.length > 0 ? navItems : defaultNavItems;

  // Create cross-site links
  const createLink = (item: NavItem) => {
    // When on devdocs site, all items except "Dev Docs" should link to platform site
    if (item.name === 'Dev Docs') {
      return item.path; // Internal devdocs link
    }
    // All other items should link to platform site
    return `${getPlatformUrl()}${item.path}`;
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
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
      {finalNavItems.map((item, index) => {
        const isActive = isOnDevdocsSite && item.name === 'Dev Docs';
        return (
          <a
            key={index}
            href={createLink(item)}
            className={`relative text-sm font-medium transition-colors hover:text-foreground ${
              isActive ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {item.name}
            {isActive && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>}
          </a>
        );
      })}

      {/* Get App ID Button */}
      {/* {!isAuthenticated && (
        <a 
          href={`${getPlatformUrl()}/signin`}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-3"
        >
          <span className="hidden sm:inline">Get App ID</span>
          <span className="sm:hidden">Get App ID</span>
        </a>
      )} */}
    </nav>
  );
}; 