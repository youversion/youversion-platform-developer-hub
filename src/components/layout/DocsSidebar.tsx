
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Code, Zap, Shield, Search, FileText, Download } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from '@/components/ui/sidebar';

const docsNavItems = [
  {
    name: 'Quick Start',
    path: '/docs/quick-start',
    icon: Zap
  },
  {
    name: 'Installation',
    path: '/docs/installation',
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
    name: 'Search',
    path: '/docs/search',
    icon: Search
  }
];

const DocsSidebar = () => {
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
              {docsNavItems.map(item => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => 
                        isActive 
                          ? '' 
                          : 'hover:bg-muted/50 text-youversion-700 bg-muted font-medium'
                      }
                      end
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DocsSidebar;
