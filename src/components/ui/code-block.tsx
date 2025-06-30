
import React from 'react';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
  copyable?: boolean;
}

const CodeBlock = ({ children, language, className, copyable = true }: CodeBlockProps) => {
  const handleCopy = () => {
    const text = typeof children === 'string' ? children : '';
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="bg-[#1a1a1a] text-gray-100 rounded-lg p-4 overflow-x-auto">
        {language && (
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
            {language}
          </div>
        )}
        <pre className="text-sm font-mono">
          <code>{children}</code>
        </pre>
        {copyable && (
          <Button
            variant="borderless"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700/80 hover:bg-gray-600/80"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
