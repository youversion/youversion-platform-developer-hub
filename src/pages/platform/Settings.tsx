
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { User, CreditCard, Bell, Shield, Key } from 'lucide-react';

const Settings = () => {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and billing information
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#FF3D4D]" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" placeholder="Your company name" />
                </div>
                
                <Button>Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-[#FF3D4D]" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure your API access and rate limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Default Bible Version</Label>
                    <p className="text-sm text-muted-foreground">The default version for API requests</p>
                  </div>
                  <select className="w-32 h-9 px-3 rounded-md border border-input bg-background">
                    <option value="NIV">NIV</option>
                    <option value="ESV">ESV</option>
                    <option value="NLT">NLT</option>
                    <option value="KJV">KJV</option>
                  </select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Enable Webhooks</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for API events</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Rate Limit Warnings</Label>
                    <p className="text-sm text-muted-foreground">Get notified when approaching limits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#FF3D4D]" />
                Billing & Plan
              </CardTitle>
              <CardDescription>
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Current Plan</Label>
                    <p className="text-sm text-muted-foreground">Your current billing plan</p>
                  </div>
                  <Badge className="bg-[#FF3D4D] text-white">Developer Pro</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Monthly Usage</Label>
                    <p className="text-sm text-muted-foreground">4,500 / 10,000 requests</p>
                  </div>
                  <Badge variant="outline">45% Used</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Next Billing Date</Label>
                    <p className="text-sm text-muted-foreground">February 15, 2024</p>
                  </div>
                  <span className="text-sm font-medium">$29.00</span>
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Button variant="outline">Update Payment Method</Button>
                  <Button variant="outline">View Usage History</Button>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#FF3D4D]" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">API Status Updates</Label>
                    <p className="text-sm text-muted-foreground">System maintenance and outages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Usage Alerts</Label>
                    <p className="text-sm text-muted-foreground">Rate limit and quota notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">New Features</Label>
                    <p className="text-sm text-muted-foreground">Product updates and announcements</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Tips, tutorials, and newsletters</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#FF3D4D]" />
                Security
              </CardTitle>
              <CardDescription>
                Protect your account with additional security measures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable 2FA</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">API Key Rotation</Label>
                    <p className="text-sm text-muted-foreground">Automatically rotate keys monthly</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new sign-ins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Download Account Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
