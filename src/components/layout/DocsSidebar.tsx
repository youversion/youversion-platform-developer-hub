
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Code, Zap, Shield, Search, FileText, Download, Play, ChevronDown } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
    name: 'USFM Reference',
    path: '/docs/usfm-reference',
    icon: FileText
  },
  {
    name: 'Search',
    path: '/docs/search',
    icon: Search
  },
  {
    name: 'Examples',
    path: '/docs/examples',
    icon: Play
  }
];

const apiSubNavItems = [
  {
    name: 'Overview',
    path: '/docs/api-reference'
  },
  {
    name: 'Authentication',
    path: '/docs/authentication'
  },
  {
    name: 'Verses',
    path: '/docs/verses'
  },
  {
    name: 'Bibles',
    path: '/docs/bibles'
  },
  {
    name: 'Endpoints',
    path: '/docs/api-reference/endpoints'
  },
  {
    name: 'Rate Limits',
    path: '/docs/api-reference/rate-limits'
  },
  {
    name: 'Response Format',
    path: '/docs/api-reference/response-format'
  }
];

const DocsSidebar = () => {
  const location = useLocation();
  const [isApiOpen, setIsApiOpen] = useState(() => 
    location.pathname.startsWith('/docs/api-reference') ||
    location.pathname === '/docs/authentication' ||
    location.pathname === '/docs/verses' ||
    location.pathname === '/docs/bibles'
  );
  
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
              
              {/* API Reference with collapsible sub-navigation */}
              <SidebarMenuItem>
                <Collapsible open={isApiOpen} onOpenChange={setIsApiOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      isActive={location.pathname.startsWith('/docs/api-reference') ||
                               location.pathname === '/docs/authentication' ||
                               location.pathname === '/docs/verses' ||
                               location.pathname === '/docs/bibles'}
                      className="w-full justify-between"
                    >
                      <div className="flex items-center">
                        <Code className="h-4 w-4" />
                        <span>API Reference</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isApiOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-6 mt-2">
                      {apiSubNavItems.map(subItem => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <SidebarMenuItem key={subItem.path}>
                            <SidebarMenuButton asChild isActive={isSubActive} size="sm">
                              <NavLink to={subItem.path} end>
                                <span>{subItem.name}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DocsSidebar;
