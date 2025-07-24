export interface NavItem {
  name: string;
  path: string;
}

export const getDefaultNavItems = (): NavItem[] => [
  {
    name: 'Get Started',
    path: '/get-started'
  },
  {
    name: 'Dev - old',
    path: '/docs/quick-start'
  },
  {
    name: 'Dev Docs',
    path: '/introduction'
  },
  {
    name: 'Bible Directory',
    path: '/bible-directory'
  },
  {
    name: 'Dev Portal Styles',
    path: '/style-guide'
  }
]; 