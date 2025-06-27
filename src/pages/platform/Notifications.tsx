
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'warning',
      title: 'Rate Limit Warning',
      message: 'You are approaching your daily rate limit (85% used). Consider upgrading your plan to avoid service interruption.',
      timestamp: '2024-01-20T10:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'New API Version Available',
      message: 'API v2.1 is now available with improved performance and new endpoints. Check our documentation for migration details.',
      timestamp: '2024-01-19T14:15:00Z',
      read: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Billing Successful',
      message: 'Your monthly subscription has been renewed successfully. Next billing date: February 15, 2024.',
      timestamp: '2024-01-15T09:00:00Z',
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'API Key Compromised',
      message: 'Suspicious activity detected on API key yvp_****7890. We have temporarily disabled this key for security.',
      timestamp: '2024-01-14T16:45:00Z',
      read: true
    },
    {
      id: '5',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'We will be performing scheduled maintenance on January 25th from 2:00 AM to 4:00 AM EST. Expect brief service interruptions.',
      timestamp: '2024-01-12T12:00:00Z',
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'default';
      case 'error':
        return 'destructive';
      case 'success':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Bell className="h-8 w-8 text-[#FF3D4D]" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-[#FF3D4D] text-white">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              Stay updated with important alerts and announcements
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`${!notification.read ? 'border-l-4 border-l-[#FF3D4D] bg-muted/30' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {notification.title}
                          {!notification.read && (
                            <Badge variant="outline" className="text-xs">
                              New
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {new Date(notification.timestamp).toLocaleDateString()} at{' '}
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {notification.message}
                  </p>
                  
                  {notification.type === 'warning' && notification.id === '1' && (
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">Upgrade Plan</Button>
                      <Button size="sm" variant="outline">View Usage</Button>
                    </div>
                  )}
                  
                  {notification.type === 'info' && notification.id === '2' && (
                    <div className="mt-4">
                      <Button size="sm" variant="outline">View Documentation</Button>
                    </div>
                  )}
                  
                  {notification.type === 'error' && notification.id === '4' && (
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="destructive">Generate New Key</Button>
                      <Button size="sm" variant="outline">Review Activity</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Notification Preferences */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Get urgent alerts via SMS</p>
                </div>
                <Button variant="outline" size="sm">Set up SMS</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Webhook Notifications</p>
                  <p className="text-sm text-muted-foreground">Send notifications to your endpoint</p>
                </div>
                <Button variant="outline" size="sm">Configure Webhook</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
