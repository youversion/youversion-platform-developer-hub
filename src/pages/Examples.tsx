import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import CodeBlock from "@/components/ui/code-block";
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import Footer from '@/components/layout/Footer';
import { APP_ID } from '@/lib/constants';
interface ApiCall {
  id: string;
  title: string;
  description: string;
  url: string;
  requiresLat?: boolean;
}
const CALLS: ApiCall[] = [{
  id: "biblesCollection",
  title: "/v1/bibles?language_ranges=en*",
  description: "Get a collection of Bibles for all regions & variants of the English language.",
  url: "https://api-dev.youversion.com/v1/bibles?language_ranges=en*"
}, {
  id: "bibleResource",
  title: "/v1/bibles/206",
  description: "Get details for Bible version.",
  url: "https://api-dev.youversion.com/v1/bibles/206"
}, {
  id: "bibleBooksCollection",
  title: "/v1/bibles/206/books",
  description: "List books for Bible version 206.",
  url: "https://api-dev.youversion.com/v1/bibles/206/books"
}, {
  id: "bibleBooksResource",
  title: "/v1/bibles/206/books/mat",
  description: "Get details for the book MAT in version 206 (e.g. Matthew).",
  url: "https://api-dev.youversion.com/v1/bibles/206/books/mat"
}, {
  id: "bibleBooksChaptersCollection",
  title: "/v1/bibles/206/books/mat/chapters",
  description: "List chapters for Matthew in the Bible version 206.",
  url: "https://api-dev.youversion.com/v1/bibles/206/books/mat/chapters"
}, {
  id: "bibleBooksChaptersResource",
  title: "/v1/bibles/206/books/mat/chapters/1",
  description: "Get details for the first chapter in the book of Matthew in Bible version 206.",
  url: "https://api-dev.youversion.com/v1/bibles/206/books/mat/chapters/1"
}, {
  id: "bibleBooksChaptersVersesCollection",
  title: "/v1/bibles/206/books/mat/chapters/1/verses",
  description: "List verses for the first chapter in the book of Matthew in Bible version 206.",
  url: "https://api-dev.youversion.com/v1/bibles/206/books/mat/chapters/1/verses"
}, {
  id: "bibleBooksChaptersVersesResource",
  title: "/v1/bibles/206/books/mat/chapters/1/verses/1",
  description: "Get details for the a verse in the first chapter of Matthew in the Bible version 206.",
  url: "https://api-dev.youversion.com/v1/bibles/206/books/mat/chapters/1/verses/1"
}, {
  id: "bibleVersions",
  title: "/bible/versions",
  description: "List Bible versions that your application can access.",
  url: "https://api-dev.youversion.com/bible/versions"
}, {
  id: "bibleVersion",
  title: "/bible/version?version=206",
  description: "Get details for a specific Bible version (KJV in this example).",
  url: "https://api-dev.youversion.com/bible/version?version=206"
}, {
  id: "biblePassage",
  title: "/bible/passage?version=206&usfm=JHN.4.34",
  description: "Retrieve the passage for John 4:34 using version 206 (WEBUS).",
  url: "https://api-dev.youversion.com/bible/passage?version=206&usfm=JHN.4.34"
}, {
  id: "votdToday",
  title: "/votd/today",
  description: "Get the Verse of the Day reference.",
  url: "https://api-dev.youversion.com/votd/today"
}, {
  id: "votdText",
  title: "/votd/today?version=206",
  description: "Get the Verse of the Day with text (KJV in this example).",
  url: "https://api-dev.youversion.com/votd/today?version=206"
}, {
  id: "authMe",
  title: "/auth/me",
  description: "Get information about the authenticated user (requires LAT).",
  url: "https://api-dev.youversion.com/auth/me?lat=$YVP_LAT",
  requiresLat: true
}, {
  id: "highlightsChapter",
  title: "/highlights/chapter",
  description: "Get highlights in John 3 for the authenticated user (requires LAT).",
  url: "https://api-dev.youversion.com/highlights/chapter?lat=$YVP_LAT&version=206&usfm=JHN.3",
  requiresLat: true
}, {
  id: "highlightsLatest",
  title: "/highlights/latest",
  description: "Get the user's latest highlights (requires LAT).",
  url: "https://api-dev.youversion.com/highlights/latest?lat=$YVP_LAT",
  requiresLat: true
}];
const Examples: React.FC = () => {

  const [lat, setLat] = useState<string>("");
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  // Check for a LAT in local storage on initial load
  useEffect(() => {
    const storedLat = localStorage.getItem('yvp_lat');
    if (storedLat) {
      setLat(storedLat);
      // Optional: clear the LAT from storage after using it
      // localStorage.removeItem('yvp_lat');
    }
  }, []);

  // Load the YouVersion Platform SDK and wire up auth callbacks
  useEffect(() => {
    if (!document.querySelector('script[src="https://api-dev.youversion.com/sdk.js"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://api-dev.youversion.com/sdk.js";
      document.head.appendChild(script);
    }

    // Assign auth callback handlers expected by the SDK
    (window as any).onYouVersionAuthComplete = (authData: any) => {
      console.log("Login successful!", authData);
      if (authData?.lat) {
        setLat(authData.lat);
      }
    };

    (window as any).onYouVersionAuthLoad = (authData: any) => {
      console.log("Auth data loaded:", authData);
    };

    (window as any).onYouVersionSignOut = () => {
      console.log("User logged out");
      setLat("");
    };
  }, []);

  // Keep the app ID in sync with the data attribute the SDK relies on
  useEffect(() => {
          if (APP_ID) {
        document.body.dataset.youversionPlatformAppId = APP_ID;
    } else {
      delete (document.body.dataset as any).youversionPlatformAppId;
    }
      }, [APP_ID]);

  const runCall = async (call: ApiCall) => {
    if (call.requiresLat && !lat) {
      alert("This request requires a LAT. Please enter your LAT first.");
      return;
    }
    const url = call.url.replace("$YVP_LAT", encodeURIComponent(lat));
    const controller = new AbortController();
    setLoadingIds(prev => new Set(prev).add(call.id));
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "X-App-ID": "r4JBXiG5GAIbxQOBdhAw8k2yikjeE17l4nZ14FLEPIZLmGtN",
          "x-yv-iid": "install_id_example"
        },
        signal: controller.signal
      });
      const text = await res.text();
      let formatted: string;
      try {
        formatted = JSON.stringify(JSON.parse(text), null, 2);
      } catch (e) {
        // Not JSON – just show raw text
        formatted = text;
      }
      setResponses(prev => ({
        ...prev,
        [call.id]: formatted
      }));
    } catch (error: any) {
      setResponses(prev => ({
        ...prev,
        [call.id]: `Error: ${error?.message ?? "Unknown error"}`
      }));
    } finally {
      setLoadingIds(prev => {
        const copy = new Set(prev);
        copy.delete(call.id);
        return copy;
      });
    }
  };
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <DocsSidebar />
        <div className="flex-1 canvas-primary flex flex-col">
          <div className="flex-1">
          <div className="container py-12">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="mb-6">
                {/* @ts-ignore – custom web component from the YouVersion SDK */}
                <sign-in-with-youversion-button></sign-in-with-youversion-button>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-4">Interactive API Explorer</h1>
                <p className="text-muted-foreground text-lg">
                  Enter your YouVersion Platform <code>App&nbsp;ID</code> (and optional
                  <code className="ml-1">LAT</code>) to run the sample commands below
                  and inspect their live responses. <br></br><b>HACKATHON NOTE:</b> Get your "Limited Access Token" (LAT) by going to the <a href="https://lifechurch.gitlab.io/youversion/apis/platform/yvp-login-flutter/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">following link</a> and click "Log in with YouVersion"; don't change other fields. Copy the "lat" value from the Auth response.
                </p>
              </div>

              {/* Warning notification */}
              <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  Should be moved to API reference
                </AlertDescription>
              </Alert>

              {/* Credentials */}
              <Card>
                <CardHeader>
                  <CardTitle>Credentials</CardTitle>
                  <CardDescription>
                    Provide the values that will be used for all API requests.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Limited Access Token (LAT) (optional)</label>
                    <Input placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." value={lat} onChange={e => setLat(e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              {/* Calls */}
              <div className="grid md:grid-cols-2 gap-6">
                {CALLS.map(call => {
                const curlCommand = `curl -s -H \"X-App-ID: r4JBXiG5GAIbxQOBdhAw8k2yikjeE17l4nZ14FLEPIZLmGtN\" -H \"x-yv-iid: install_id_example\" '${call.url.replace("$YVP_LAT", lat || "$YVP_LAT")}'`;
                return <Card key={call.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{call.title}</CardTitle>
                        <CardDescription>{call.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4 flex-1">
                        <CodeBlock language="bash">{curlCommand}</CodeBlock>

                        <Button size="sm" onClick={() => runCall(call)} disabled={loadingIds.has(call.id)}>
                          {loadingIds.has(call.id) ? "Running…" : "Run"}
                        </Button>

                        {responses[call.id] && <CodeBlock language="json" copyable={false} className="max-h-96 overflow-y-auto">
                            {responses[call.id]}
                          </CodeBlock>}
                      </CardContent>
                    </Card>;
              })}
              </div>
            </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};
export default Examples;