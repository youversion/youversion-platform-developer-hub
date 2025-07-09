
import React from 'react';

const BibleDirectory = () => {
  return (
    <div className="h-screen w-full">
      <iframe 
        src="https://bible-directory.vercel.app" 
        className="w-full h-full border-0"
        title="Bible Directory"
        allow="fullscreen"
      />
    </div>
  );
};

export default BibleDirectory;
