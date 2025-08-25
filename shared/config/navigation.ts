import { getPlatformUrl, getDevdocsUrl, getBiblesUrl } from './urls';

export interface NavItem {
  name: string;
  path: string;
}

export interface CrossSiteNavItem {
  name: string;
  path: string;
  external: boolean;
}

export const getDefaultNavItems = (): NavItem[] => [
  {
    name: 'Get Started',
    path: '/get-started'
  },
  {
    name: 'Dev Docs',
    path: '/introduction'
  },
  // {
  //   name: 'Bible Directory',
  //   path: '/'
  // },
  {
    name: 'Support',
    path: '/support'
  }
];

// Function to get navigation items for the main platform site
export const getPlatformNavItems = (): CrossSiteNavItem[] => {
  const baseItems = getDefaultNavItems();
  return baseItems.map(item => {
    if (item.name === 'Dev Docs') {
      return {
        ...item,
        path: `${getDevdocsUrl()}/introduction`,
        external: true
      };
    }
    if (item.name === 'Bible Directory') {
      return {
        ...item,
        path: getBiblesUrl(),
        external: true
      };
    }
    return {
      ...item,
      external: false
    };
  });
};

// Function to get navigation items for the devdocs site
export const getDevdocsNavItems = (): CrossSiteNavItem[] => {
  const baseItems = getDefaultNavItems();
  return baseItems.map(item => {
    if (item.name === 'Dev Docs') {
      return {
        ...item,
        path: '/introduction',
        external: false
      };
    }
    if (item.name === 'Bible Directory') {
      return {
        ...item,
        path: getBiblesUrl(),
        external: true
      };
    }
    return {
      ...item,
      path: `${getPlatformUrl()}${item.path}`,
      external: true
    };
  });
};

// Function to get navigation items for the bibles site
export const getBiblesNavItems = (): CrossSiteNavItem[] => {
  const baseItems = getDefaultNavItems();
  return baseItems.map(item => {
    if (item.name === 'Dev Docs') {
      return {
        ...item,
        path: `${getDevdocsUrl()}/introduction`,
        external: true
      };
    }
    if (item.name === 'Bible Directory') {
      return {
        ...item,
        path: '/',
        external: false
      };
    }
    return {
      ...item,
      path: `${getPlatformUrl()}${item.path}`,
      external: true
    };
  });
};