interface SiteUrls {
  platform: {
    development: string;
    production: string;
  };
  devdocs: {
    development: string;
    production: string;
  };
  // bibles: {
  //   development: string;
  //   production: string;
  // };
}

const urls: SiteUrls = {
  platform: {
    development: 'http://localhost:8080',
    production: 'https://platform.youversion.com'
  },
  devdocs: {
    development: 'http://localhost:3000',
    production: 'https://developers.youversion.com'
  // },
  // bibles: {
  //   development: 'http://localhost:3001',
  //   production: 'https://bibles.youversion.com'
  // }
};

export const getPlatformUrl = (): string => {
  return isDevelopmentMode() ? urls.platform.development : urls.platform.production;
};

export const getDevdocsUrl = (): string => {
  return isDevelopmentMode() ? urls.devdocs.development : urls.devdocs.production;
};

// export const getBiblesUrl = (): string => {
//   return isDevelopmentMode() ? urls.bibles.development : urls.bibles.production;
// };

export const getCurrentSiteUrl = (): string => {
  // For SSR, always return the devdocs URL to avoid hydration mismatch
  // The actual current site will be determined client-side after hydration
  if (typeof window === 'undefined') {
    return urls.devdocs.development; // Consistent fallback for SSR
  }
  return window.location.origin;
};

export const isDevelopmentMode = (): boolean => {
  // Prefer Vite-style environment flags when available
  try {
    // Use `any` to avoid type issues across toolchains (Vite, Next, Node)
    const viteEnv: any = (typeof import.meta !== 'undefined')
      ? (import.meta as any).env
      : undefined;

    if (viteEnv) {
      if (typeof viteEnv.DEV === 'boolean') {
        return viteEnv.DEV;
      }
      if (typeof viteEnv.MODE === 'string') {
        return viteEnv.MODE !== 'production';
      }
    }
  } catch {
    // no-op
  }

  // Fallback to Node/Next.js convention
  if (typeof process !== 'undefined' && process.env && typeof process.env.NODE_ENV === 'string') {
    return process.env.NODE_ENV !== 'production';
  }

  // Last-resort heuristic in the browser
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) {
      return true;
    }
  }

  return false;
};

export default urls; 