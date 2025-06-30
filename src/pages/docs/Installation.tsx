
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Smartphone, Globe, Code } from 'lucide-react';
import CodeBlock from '@/components/ui/code-block';

const Installation = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Complete documentation and code examples for integrating the Bible Reader into your application.
        </p>
      </div>

      {/* Platform Tabs */}
      <div className="grid grid-cols-4 gap-2 p-1 bg-muted rounded-lg">
        <div className="bg-background rounded-md p-3 text-center font-medium">
          iOS
        </div>
        <div className="p-3 text-center text-muted-foreground">
          Flutter
        </div>
        <div className="p-3 text-center text-muted-foreground">
          React Native
        </div>
        <div className="p-3 text-center text-muted-foreground">
          Web
        </div>
      </div>

      {/* iOS Installation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-[#FF3D4D]" />
            iOS Installation
          </CardTitle>
          <CardDescription>
            Add the YouVersion Bible Reader SDK to your iOS project using CocoaPods.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Podfile</h3>
            <CodeBlock language="ruby">
              {`pod 'YouVersionBibleReader', '~> 1.2.0'`}
            </CodeBlock>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Swift Implementation</h3>
            <CodeBlock language="swift">
{`import YouVersionBibleReader

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let bibleReader = BibleReaderView()
        bibleReader.configure(with: "your-api-key")
        view.addSubview(bibleReader)
    }
}`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* Web Installation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#FF3D4D]" />
            Web Installation
          </CardTitle>
          <CardDescription>
            Integrate the Bible Reader into your web application using npm or CDN.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">NPM Installation</h3>
            <CodeBlock language="bash">
              {`npm install @youversion/bible-reader`}
            </CodeBlock>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">JavaScript Usage</h3>
            <CodeBlock language="javascript">
{`import { BibleReader } from '@youversion/bible-reader';

const reader = new BibleReader({
  apiKey: 'your-api-key',
  container: '#bible-reader'
});

reader.loadVerse('john.3.16');`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-[#FF3D4D]" />
            Configuration
          </CardTitle>
          <CardDescription>
            Configure the Bible Reader with your API credentials and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">API Key Setup</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Get your API key from the YouVersion Platform dashboard.
            </p>
            <CodeBlock language="javascript">
{`const config = {
  apiKey: 'your-api-key',
  version: 'NIV',
  language: 'en',
  theme: 'light'
};`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Installation;
