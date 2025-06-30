
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Palette, Type, Layout, Zap } from 'lucide-react';

const StyleGuide = () => {
  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Style Guide</h1>
          <p className="text-muted-foreground">
            Design system components and guidelines for YouVersion Platform
          </p>
        </div>

        {/* Colors Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="h-6 w-6 text-[#FF3D4D]" />
            <h2 className="text-2xl font-bold">Colors</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="w-full h-16 bg-[#EDEBEB] rounded mb-2"></div>
                <p className="font-medium">Primary</p>
                <p className="text-sm text-muted-foreground">#EDEBEB</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="w-full h-16 bg-[#FF3D4D] rounded mb-2"></div>
                <p className="font-medium">Brand</p>
                <p className="text-sm text-muted-foreground">#FF3D4D</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="w-full h-16 bg-gradient-to-r from-amber-500 to-pink-500 rounded mb-2"></div>
                <p className="font-medium">Gradient</p>
                <p className="text-sm text-muted-foreground">Amber to Pink</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="w-full h-16 bg-[#F6F4F4] rounded mb-2"></div>
                <p className="font-medium">Surface Primary</p>
                <p className="text-sm text-muted-foreground">#F6F4F4</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="w-full h-16 bg-foreground rounded mb-2"></div>
                <p className="font-medium">Foreground</p>
                <p className="text-sm text-muted-foreground">Text</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Type className="h-6 w-6 text-[#FF3D4D]" />
            <h2 className="text-2xl font-bold">Typography</h2>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Heading 2</h2>
                <p className="text-sm text-muted-foreground">text-3xl font-bold</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Heading 3</h3>
                <p className="text-sm text-muted-foreground">text-2xl font-bold</p>
              </div>
              <div>
                <p className="text-lg">Large text for emphasis</p>
                <p className="text-sm text-muted-foreground">text-lg</p>
              </div>
              <div>
                <p>Regular body text for content</p>
                <p className="text-sm text-muted-foreground">text-base</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Small muted text for descriptions</p>
                <p className="text-sm text-muted-foreground">text-sm text-muted-foreground</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Components Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Layout className="h-6 w-6 text-[#FF3D4D]" />
            <h2 className="text-2xl font-bold">Components</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Primary and secondary button styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button>Primary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Input fields and form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="example-input">Label</Label>
                  <Input id="example-input" placeholder="Placeholder text" />
                </div>
                <div className="flex gap-2">
                  <Badge>Default Badge</Badge>
                  <Badge variant="secondary">Secondary Badge</Badge>
                  <Badge variant="outline">Outline Badge</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>Container components for content</CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg">Example Card</CardTitle>
                    <CardDescription>This is how cards look in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Card content goes here with proper spacing and typography.</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layout</CardTitle>
                <CardDescription>Spacing and layout guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Container Padding</p>
                  <div className="bg-muted p-4 rounded">
                    <div className="bg-background p-4 rounded border-dashed border-2">
                      Container content
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-2">Section Spacing</p>
                  <p className="text-sm text-muted-foreground">Use py-12 for main sections, py-6 for subsections</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-6 w-6 text-[#FF3D4D]" />
            <h2 className="text-2xl font-bold">Usage Guidelines</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do's</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">✅ Use consistent spacing with Tailwind utilities</p>
                <p className="text-sm">✅ Follow the color palette for brand consistency</p>
                <p className="text-sm">✅ Use proper heading hierarchy (h1, h2, h3)</p>
                <p className="text-sm">✅ Maintain proper contrast ratios</p>
                <p className="text-sm">✅ Use cards for grouping related content</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Don'ts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">❌ Don't use custom colors outside the palette</p>
                <p className="text-sm">❌ Don't skip heading levels (h1 to h3)</p>
                <p className="text-sm">❌ Don't use inconsistent spacing</p>
                <p className="text-sm">❌ Don't mix different button styles randomly</p>
                <p className="text-sm">❌ Don't overcomplicate layouts</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide;
