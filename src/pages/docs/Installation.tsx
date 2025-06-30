import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Smartphone, Globe, Code, Zap } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import CodeBlock from '@/components/ui/code-block';

const Installation = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-secondary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Installation</h1>
                <p className="text-xl text-muted-foreground">
                  Complete documentation and code examples for integrating the Bible Reader into your application.
                </p>
              </div>

              {/* Platform Tabs */}
              <Tabs defaultValue="ios" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="ios">iOS</TabsTrigger>
                  <TabsTrigger value="flutter">Flutter</TabsTrigger>
                  <TabsTrigger value="react-native">React Native</TabsTrigger>
                  <TabsTrigger value="web">Web</TabsTrigger>
                </TabsList>

                {/* iOS Installation */}
                <TabsContent value="ios" className="space-y-6">
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
                </TabsContent>

                {/* Flutter Installation */}
                <TabsContent value="flutter" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-[#FF3D4D]" />
                        Flutter Installation
                      </CardTitle>
                      <CardDescription>
                        Add the YouVersion Bible Reader plugin to your Flutter project.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">pubspec.yaml</h3>
                        <CodeBlock language="yaml">
{`dependencies:
  youversion_bible_reader: ^1.0.0`}
                        </CodeBlock>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Dart Implementation</h3>
                        <CodeBlock language="dart">
{`import 'package:youversion_bible_reader/youversion_bible_reader.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BibleReaderWidget(
        apiKey: 'your-api-key',
        initialVerse: 'john.3.16',
      ),
    );
  }
}`}
                        </CodeBlock>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* React Native Installation */}
                <TabsContent value="react-native" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-[#FF3D4D]" />
                        React Native Installation
                      </CardTitle>
                      <CardDescription>
                        Install the YouVersion Bible Reader package for React Native.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">NPM Installation</h3>
                        <CodeBlock language="bash">
                          {`npm install @youversion/react-native-bible-reader`}
                        </CodeBlock>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">React Native Usage</h3>
                        <CodeBlock language="javascript">
{`import { BibleReader } from '@youversion/react-native-bible-reader';

const App = () => {
  return (
    <BibleReader
      apiKey="your-api-key"
      initialVerse="john.3.16"
      style={{ flex: 1 }}
    />
  );
};

export default App;`}
                        </CodeBlock>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Web Installation */}
                <TabsContent value="web" className="space-y-6">
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
                </TabsContent>
              </Tabs>

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
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Installation;
