
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Smartphone, BarChart3, Settings, Bell } from 'lucide-react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import PlatformSidebar from '@/components/layout/PlatformSidebar';

const Platform = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If we're on the base /platform route, show the dashboard
  if (location.pathname === '/platform') {
    return (
      <SidebarProvider>
        <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
          <PlatformSidebar />
          <div className="flex-1">
            <div className="container py-12">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Developer Dashboard</h1>
                  <p className="text-muted-foreground">
                    Manage your applications and monitor API usage
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Smartphone className="h-8 w-8 text-[#FF3D4D] mb-2" />
                      <CardTitle>Applications</CardTitle>
                      <CardDescription>
                        Manage your registered applications and API keys
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to="/platform/apps">Manage Apps</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <BarChart3 className="h-8 w-8 text-[#FF3D4D] mb-2" />
                      <CardTitle>Analytics</CardTitle>
                      <CardDescription>
                        View API usage statistics and performance metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to="/platform/analytics">View Analytics</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Settings className="h-8 w-8 text-[#FF3D4D] mb-2" />
                      <CardTitle>Settings</CardTitle>
                      <CardDescription>
                        Configure your account preferences and billing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to="/platform/settings">Settings</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Bell className="h-8 w-8 text-[#FF3D4D] mb-2" />
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>
                        Stay updated with important announcements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to="/platform/notifications">View Notifications</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">API Calls Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#FF3D4D]">1,247</div>
                      <p className="text-sm text-muted-foreground">+12% from yesterday</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Active Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#FF3D4D]">3</div>
                      <p className="text-sm text-muted-foreground">All systems operational</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rate Limit Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#FF3D4D]">45%</div>
                      <p className="text-sm text-muted-foreground">4,500 / 10,000 daily limit</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // For nested routes, render with sidebar
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <PlatformSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Platform;
