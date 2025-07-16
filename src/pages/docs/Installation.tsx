import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Smartphone, Globe, Code, Zap } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import Footer from '@/components/layout/Footer';
import CodeBlock from '@/components/ui/code-block';

const SDKs = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <DocsSidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">SDKs</h1>
                <p className="text-xl text-muted-foreground">
                  Complete documentation and code examples for integrating the YouVersion Platform into your application.
                </p>
              </div>

              {/* Platform Tabs */}
              <Tabs defaultValue="ios" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ios">Swift</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                  <TabsTrigger value="web">Javascript</TabsTrigger>
                </TabsList>

                {/* Swift SDK */}
                <TabsContent value="ios" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-[#FF3D4D]" />
                        Swift SDK
                      </CardTitle>
                      <CardDescription>
                        Add the YouVersion Platform SDK to your iOS project using Swift Package Manager.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Swift Package Manager</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          1. Register your app with YouVersion Platform and acquire an app key<br/>
                          2. In Xcode, go to File → Add Package Dependencies<br/>
                          3. Add the repository URL and select "Up to Next Major Version"
                        </p>
                        <CodeBlock language="text">
                          {`https://github.com/youversion/yvp-swift-sdk.git`}
                        </CodeBlock>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">App Configuration</h3>
                        <CodeBlock language="swift">
{`import YouVersionPlatform

@main
struct YourApp: App {
    init() {
        YouVersionPlatform.configure(appKey: "YOUR_APP_KEY_HERE")
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`}
                        </CodeBlock>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Displaying Scripture in SwiftUI</h3>
                        <CodeBlock language="swift">
{`import YouVersionPlatform

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
                        <h3 className="font-semibold mb-2">Login Implementation</h3>
                        <CodeBlock language="swift">
{`import YouVersionPlatform
import AuthenticationServices

class ContextProvider: NSObject, ASWebAuthenticationPresentationContextProviding {
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        guard let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let window = scene.windows.first else {
            return ASPresentationAnchor()
        }
        return window
    }
}

struct LoginView: View {
    @State private var contextProvider = ContextProvider()
    
    var body: some View {
        LoginWithYouVersionButton() {
            YouVersionPlatform.login(
                contextProvider: contextProvider,
                required: [.bibles],
                optional: [.highlights]
            ) { result in
                switch result {
                case .success(let info):
                    print("Login successful: \\(info)")
                    // Save the LAT locally for API calls
                case .failure(let error):
                    print("Login failed: \\(error)")
                }
            }
        }
    }
}`}
                        </CodeBlock>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Fetching User Data</h3>
                        <CodeBlock language="swift">
{`private func loadUserData(lat: String) {
    Task {
        do {
            let info = try await YouVersionPlatform.fetchUserInfo(lat: lat)
            self.userWelcome = "Welcome, \\(info.firstName)!"
            
            let votd = try await YouVersionPlatform.fetchVerseOfTheDay(
                lat: lat, 
                translation: 1
            )
            self.votdTitle = "\\(votd.reference) (\\(votd.translation))"
            self.votdText = votd.text
            self.votdCopyright = votd.copyright
        } catch {
            print("Error loading user data: \\(error)")
        }
    }
}`}
                        </CodeBlock>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>


                {/* React SDK */}
                <TabsContent value="react" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-[#FF3D4D]" />
                        React SDK
                      </CardTitle>
                      <CardDescription>
                        Official React SDK for YouVersion Platform authentication and user data.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h2 className="font-semibold mb-2 text-lg">Installation</h2>
                        <p className="text-sm text-muted-foreground mb-2">You can install this package directly from its GitHub repository.</p>
                        <h3 className="font-semibold mb-1">Standard Method</h3>
                        <p className="text-sm text-muted-foreground mb-2">In your project's terminal, run:</p>
                        <CodeBlock language="bash">{`npm install github:youversion/yvp-react-sdk`}</CodeBlock>
                        <h3 className="font-semibold mb-1 mt-4">Alternative Method (for CI/CD or Build Tools)</h3>
                        <p className="text-sm text-muted-foreground mb-2">Some build environments (like Docker containers, Netlify, Vercel, or other no-code platforms) may not have SSH configured. If the command above fails with an SSH error, use the <code>git+https</code> URL instead:</p>
                        <CodeBlock language="bash">{`npm install git+https://github.com/youversion/yvp-react-sdk.git`}</CodeBlock>
                        <h3 className="font-semibold mb-1 mt-4">A Note on Imports</h3>
                        <p className="text-sm text-muted-foreground mb-2">When you install directly from GitHub, the package name is taken from the <code>package.json</code> file, not from a scoped NPM registry name. Therefore, your import statements should use <code>yvp-react-sdk</code>:</p>
                        <CodeBlock language="tsx">{`// Correct import\nimport { useYouVersionLogin } from 'yvp-react-sdk';\n\n// Incorrect import\nimport { useYouVersionLogin } from '@youversion/yvp-react-sdk'; // This will not work`}</CodeBlock>
                      </div>
                      <div>
                        <h2 className="font-semibold mb-2 text-lg mt-6">How to Use</h2>
                        <p className="text-sm text-muted-foreground mb-2">The SDK is designed to be straightforward. The two main parts you'll use together are:</p>
                        <ol className="list-decimal ml-6 mt-1 text-sm text-muted-foreground">
                          <li><code>YouVersionLoginButton</code>: A pre-styled "Sign in with YouVersion" button component.</li>
                          <li><code>useYouVersionLogin</code>: A React hook that provides the <code>login</code> function for the button and handles the <code>onSuccess</code> and <code>onError</code> callbacks.</li>
                        </ol>
                        <h3 className="font-semibold mb-1 mt-4">Step 1: Add the Login Button</h3>
                        <p className="text-sm text-muted-foreground mb-2">In the component where you want your login button, import <code>YouVersionLoginButton</code> and <code>useYouVersionLogin</code>. Use the hook to get a <code>login</code> function, and pass that function to the button's <code>onClick</code> prop.</p>
                        <CodeBlock language="tsx">{`// src/components/Login.tsx\nimport React, { useState } from 'react';\nimport {\n  YouVersionLoginButton,\n  useYouVersionLogin,\n  LoginSuccess,\n  LoginError,\n} from 'yvp-react-sdk';\n\nconst Login = () => {\n  const [loginData, setLoginData] = useState<LoginSuccess | null>(null);\n  const [error, setError] = useState<LoginError | null>(null);\n\n  const { login } = useYouVersionLogin({\n    appId: 'YOUR_YVP_APP_ID', // Replace with your app_id from YVP\n    onSuccess: (result) => {\n      setLoginData(result);\n      setError(null);\n      console.log('Login successful! You can now use the LAT:', result.lat);\n    },\n    onError: (error) => {\n      setError(error);\n      console.error('Login failed:', error);\n    },\n  });\n\n  return (\n    <div>\n      <h2>Sign In</h2>\n      {loginData ? (\n        <div>\n          <p>Welcome! You are logged in.</p>\n        </div>\n      ) : (\n        <YouVersionLoginButton onClick={login} />\n      )}\n      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}\n    </div>\n  );\n};\n\nexport default Login;`}</CodeBlock>
                        <h3 className="font-semibold mb-1 mt-4">Step 2: Handle the Login Callback</h3>
                        <p className="text-sm text-muted-foreground mb-2">YouVersion will redirect the user to a specific callback URL after they log in. You need to create a page in your application to handle this redirect.</p>
                        <p className="text-sm text-muted-foreground mb-2"><strong>Important:</strong> You must register this callback URL (e.g., <code>http://localhost:3000/callback</code>) in your app's settings on the YouVersion Platform developer portal.</p>
                        <p className="text-sm text-muted-foreground mb-2">Create a simple component for your callback route that calls the <code>processLoginCallback</code> function.</p>
                        <CodeBlock language="tsx">{`// src/pages/Callback.tsx\nimport React, { useEffect } from 'react';\nimport { processLoginCallback } from 'yvp-react-sdk';\n\nconst CallbackPage = () => {\n  useEffect(() => {\n    // This function handles communication with the main window and closes the popup.\n    processLoginCallback();\n  }, []);\n\n  return <p>Processing login, please wait...</p>;\n};\n\nexport default CallbackPage;`}</CodeBlock>
                        <h3 className="font-semibold mb-1 mt-4">Step 3: Set Up Your Routes</h3>
                        <p className="text-sm text-muted-foreground mb-2">Make sure your application's router is set up to render the <code>CallbackPage</code> component at the correct path. Here is an example using <code>react-router-dom</code>:</p>
                        <CodeBlock language="tsx">{`// src/App.tsx\nimport React from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport Login from './components/Login';\nimport CallbackPage from './pages/Callback';\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path="/login" element={<Login />} />\n        <Route path="/callback" element={<CallbackPage />} />\n        {/* Other routes... */}\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;`}</CodeBlock>
                        <h3 className="font-semibold mb-1 mt-4">Step 4 (Optional): Fetching User Data</h3>
                        <p className="text-sm text-muted-foreground mb-2">Once you have a <code>lat</code> (Limited Access Token) from a successful login, you can use the included <code>fetchUserProfile</code> helper function to get the user's details.</p>
                        <CodeBlock language="tsx">{`import { fetchUserProfile, UserProfile, LoginSuccess } from 'yvp-react-sdk';\nimport { useState } from 'react';\n\n// ... inside your component ...\n\nconst [user, setUser] = useState<UserProfile | null>(null);\n\nconst handleLoginSuccess = async (loginData: LoginSuccess) => {\n  try {\n    const profile = await fetchUserProfile(loginData.lat);\n    setUser(profile);\n    console.log('User profile:', profile);\n  } catch (e) {\n    console.error("Failed to fetch user profile:", e);\n  }\n}`}</CodeBlock>
                        <p className="text-sm text-muted-foreground mb-2">This will return a <code>UserProfile</code> object:</p>
                        <CodeBlock language="ts">{`interface UserProfile {\n  id: number;\n  first_name: string;\n  last_name: string;\n  avatar_url: string; // A URL template, e.g. "//.../{width}x{height}/...jpg"\n}`}</CodeBlock>
                        <h3 className="font-semibold mb-1 mt-4">Running the Demo App</h3>
                        <p className="text-sm text-muted-foreground mb-2">This repository includes a functional demo application in the <code>/example</code> directory that demonstrates a complete implementation.</p>
                        <ol className="list-decimal ml-6 mt-1 text-sm text-muted-foreground">
                          <li>Navigate to the <code>/example</code> directory: <code>cd example</code></li>
                          <li>Install dependencies: <code>npm install</code></li>
                          <li>Start the development server: <code>npm start</code></li>
                        </ol>
                        <p className="text-sm text-muted-foreground mb-2">The demo will open at <code>http://localhost:3000</code>.</p>
                        <h3 className="font-semibold mb-1 mt-4">Adding to package.json directly</h3>
                        <p className="text-sm text-muted-foreground mb-2">Instead of running <code>npm install</code> you can declare the dependency in your <strong>package.json</strong> like this:</p>
                        <CodeBlock language="json">{`{\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-dom": "^18.0.0",\n    "yvp-react-sdk": "git+https://github.com/youversion/yvp-react-sdk.git"\n  }\n}`}</CodeBlock>
                        <p className="text-sm text-muted-foreground mb-2">Then run <code>npm install</code> and the SDK will be pulled from GitHub using HTTPS.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Javascript SDK */}
                <TabsContent value="web" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-[#FF3D4D]" />
                        Javascript SDK
                      </CardTitle>
                      <CardDescription>
                        A lightweight JavaScript SDK for integrating YouVersion Platform features into web applications.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Features:</strong>
                          <ul className="list-disc ml-6 mt-1">
                            <li>Bible Text: Display Bible verses with version support</li>
                            <li>Verse of the Day: Show the daily verse</li>
                            <li>Login: YouVersion OAuth login functionality</li>
                          </ul>
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Installation</h3>
                        <p className="text-sm text-muted-foreground mb-2">Via CDN</p>
                        <CodeBlock language="html">
{`<script type="module" src="https://api-dev.youversion.com/sdk.js"></script>`}
                        </CodeBlock>
                        {/*
                        <p className="text-sm text-muted-foreground mb-2">Via NPM (coming soon)</p>
                        <CodeBlock language="bash">
{`npm install @youversion/yvp-javascript-sdk`}
                        </CodeBlock>
                        */}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Add App ID</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Get your App ID from your friendly neighborhood YouVersion Platform representative.<br/>
                          The App ID is not a secret and can be exposed in your code.<br/>
                          Add the App ID to your page either on the body element or in a script tag:
                        </p>
                        <CodeBlock language="html">
{`<body data-youversion-platform-app-id='YOUR_APP_ID'>`}
                        </CodeBlock>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Display a Bible verse</h3>
                        <CodeBlock language="html">
{`<bible-text usfm="JHN.3.16" version="111"></bible-text>`}
                        </CodeBlock>
                        <p className="text-sm text-muted-foreground mb-2">Or for a range:</p>
                        <CodeBlock language="html">
{`<bible-text usfm="JHN.3.16-JHN.3.17" version="111"></bible-text>`}
                        </CodeBlock>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Display the Verse of the Day</h3>
                        <CodeBlock language="html">
{`<votd-text version="111"></votd-text>`}
                        </CodeBlock>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Add a Login Button</h3>
                        <CodeBlock language="html">
{`<youversion-login-button></youversion-login-button>`}
                        </CodeBlock>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Development</h3>
                        <ol className="list-decimal ml-6 mt-1 text-sm text-muted-foreground">
                          <li>Install dependencies:
                            <CodeBlock language="bash">
{`npm install`}
                            </CodeBlock>
                          </li>
                          <li>Build the SDK:
                            <CodeBlock language="bash">
{`npm run build`}
                            </CodeBlock>
                          </li>
                          <li>Deploy to GCP (requires gcloud CLI and permissions):
                            <CodeBlock language="bash">
{`chmod +x deploy.sh\n./deploy.sh`}
                            </CodeBlock>
                          </li>
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      </div>
    </SidebarProvider>
  );
};

export default SDKs;
