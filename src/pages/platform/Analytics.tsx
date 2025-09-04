
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const mockChartData = [
  { name: 'Jan', requests: 4000 },
  { name: 'Feb', requests: 3000 },
  { name: 'Mar', requests: 5000 },
  { name: 'Apr', requests: 4500 },
  { name: 'May', requests: 6000 },
  { name: 'Jun', requests: 5500 },
  { name: 'Jul', requests: 7000 },
];

const chartConfig = {
  requests: {
    label: 'Requests',
    color: 'hsl(var(--primary))',
  },
};

const Analytics = () => {
  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your API usage and performance metrics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#FF3D4D]">45,231</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#FF3D4D]">99.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#FF3D4D]">142ms</div>
              <p className="text-xs text-muted-foreground">
                -12ms from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rate Limit Usage</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#FF3D4D]">45%</div>
              <p className="text-xs text-muted-foreground">
                4,500 / 10,000 daily limit
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Volume</CardTitle>
              <CardDescription>API requests over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Endpoints</CardTitle>
              <CardDescription>Most frequently accessed API endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">/v1/verses</span>
                <span className="text-sm text-muted-foreground">12,345 requests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">/v1/bibles</span>
                <span className="text-sm text-muted-foreground">8,421 requests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">/v1/search</span>
                <span className="text-sm text-muted-foreground">5,234 requests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">/v1/plans</span>
                <span className="text-sm text-muted-foreground">3,156 requests</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
