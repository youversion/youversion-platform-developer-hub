import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import Footer from '@/components/layout/Footer';
import CodeBlock from '@/components/ui/code-block';
import { Brain, Code, Database, Key, Shield, Zap, AlertTriangle } from 'lucide-react';

const ForLLMs = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <DocsSidebar />
        <div className="flex-1 canvas-primary flex flex-col">
          <div className="flex-1">
            <div className="container py-12">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-4">For LLMs: Complete YouVersion Platform Documentation</h1>
                  <p className="text-xl text-muted-foreground">
                    Comprehensive documentation for Large Language Models working with the YouVersion Platform
                  </p>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950 mb-8">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                    Placeholder - needs real code snippets and information
                  </AlertDescription>
                </Alert>

                {/* Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-youversion-600" />
                      Platform Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>The YouVersion Platform is a comprehensive Bible API that allows developers to integrate Bible content, user authentication, and religious data into their applications.</p>
                    
                    <h3 className="text-lg font-semibold">Core Components:</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>REST API</strong>: Provides access to Bible content, translations, and metadata</li>
                      <li><strong>Authentication System</strong>: OAuth-based login with YouVersion accounts</li>
                      <li><strong>SDKs</strong>: Available for Swift (iOS), React, and JavaScript</li>
                      <li><strong>Bible Reader SDK</strong>: Embeddable Bible reading components</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Base URL:</h3>
                    <CodeBlock language="text">https://api-dev.youversion.com/v1</CodeBlock>
                  </CardContent>
                </Card>

                {/* Authentication */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-youversion-600" />
                      Authentication & Authorization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="text-lg font-semibold">API Key Authentication</h3>
                    <p>All API requests require an API key in the Authorization header:</p>
                    <CodeBlock language="bash">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
https://api-dev.youversion.com/v1/bibles/206/books/jhn/chapters/3/verses/16`}
                    </CodeBlock>

                    <h3 className="text-lg font-semibold">LAT (Limited Access Token)</h3>
                    <p>For user-specific data, you need a LAT obtained through OAuth login:</p>
                    <CodeBlock language="bash">
{`curl -H "Authorization: Bearer YOUR_LAT" \\
https://api-dev.youversion.com/v1/user/profile`}
                    </CodeBlock>

                    <h3 className="text-lg font-semibold">OAuth Flow</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Register your app and get an App ID</li>
                      <li>Redirect users to YouVersion login</li>
                      <li>Handle callback with authorization code</li>
                      <li>Exchange code for LAT</li>
                    </ol>
                  </CardContent>
                </Card>

                {/* API Endpoints */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-youversion-600" />
                      Core API Endpoints
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bibles Collection</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/bibles</CodeBlock>
                      <p className="text-sm text-muted-foreground">Get all available Bible translations</p>
                      <CodeBlock language="bash">
{`# Get English Bibles
GET /v1/bibles?language_ranges=en*

# Example Response
{
  "data": [
    {
      "id": 206,
      "name": "English Standard Version",
      "abbreviation": "ESV",
      "language": {
        "name": "English",
        "code": "en"
      }
    }
  ]
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bible Details</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/bibles/{'{id}'}</CodeBlock>
                      <p className="text-sm text-muted-foreground">Get specific Bible version details</p>
                      <CodeBlock language="bash">
{`GET /v1/bibles/206

# Response includes books, chapters, metadata`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Books Collection</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/bibles/{'{bible_id}'}/books</CodeBlock>
                      <p className="text-sm text-muted-foreground">List all books in a Bible version</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Chapters Collection</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/bibles/{'{bible_id}'}/books/{'{book_id}'}/chapters</CodeBlock>
                      <p className="text-sm text-muted-foreground">List chapters in a book</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Verses Collection</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/bibles/{'{bible_id}'}/books/{'{book_id}'}/chapters/{'{chapter_id}'}/verses</CodeBlock>
                      <p className="text-sm text-muted-foreground">Get all verses in a chapter</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Specific Verse</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/bibles/{'{bible_id}'}/books/{'{book_id}'}/chapters/{'{chapter_id}'}/verses/{'{verse_id}'}</CodeBlock>
                      <p className="text-sm text-muted-foreground">Get a specific verse</p>
                      <CodeBlock language="json">
{`{
  "reference": "John 3:16",
  "text": "For God so loved the world...",
  "version": "ESV",
  "book": "John",
  "chapter": 3,
  "verse": 16
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Search</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/search?q={'{query}'}</CodeBlock>
                      <p className="text-sm text-muted-foreground">Search Bible content by keyword</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Verse of the Day</h3>
                      <Badge variant="secondary" className="mb-2">GET</Badge>
                      <CodeBlock language="text">/v1/verse-of-the-day</CodeBlock>
                      <p className="text-sm text-muted-foreground">Get the current verse of the day</p>
                    </div>
                  </CardContent>
                </Card>

                {/* SDKs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-youversion-600" />
                      SDK Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Swift SDK (iOS)</h3>
                      <p className="text-sm text-muted-foreground mb-2">Installation via Swift Package Manager:</p>
                      <CodeBlock language="text">https://github.com/youversion/yvp-swift-sdk.git</CodeBlock>
                      
                      <h4 className="font-semibold mt-4">Basic Usage:</h4>
                      <CodeBlock language="swift">
{`import YouVersionPlatform

// Configure
YouVersionPlatform.configure(appKey: "YOUR_APP_KEY")

// Display Scripture
struct DemoView: View {
    @StateObject private var version: BibleVersion
    
    init() {
        _version = StateObject(wrappedValue: BibleVersion(111).readied())
    }

    var body: some View {
        if let ref = version.usfm("JHN.3.16-17") {
            ScrollView {
                BibleTextView(ref)
            }
        }
    }
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">React SDK</h3>
                      <p className="text-sm text-muted-foreground mb-2">Installation:</p>
                      <CodeBlock language="bash">npm install github:youversion/yvp-react-sdk</CodeBlock>
                      
                      <h4 className="font-semibold mt-4">Basic Usage:</h4>
                      <CodeBlock language="tsx">
{`import { 
  YouVersionLoginButton, 
  useYouVersionLogin,
  processLoginCallback 
} from 'yvp-react-sdk';

const Login = () => {
  const { login } = useYouVersionLogin({
    appId: 'YOUR_APP_ID',
    onSuccess: (result) => {
      console.log('LAT:', result.lat);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return <YouVersionLoginButton onClick={login} />;
};`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">JavaScript SDK</h3>
                      <p className="text-sm text-muted-foreground mb-2">Via CDN:</p>
                      <CodeBlock language="html">
{`<script type="module" src="https://api-dev.youversion.com/sdk.js"></script>`}
                      </CodeBlock>
                      
                      <h4 className="font-semibold mt-4">Complete Example:</h4>
                      <CodeBlock language="html">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YouVersion Platform Demo</title>
  <script type="module" src="https://api-dev.youversion.com/sdk.js"></script>
</head>
<body data-youversion-platform-app-id='YOUR_APP_ID_HERE'>
  
  <!-- Sign In with YouVersion -->
  <sign-in-with-youversion-button></sign-in-with-youversion-button>
  
  <!-- Display Bible verse -->
  <bible-text version="111" usfm="JHN.3.16-17"></bible-text>
  
  <!-- Display Verse of the Day -->
  <votd-text version="111"></votd-text>
  
  <!-- Auth event handlers -->
  <script>
    window.onYouVersionAuthComplete = function(authData) {
        // Called when authentication completes successfully
        console.log('Login successful!', authData.token, authData.lat, authData.yvp_user_id);
        // Handle successful login - store token, redirect, update UI, etc.
    };
    
    window.onYouVersionAuthLoad = function(authData) {
        // Called when existing auth data loads
        console.log('Auth data loaded:', authData.token, authData.lat, authData.yvp_user_id);
        // Handle existing authentication state
    };
    
    window.onYouVersionSignOut = function() {
        // Called when user logs out
        console.log('User signed out');
        // Clear user data, update UI, etc.
    };
  </script>
  
</body>
</html>`}
                      </CodeBlock>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Models */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-youversion-600" />
                      Data Models & Schemas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bible Object</h3>
                      <CodeBlock language="json">
{`{
  "id": 206,
  "name": "English Standard Version",
  "abbreviation": "ESV",
  "description": "English Standard Version",
  "language": {
    "id": 1,
    "name": "English",
    "code": "en"
  },
  "countries": [
    {
      "id": 1,
      "name": "United States",
      "code": "US"
    }
  ]
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Book Object</h3>
                      <CodeBlock language="json">
{`{
  "id": "jhn",
  "name": "John",
  "nameLong": "The Gospel According to John",
  "chapters": [
    {
      "id": 1,
      "number": 1,
      "reference": "John 1"
    }
  ]
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Verse Object</h3>
                      <CodeBlock language="json">
{`{
  "id": "JHN.3.16",
  "reference": "John 3:16",
  "text": "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
  "book": {
    "id": "jhn",
    "name": "John"
  },
  "chapter": 3,
  "verse": 16
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">User Profile Object</h3>
                      <CodeBlock language="json">
{`{
  "id": 12345,
  "first_name": "John",
  "last_name": "Doe",
  "avatar_url": "//images.youversion.com/{width}x{height}/user/12345.jpg"
}`}
                      </CodeBlock>
                    </div>
                  </CardContent>
                </Card>

                {/* Error Handling */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-youversion-600" />
                      Error Handling & Status Codes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="text-lg font-semibold">HTTP Status Codes</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>200 OK</strong>: Request successful</li>
                      <li><strong>400 Bad Request</strong>: Invalid request parameters</li>
                      <li><strong>401 Unauthorized</strong>: Invalid or missing API key/LAT</li>
                      <li><strong>403 Forbidden</strong>: Access denied to resource</li>
                      <li><strong>404 Not Found</strong>: Resource not found</li>
                      <li><strong>429 Too Many Requests</strong>: Rate limit exceeded</li>
                      <li><strong>500 Internal Server Error</strong>: Server error</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Error Response Format</h3>
                    <CodeBlock language="json">
{`{
  "error": {
    "code": "INVALID_BIBLE_ID",
    "message": "The specified Bible ID does not exist",
    "details": {
      "bible_id": 999999
    }
  }
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Rate Limiting */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-youversion-600" />
                      Rate Limiting & Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="text-lg font-semibold">Rate Limits</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>1000 requests per hour for authenticated requests</li>
                      <li>100 requests per hour for unauthenticated requests</li>
                      <li>Rate limit headers included in responses</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Best Practices</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Store API keys securely as environment variables</li>
                      <li>Cache responses when possible to reduce API calls</li>
                      <li>Use different keys for development and production</li>
                      <li>Monitor usage in the developer dashboard</li>
                      <li>Implement proper error handling and retry logic</li>
                      <li>Use HTTPS for all requests</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Caching Recommendations</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Bible metadata (bibles, books) - Cache for 24 hours</li>
                      <li>Verse content - Cache for 7 days</li>
                      <li>User profile data - Cache for 1 hour</li>
                      <li>Verse of the Day - Cache until next day</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Integration Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-youversion-600" />
                      Common Integration Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Fetching a Verse</h3>
                      <CodeBlock language="javascript">
{`// Fetch John 3:16 in ESV
const response = await fetch(
  'https://api-dev.youversion.com/v1/bibles/206/books/jhn/chapters/3/verses/16',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Accept': 'application/json'
    }
  }
);

const verse = await response.json();
console.log(verse.text);`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Search for Verses</h3>
                      <CodeBlock language="javascript">
{`// Search for verses containing "love"
const response = await fetch(
  'https://api-dev.youversion.com/v1/search?q=love&bible_id=206',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Accept': 'application/json'
    }
  }
);

const searchResults = await response.json();`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Get User's Highlights (requires LAT)</h3>
                      <CodeBlock language="javascript">
{`// Get user's highlighted verses
const response = await fetch(
  'https://api-dev.youversion.com/v1/user/highlights',
  {
    headers: {
      'Authorization': 'Bearer USER_LAT_TOKEN',
      'Accept': 'application/json'
    }
  }
);

const highlights = await response.json();`}
                      </CodeBlock>
                    </div>
                  </CardContent>
                </Card>

                {/* Webhook Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-youversion-600" />
                      Webhooks & Real-time Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>YouVersion Platform supports webhooks for real-time notifications about user activities:</p>
                    
                    <h3 className="text-lg font-semibold">Available Webhook Events</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>user.highlight.created</strong>: User highlights a verse</li>
                      <li><strong>user.bookmark.created</strong>: User bookmarks a verse</li>
                      <li><strong>user.note.created</strong>: User creates a note</li>
                      <li><strong>user.reading_plan.completed</strong>: User completes reading plan</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Webhook Payload Example</h3>
                    <CodeBlock language="json">
{`{
  "event": "user.highlight.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "user_id": 12345,
  "data": {
    "highlight_id": "abc123",
    "verse_reference": "JHN.3.16",
    "bible_id": 206,
    "color": "yellow"
  }
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                  <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    This documentation provides a comprehensive overview of the YouVersion Platform for LLMs. For the most up-to-date information, always refer to the official API documentation and SDK repositories.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ForLLMs;