interface SiteUrls {
  platform: {
    development: string;
    production: string;
  };
  devdocs: {
    development: string;
    production: string;
  };
  bibles: {
    development: string;
    production: string;
  };
}

const urls: SiteUrls = {
  platform: {
    development: 'http://localhost:8080',
    production: 'https://platform.youversion.com'
  },
  devdocs: {
    development: 'http://localhost:3000',
    production: 'https://developers.youversion.com'
  },
  bibles: {
    development: 'http://localhost:3001',
    production: 'https://bibles.youversion.com'
  }
};

export const getPlatformUrl = (): string => {
  return process.env.NODE_ENV === 'production' 
    ? urls.platform.production 
    : urls.platform.development;
};

export const getDevdocsUrl = (): string => {
  return process.env.NODE_ENV === 'production' 
    ? urls.devdocs.production 
    : urls.devdocs.development;
};

export const getBiblesUrl = (): string => {
  return process.env.NODE_ENV === 'production' 
    ? urls.bibles.production 
    : urls.bibles.development;
};

export const getCurrentSiteUrl = (): string => {
  // For SSR, always return the devdocs URL to avoid hydration mismatch
  // The actual current site will be determined client-side after hydration
  if (typeof window === 'undefined') {
    return urls.devdocs.development; // Consistent fallback for SSR
  }
  return window.location.origin;
};

export default urls; 