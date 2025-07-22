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
  const {
    isAuthenticated
  } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If we're on the base /platform route, show the dashboard
  if (location.pathname === '/platform') {
    return <SidebarProvider>
        <div className="flex w-full" style={{
        height: 'calc(100vh - 64px)'
      }}>
          <PlatformSidebar />
          <div className="flex-1 canvas-primary">
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
                      <Button asChild variant="filled-secondary" className="w-full">
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
                      <Button asChild variant="filled-secondary" className="w-full">
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
                      <Button asChild variant="filled-secondary" className="w-full">
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
                      <Button asChild variant="filled-secondary" className="w-full">
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

                {/* Changelog Section */}
                <div className="mt-12">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Changelog</h2>
                    <p className="text-muted-foreground">
                      Stay up to date with the latest changes to YouVersion APIs and SDKs.
                    </p>
                  </div>

                  {/* API Status */}
                  <Card className="mb-8">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <CardTitle className="text-xl">API Status: All Systems Operational</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold mb-1">Bible Reader API</h4>
                          <p className="text-sm text-green-600 dark:text-green-400">99.9% uptime</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Authentication API</h4>
                          <p className="text-sm text-green-600 dark:text-green-400">100% uptime</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Search API</h4>
                          <p className="text-sm text-green-600 dark:text-green-400">99.8% uptime</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Version History */}
                  <div className="space-y-8">
                    {/* v2.1.0 */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-xl">v2.1.0</CardTitle>
                            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">minor</span>
                          </div>
                          <span className="text-sm text-muted-foreground">6/14/2024</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-green-600 dark:text-green-400 text-xs">+</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded mr-2">feature</span>
                            <span>Added support for parallel passage lookup</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-green-600 dark:text-green-400 text-xs">+</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded mr-2">feature</span>
                            <span>New webhook events for reading plan progress</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-purple-600 dark:text-purple-400 text-xs">⚡</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded mr-2">improvement</span>
                            <span>Improved API response times by 15%</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-blue-600 dark:text-blue-400 text-xs">🔧</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded mr-2">fix</span>
                            <span>Fixed issue with special characters in search queries</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* v2.0.5 */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-xl">v2.0.5</CardTitle>
                            <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">patch</span>
                          </div>
                          <span className="text-sm text-muted-foreground">5/31/2024</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-blue-600 dark:text-blue-400 text-xs">🔧</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded mr-2">fix</span>
                            <span>Resolved authentication timeout issues</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-blue-600 dark:text-blue-400 text-xs">🔧</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded mr-2">fix</span>
                            <span>Fixed pagination bug in Bible versions endpoint</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-purple-600 dark:text-purple-400 text-xs">⚡</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded mr-2">improvement</span>
                            <span>Enhanced error messages for better debugging</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* v2.0.0 */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-xl">v2.0.0</CardTitle>
                            <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">major</span>
                          </div>
                          <span className="text-sm text-muted-foreground">5/19/2024</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-red-600 dark:text-red-400 text-xs">⚠</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded mr-2">breaking</span>
                            <span>Updated authentication flow to OAuth 2.1</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-green-600 dark:text-green-400 text-xs">+</span>
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded mr-2">feature</span>
                            <span>Added support for 50+ new Bible versions</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>;
  }

  // For nested routes, render with sidebar
  return <SidebarProvider>
      <div className="flex w-full canvas-secondary min-h-screen">
        <PlatformSidebar />
        <div className="flex-1 canvas-primary">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>;
};
export default Platform;