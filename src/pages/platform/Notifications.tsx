
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Rate limit warning',
      message: 'You have used 80% of your daily API quota',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2, 
      type: 'info',
      title: 'New Bible translation available',
      message: 'The New International Version (2024) is now available in the API',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Application approved',
      message: 'Your "Study Notes App" has been approved for production use',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Scheduled maintenance',
      message: 'API maintenance scheduled for Sunday 2:00 AM - 4:00 AM EST',
      time: '3 days ago',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with important announcements and alerts
            </p>
          </div>
          <Button variant="stroked">
            <Bell className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`${!notification.read ? 'border-[#FF3D4D] bg-red-50/50' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div>
                      <CardTitle className="text-lg">{notification.title}</CardTitle>
                      <CardDescription>{notification.message}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Badge variant="destructive" className="bg-[#FF3D4D]">New</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No notifications</h2>
              <p className="text-muted-foreground text-center">
                You're all caught up! We'll notify you of any important updates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
