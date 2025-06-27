
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Smartphone, BarChart3, Settings, Bell, ChevronDown, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const platformNavItems = [
  { name: 'Apps', path: '/platform/apps', icon: Smartphone },
  { name: 'Analytics', path: '/platform/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/platform/settings', icon: Settings },
  { name: 'Notifications', path: '/platform/notifications', icon: Bell },
];

const PlatformSidebar = () => {
  const { user, logout } = useAuth();

  const getFirstName = () => {
    if (!user?.name) return 'User';
    return user.name.split(' ')[0];
  };

  return (
    <Sidebar className="w-64" style={{ height: 'calc(100vh - 64px)', top: '64px', position: 'fixed' }}>
      <SidebarHeader className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              Developer Organization <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

      <SidebarFooter className="p-4 sticky bottom-0 bg-sidebar border-t">
        <Button variant="ghost" className="w-full justify-start">
          <User className="h-4 w-4 mr-2" />
          <span>{getFirstName()}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default PlatformSidebar;
