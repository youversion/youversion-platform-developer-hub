interface SiteUrls {
  platform: {
    development: string;
    production: string;
  };
  devdocs: {
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

export const getCurrentSiteUrl = (): string => {
  // This will be determined by which site is running
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return urls.platform.development; // fallback
};

export default urls; 