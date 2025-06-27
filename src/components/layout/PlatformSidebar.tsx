
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Smartphone, BarChart3, Settings, Bell } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

const platformNavItems = [
  { name: 'Apps', path: '/platform/apps', icon: Smartphone },
  { name: 'Analytics', path: '/platform/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/platform/settings', icon: Settings },
  { name: 'Notifications', path: '/platform/notifications', icon: Bell },
];

const PlatformSidebar = () => {
  return (
    <Sidebar className="w-64">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Platform</h2>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? 'text-[#FF3D4D] bg-muted' : 'hover:bg-muted/50'
                      }
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

export default PlatformSidebar;
