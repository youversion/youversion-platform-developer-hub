
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
    name: 'Examples',
    path: '/docs/examples',
    icon: Play
  }
];

const apiSubNavItems = [
  {
    name: 'Overview',
    path: '/docs/api'
  },
  {
    name: 'Authentication',
    path: '/docs/authentication'
  },
  {
    name: 'Bibles',
    path: '/docs/bibles'
  },
  {
    name: 'Verses',
    path: '/docs/verses'
  },
  {
    name: 'Search API',
    path: '/docs/search'
  },
  {
    name: 'Endpoints',
    path: '/docs/api/endpoints'
  },
  {
    name: 'Rate Limits',
    path: '/docs/api/rate-limits'
  },
  {
    name: 'Response Format',
    path: '/docs/api/response-format'
  }
];

const DocsSidebar = () => {
  const location = useLocation();
  const [isApiOpen, setIsApiOpen] = useState(() => 
    location.pathname.startsWith('/docs/api') ||
    location.pathname === '/docs/authentication' ||
    location.pathname === '/docs/verses' ||
    location.pathname === '/docs/bibles' ||
    location.pathname === '/docs/search'
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
              {/* Quick Start */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/docs/quick-start'}>
                  <NavLink to="/docs/quick-start" end>
                    <Zap className="h-4 w-4" />
                    <span>Quick Start</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* API Reference with collapsible sub-navigation */}
              <SidebarMenuItem>
                <Collapsible open={isApiOpen} onOpenChange={setIsApiOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      asChild
                      isActive={location.pathname.startsWith('/docs/api') ||
                               location.pathname === '/docs/authentication' ||
                               location.pathname === '/docs/verses' ||
                               location.pathname === '/docs/bibles' ||
                               location.pathname === '/docs/search'}
                      className="w-full justify-between"
                    >
                      <NavLink to="/docs/api" className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Code className="h-4 w-4 mr-2" />
                          <span>API Reference</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isApiOpen ? 'rotate-180' : ''}`} />
                      </NavLink>
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

              {/* Other navigation items */}
              {docsNavItems.slice(1).map(item => {
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
