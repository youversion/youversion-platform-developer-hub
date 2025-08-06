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
    name: 'Dev Docs',
    path: '/introduction'
  },
  {
    name: 'Bible Directory',
    path: '/'
  },
  {
    name: 'Support',
    path: '/support'
  }
];