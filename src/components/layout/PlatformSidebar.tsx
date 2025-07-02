
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Smartphone, BarChart3, Settings, Bell, ChevronDown, User, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const platformNavItems = [{
  name: 'Dashboard',
  path: '/platform',
  icon: Home
}, {
  name: 'Apps',
  path: '/platform/apps',
  icon: Smartphone
}, {
  name: 'Analytics',
  path: '/platform/analytics',
  icon: BarChart3
}, {
  name: 'Settings',
  path: '/platform/settings',
  icon: Settings
}, {
  name: 'Notifications',
  path: '/platform/notifications',
  icon: Bell
}];

// Mock organizations data - replace with real data from your auth context or API
const mockOrganizations = [{
  id: '1',
  name: 'Dev Org'
}, {
  id: '2',
  name: 'My Startup'
}, {
  id: '3',
  name: 'Client Project'
}];
const PlatformSidebar = () => {
  const {
    user,
    logout
  } = useAuth();
  const [selectedOrg, setSelectedOrg] = React.useState(mockOrganizations[0]);
  const getFirstName = () => {
    if (!user?.name) return 'User';
    return user.name.split(' ')[0];
  };
  const handleOrgSwitch = (org: typeof mockOrganizations[0]) => {
    setSelectedOrg(org);
    // Add your organization switching logic here
    console.log('Switching to organization:', org.name);
  };
  return <Sidebar style={{
    height: 'calc(100vh - 64px)',
    top: '64px',
    position: 'fixed'
  }} className="w-64 canvas-primary">
      <SidebarHeader className="p-4">
        <SidebarGroupLabel>Platform Account</SidebarGroupLabel>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="borderless" className="w-full justify-between">
              <span className="text-lg font-semibold">{selectedOrg.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            {mockOrganizations.map(org => <DropdownMenuItem key={org.id} onClick={() => handleOrgSwitch(org)} className={selectedOrg.id === org.id ? 'bg-muted' : ''}>
                {org.name}
              </DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformNavItems.map(item => <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => 
                        isActive ? 'text-[#FF3D4D] bg-muted' : 'hover:bg-muted/50'
                      }
                      end
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 sticky bottom-0 bg-sidebar border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="borderless" className="w-full justify-between">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{getFirstName()}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>;
};

export default PlatformSidebar;
