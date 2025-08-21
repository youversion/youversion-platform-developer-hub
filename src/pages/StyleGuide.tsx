import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Palette, Type, Layout, Zap, Bell, Info, AlertTriangle, CheckCircle, X,
  // Navigation & UI
  Home, Menu, Search, Settings, User, Users, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  // Actions
  Plus, Minus, Edit, Trash, Copy, Download, Upload, Save, RefreshCw, RotateCcw,
  // Communication
  Mail, MessageCircle, Phone, Video, Share, Link, ExternalLink,
  // Status
  Check, XCircle, AlertCircle, HelpCircle, Clock, Calendar, Star,
  // Media
  Image, Video as VideoIcon, Music, File, FileText, Folder, FolderOpen,
  // Technology
  Code, Smartphone, Monitor, Laptop, Tablet, Wifi, Bluetooth, Cpu, Database,
  // Business
  Building, Briefcase, DollarSign, CreditCard, ShoppingCart, Package, Truck,
  // Nature
  Heart, Leaf, Sun, Moon, Cloud, CloudRain, Wind,
  // Objects
  Book, BookOpen, FileBox, Library, Map, Globe, Compass, Navigation,
  // Development
  GitBranch, GitCommit, GitPullRequest, GitMerge, Terminal, Server, Database as DbIcon,
  // Social
  Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Globe as GlobeIcon,
  // Other
  Eye, EyeOff, Lock, Unlock, Shield, Key, BellRing, Volume2, VolumeX, Mic, MicOff
} from 'lucide-react';
import StatementOfFaithModal from '@/components/StatementOfFaithModal';
const StyleGuide = () => {
  const { toast } = useToast();
  const [isStatementOpen, setIsStatementOpen] = React.useState(false);
  return <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">(Internal Use) Style Guide</h1>
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

          {/* Slate Color Swatches */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Slate Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-50 rounded mb-2 border"></div>
                  <p className="text-xs font-medium">slate-50</p>
                  <p className="text-xs text-muted-foreground">#f8fafc</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-100 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-100</p>
                  <p className="text-xs text-muted-foreground">#f1f5f9</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-200 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-200</p>
                  <p className="text-xs text-muted-foreground">#e2e8f0</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-300 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-300</p>
                  <p className="text-xs text-muted-foreground">#cbd5e1</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-400 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-400</p>
                  <p className="text-xs text-muted-foreground">#94a3b8</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-500 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-500</p>
                  <p className="text-xs text-muted-foreground">#64748b</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-600 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-600</p>
                  <p className="text-xs text-muted-foreground">#475569</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-700 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-700</p>
                  <p className="text-xs text-muted-foreground">#334155</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-800 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-800</p>
                  <p className="text-xs text-muted-foreground">#1e293b</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="w-full h-12 bg-slate-900 rounded mb-2"></div>
                  <p className="text-xs font-medium">slate-900</p>
                  <p className="text-xs text-muted-foreground">#0f172a</p>
                </CardContent>
              </Card>
            </div>
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
          
          <div className="grid md:grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Modals</CardTitle>
                <CardDescription>Dialog components and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setIsStatementOpen(true)}>Preview Statement of Faith Modal</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Complete button variants and sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Button Variants */}
                <div>
                  <h4 className="font-medium mb-3">Button Variants</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button>Default Button</Button>
                    <Button variant="stroked">Stroked Button</Button>
                    <Button variant="borderless">Borderless Button</Button>
                    <Button variant="filled-contrast">Filled Contrast</Button>
                    <Button variant="filled-secondary">Filled Secondary</Button>
                    <Button variant="filled-brand">Filled Brand</Button>
                    <Button variant="link">Link Button</Button>
                  </div>
                </div>

                {/* Button Sizes - Default */}
                <div>
                  <h4 className="font-medium mb-3">Default Button Sizes</h4>
                  <div className="flex items-center gap-2">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                    <Button size="icon">🔍</Button>
                  </div>
                </div>

                {/* Button Sizes - Filled Contrast */}
                <div>
                  <h4 className="font-medium mb-3">Filled Contrast Button Sizes</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="filled-contrast" size="xs">Extra Small</Button>
                    <Button variant="filled-contrast" size="sm">Small</Button>
                    <Button variant="filled-contrast">Default</Button>
                    <Button variant="filled-contrast" size="lg">Large</Button>
                    <Button variant="filled-contrast" size="xl">Extra Large</Button>
                    <Button variant="filled-contrast" size="icon">🔍</Button>
                  </div>
                </div>

                {/* Button Sizes - Stroked */}
                <div>
                  <h4 className="font-medium mb-3">Stroked Button Sizes</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="stroked" size="xs">Extra Small</Button>
                    <Button variant="stroked" size="sm">Small</Button>
                    <Button variant="stroked">Default</Button>
                    <Button variant="stroked" size="lg">Large</Button>
                    <Button variant="stroked" size="xl">Extra Large</Button>
                    <Button variant="stroked" size="icon">🔍</Button>
                  </div>
                </div>

                {/* Button Sizes - Secondary */}
                <div>
                  <h4 className="font-medium mb-3">Filled Secondary Button Sizes</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="filled-secondary" size="xs">Extra Small</Button>
                    <Button variant="filled-secondary" size="sm">Small</Button>
                    <Button variant="filled-secondary">Default</Button>
                    <Button variant="filled-secondary" size="lg">Large</Button>
                    <Button variant="filled-secondary" size="xl">Extra Large</Button>
                    <Button variant="filled-secondary" size="icon">🔍</Button>
                  </div>
                </div>

                {/* Disabled States */}
                <div>
                  <h4 className="font-medium mb-3">Disabled States</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled>Default Disabled</Button>
                    <Button variant="stroked" disabled>Stroked Disabled</Button>
                    <Button variant="filled-contrast" disabled>Filled Contrast Disabled</Button>
                    <Button variant="filled-secondary" disabled>Filled Secondary Disabled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Input fields and form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Text Input */}
                <div>
                  <h4 className="font-medium mb-3">Text Input</h4>
                  <div>
                    <Label htmlFor="example-input">Label</Label>
                    <Input id="example-input" placeholder="Placeholder text" />
                  </div>
                </div>

                {/* Checkboxes */}
                <div>
                  <h4 className="font-medium mb-3">Checkboxes</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" defaultChecked />
                      <Label htmlFor="marketing">Subscribe to marketing emails</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled" disabled />
                      <Label htmlFor="disabled">Disabled option</Label>
                    </div>
                  </div>
                </div>

                {/* Radio Buttons */}
                <div>
                  <h4 className="font-medium mb-3">Radio Buttons</h4>
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="option1" />
                      <Label htmlFor="option1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="option2" />
                      <Label htmlFor="option2">Option 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option3" id="option3" />
                      <Label htmlFor="option3">Option 3</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Badges */}
                <div>
                  <h4 className="font-medium mb-3">Badges</h4>
                  <div className="flex gap-2">
                    <Badge>Default Badge</Badge>
                    <Badge variant="secondary">Secondary Badge</Badge>
                    <Badge variant="outline">Outline Badge</Badge>
                  </div>
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

        {/* Icons Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-6 w-6 text-[#FF3D4D]" />
            <h2 className="text-2xl font-bold">Icons</h2>
          </div>
          
          <div className="space-y-8">
            {/* Navigation & UI Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation & UI</CardTitle>
                <CardDescription>Common navigation and interface icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Home className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Home</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Menu className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Menu</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Search className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Search</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Settings className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Settings</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <User className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">User</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Users</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <ChevronDown className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">ChevronDown</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <ChevronUp className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">ChevronUp</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <ChevronLeft className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">ChevronLeft</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <ChevronRight className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">ChevronRight</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Common action and interaction icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Plus</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Minus className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Minus</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Edit className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Edit</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Trash className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Trash</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Copy className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Copy</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Download</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Upload className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Upload</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Save className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Save</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <RefreshCw className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">RefreshCw</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <RotateCcw className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">RotateCcw</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Technology</CardTitle>
                <CardDescription>Technology and development related icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Code className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Code</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Smartphone className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Smartphone</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Monitor className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Monitor</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Laptop className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Laptop</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Tablet className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Tablet</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Wifi className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Wifi</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Bluetooth className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Bluetooth</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Cpu className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Cpu</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Database className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Database</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Development Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Development</CardTitle>
                <CardDescription>Development and version control icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <GitBranch className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">GitBranch</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <GitCommit className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">GitCommit</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <GitPullRequest className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">GitPullRequest</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <GitMerge className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">GitMerge</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Terminal className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Terminal</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Server className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Server</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Github className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Github</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Communication</CardTitle>
                <CardDescription>Communication and social media icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Mail className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Mail</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">MessageCircle</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Phone className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Phone</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Video className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Video</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Share className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Share</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Link className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Link</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <ExternalLink className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">ExternalLink</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <GlobeIcon className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Globe</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>Status and feedback icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Check className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Check</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <XCircle className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">XCircle</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <AlertCircle className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">AlertCircle</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <HelpCircle className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">HelpCircle</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Clock className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Clock</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Calendar</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Star className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Star</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <BellRing className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">BellRing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>Media and file related icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Image className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Image</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <VideoIcon className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Video</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Music className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Music</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <File className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">File</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">FileText</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <FileBox className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">FileBox</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Folder className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Folder</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <FolderOpen className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">FolderOpen</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objects Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Objects</CardTitle>
                <CardDescription>Common object and reference icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Book className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Book</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <BookOpen className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">BookOpen</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Library className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Library</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Map className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Map</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Globe className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Globe</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Compass className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Compass</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Navigation className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Navigation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Security and access control icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Eye className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Eye</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <EyeOff className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">EyeOff</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Lock className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Lock</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Unlock className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Unlock</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Shield className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Shield</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Key className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">Key</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-6 w-6 text-[#FF3D4D]" />
            <h2 className="text-2xl font-bold">Notifications</h2>
          </div>
          
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Static notification components for important messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>
                    This is an informational alert for general information.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    This is a destructive alert for errors and critical issues.
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    This is a success alert for positive actions and confirmations.
                  </AlertDescription>
                </Alert>

                <Alert className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This is a warning alert for important notices that need attention.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Toast Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
                <CardDescription>Dynamic notifications that appear temporarily</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => toast({
                      title: "Success",
                      description: "Your action was completed successfully.",
                    })}
                  >
                    Show Success Toast
                  </Button>

                  <Button 
                    variant="filled-contrast"
                    onClick={() => toast({
                      title: "Error",
                      description: "Something went wrong. Please try again.",
                      variant: "destructive",
                    })}
                  >
                    Show Error Toast
                  </Button>

                  <Button 
                    variant="stroked"
                    onClick={() => toast({
                      title: "Info",
                      description: "Here's some helpful information for you.",
                    })}
                  >
                    Show Info Toast
                  </Button>

                  <Button 
                    variant="filled-secondary"
                    onClick={() => toast({
                      title: "Undo",
                      description: "Your file was saved.",
                      action: (
                        <Button variant="stroked" size="sm">
                          Undo
                        </Button>
                      ),
                    })}
                  >
                    Toast with Action
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inline Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Inline Notifications</CardTitle>
                <CardDescription>Small contextual notifications within content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">This is an inline info notification</span>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-800 dark:text-green-200">This is an inline success notification</span>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-amber-800 dark:text-amber-200">This is an inline warning notification</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <span className="text-sm text-red-800 dark:text-red-200">This is an inline error notification</span>
                    </div>
                    <Button variant="borderless" size="sm" className="h-6 w-6 p-0 text-red-600 hover:text-red-800 dark:text-red-400">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
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
      <StatementOfFaithModal 
        open={isStatementOpen} 
        onOpenChange={setIsStatementOpen} 
        onAccept={() => setIsStatementOpen(false)} 
      />
    </div>;
};
export default StyleGuide;