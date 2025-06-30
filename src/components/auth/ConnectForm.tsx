
import React from 'react';
import { Button } from '@/components/ui/button';

const ConnectForm = () => {
  return (
    <div className="space-y-4 text-center">
      <p className="text-sm text-muted-foreground">
        Connect with your existing YouVersion account
      </p>
      <Button className="w-full">
        Connect with YouVersion
      </Button>
    </div>
  );
};

export default ConnectForm;
