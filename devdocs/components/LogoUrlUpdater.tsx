import React, { useEffect } from 'react';
import { getPlatformUrl } from '../../shared/config/urls';

export const LogoUrlUpdater: React.FC = () => {
  useEffect(() => {
    const updateLogoHref = () => {
      // Try different selectors to find the logo link
      const selectors = [
        'header a[href]',
        'header a',
        'header .logo a',
        'header a img',
        'header a:has(img)',
        'header a[href*="localhost"]',
        'header a[href*="platform"]'
      ];
      
      let logoLink = null;
      for (const selector of selectors) {
        logoLink = document.querySelector(selector);
        if (logoLink) {
          break;
        }
      }
      
      if (logoLink) {
        const newUrl = getPlatformUrl();
        logoLink.href = newUrl;
        
        // Add click event listener to handle external navigation
        logoLink.addEventListener('click', (e) => {
          // Prevent the default link behavior and force external navigation
          e.preventDefault();
          e.stopPropagation();
          
          // Force external navigation in same window
          window.location.href = newUrl;
        });
        
        // Remove target="_blank" since we want same window navigation
        logoLink.removeAttribute('target');
        logoLink.removeAttribute('rel');
        
        // Add a more direct click handler as backup
        logoLink.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = newUrl;
        };
      }
    };

    // Try multiple times with delays
    const tryUpdate = () => {
      updateLogoHref();
      // Try again after 500ms, 1s, and 2s
      setTimeout(updateLogoHref, 500);
      setTimeout(updateLogoHref, 1000);
      setTimeout(updateLogoHref, 2000);
    };

    // Update immediately
    tryUpdate();

    // Also update after any navigation (for SPA)
    let lastUrl = location.href;
    const observer = new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(tryUpdate, 100);
      }
    });

    observer.observe(document, { subtree: true, childList: true });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};
