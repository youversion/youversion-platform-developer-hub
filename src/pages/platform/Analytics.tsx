
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const usageData = [
    { date: '2024-01-14', requests: 1200, errors: 12 },
    { date: '2024-01-15', requests: 1450, errors: 8 },
    { date: '2024-01-16', requests: 1100, errors: 15 },
    { date: '2024-01-17', requests: 1800, errors: 5 },
    { date: '2024-01-18', requests: 1650, errors: 10 },
    { date: '2024-01-19', requests: 1950, errors: 3 },
    { date: '2024-01-20', requests: 1247, errors: 7 }
  ];

  const endpointData = [
    { endpoint: '/verses', requests: 8500, percentage: 45 },
    { endpoint: '/search', requests: 4200, percentage: 22 },
    { endpoint: '/plans', requests: 3100, percentage: 16 },
    { endpoint: '/translations', requests: 2200, percentage: 12 },
    { endpoint: '/chapters', requests: 950, percentage: 5 }
  ];

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your API usage and performance metrics
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#FF3D4D]">26,510</div>
              <p className="text-xs text-muted-foreground">+18% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">99.7%</div>
              <p className="text-xs text-muted-foreground">60 errors total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">142ms</div>
              <p className="text-xs text-muted-foreground">-5ms from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rate Limit Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">45%</div>
              <p className="text-xs text-muted-foreground">4,500 / 10,000 daily</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Over Time</CardTitle>
              <CardDescription>Daily request volume for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#FF3D4D" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Endpoints</CardTitle>
              <CardDescription>Most frequently used API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={endpointData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="endpoint" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#FF3D4D" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bible Study App</p>
                    <p className="text-sm text-muted-foreground">245 requests</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Church Website</p>
                    <p className="text-sm text-muted-foreground">89 requests</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Devotional Bot</p>
                    <p className="text-sm text-muted-foreground">12 requests</p>
                  </div>
                  <Badge variant="secondary">Inactive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Verses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">John 3:16</p>
                  <p className="text-sm text-muted-foreground">452 requests</p>
                </div>
                <div>
                  <p className="font-medium">Jeremiah 29:11</p>
                  <p className="text-sm text-muted-foreground">387 requests</p>
                </div>
                <div>
                  <p className="font-medium">Romans 8:28</p>
                  <p className="text-sm text-muted-foreground">341 requests</p>
                </div>
                <div>
                  <p className="font-medium">Philippians 4:13</p>
                  <p className="text-sm text-muted-foreground">298 requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Error Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Rate Limit (429)</span>
                  <span className="text-sm font-medium">25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Not Found (404)</span>
                  <span className="text-sm font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bad Request (400)</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Server Error (500)</span>
                  <span className="text-sm font-medium">5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
