
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Code, Zap, Shield, Search, FileText, Download } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from '@/components/ui/sidebar';

const docsNavItems = [
  {
    name: 'Quick Start',
    path: '/docs/quick-start',
    icon: Zap
  },
  {
    name: 'SDKs',
    path: '/docs/sdks',
    icon: Download
  },
  {
    name: 'Authentication',
    path: '/docs/authentication',
    icon: Shield
  },
  {
    name: 'API Reference',
    path: '/docs/api-reference',
    icon: Code
  },
  {
    name: 'Verses',
    path: '/docs/verses',
    icon: BookOpen
  },
  {
    name: 'Bibles',
    path: '/docs/bibles',
    icon: FileText
  },
  {
    name: 'USFM Reference',
    path: '/docs/usfm-reference',
    icon: FileText
  },
  {
    name: 'Search',
    path: '/docs/search',
    icon: Search
  }
];

const DocsSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar 
      style={{
        height: 'calc(100vh - 64px)',
        top: '64px',
        position: 'fixed'
      }} 
      className="w-64 canvas-primary"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {docsNavItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink 
                        to={item.path} 
                        end
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DocsSidebar;
