import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeBlock from "@/components/ui/code-block";

interface ApiCall {
  id: string;
  title: string;
  description: string;
  url: string;
  requiresLat?: boolean;
}

const CALLS: ApiCall[] = [
  {
    id: "bibleVersions",
    title: "/bible/versions",
    description: "List Bible versions that your application can access.",
    url: "https://api-dev.youversion.com/bible/versions",
  },
  {
    id: "bibleVersion",
    title: "/bible/version?version=1",
    description: "Get details for a specific Bible version (KJV in this example).",
    url: "https://api-dev.youversion.com/bible/version?version=1",
  },
  {
    id: "biblePassage",
    title: "/bible/passage?version=206&usfm=JHN.4.34",
    description:
      "Retrieve the passage for John 4:34 using version 206 (WEBUS).",
    url: "https://api-dev.youversion.com/bible/passage?version=206&usfm=JHN.4.34",
  },
  {
    id: "votdToday",
    title: "/votd/today",
    description: "Get the Verse of the Day reference.",
    url: "https://api-dev.youversion.com/votd/today",
  },
  {
    id: "votdText",
    title: "/votd/today?version=1",
    description: "Get the Verse of the Day with text (KJV in this example).",
    url: "https://api-dev.youversion.com/votd/today?version=1",
  },
  {
    id: "authMe",
    title: "/auth/me",
    description:
      "Get information about the authenticated user (requires LAT).",
    url: "https://api-dev.youversion.com/auth/me?lat=$YVP_LAT",
    requiresLat: true,
  },
  {
    id: "highlightsChapter",
    title: "/highlights/chapter",
    description:
      "Get highlights in John 3 for the authenticated user (requires LAT).",
    url: "https://api-dev.youversion.com/highlights/chapter?lat=$YVP_LAT&version=111&usfm=JHN.3",
    requiresLat: true,
  },
  {
    id: "highlightsLatest",
    title: "/highlights/latest",
    description:
      "Get the user's latest highlights (requires LAT).",
    url: "https://api-dev.youversion.com/highlights/latest?lat=$YVP_LAT",
    requiresLat: true,
  },
];

const Examples: React.FC = () => {
  const [appId, setAppId] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const runCall = async (call: ApiCall) => {
    if (!appId) {
      alert("Please enter your App ID first.");
      return;
    }
    if (call.requiresLat && !lat) {
      alert("This request requires a LAT. Please enter your LAT first.");
      return;
    }

    const url = call.url.replace("$YVP_LAT", encodeURIComponent(lat));

    const controller = new AbortController();
    setLoadingIds((prev) => new Set(prev).add(call.id));

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "X-App-ID": appId,
        },
        signal: controller.signal,
      });

      const text = await res.text();
      let formatted: string;
      try {
        formatted = JSON.stringify(JSON.parse(text), null, 2);
      } catch (e) {
        // Not JSON – just show raw text
        formatted = text;
      }

      setResponses((prev) => ({ ...prev, [call.id]: formatted }));
    } catch (error: any) {
      setResponses((prev) => ({
        ...prev,
        [call.id]: `Error: ${error?.message ?? "Unknown error"}`,
      }));
    } finally {
      setLoadingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(call.id);
        return copy;
      });
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Interactive API Explorer</h1>
          <p className="text-muted-foreground text-lg">
            Enter your YouVersion Platform <code>App&nbsp;ID</code> (and optional
            <code className="ml-1">LAT</code>) to run the sample commands below
            and inspect their live responses.
          </p>
        </div>

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
              <label className="block mb-1 font-medium">App&nbsp;ID</label>
              <Input
                placeholder="1234abcd..."
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">LAT (optional)</label>
              <Input
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Calls */}
        <div className="grid md:grid-cols-2 gap-6">
          {CALLS.map((call) => {
            const curlCommand = `curl -s -H \"X-App-ID: ${
              appId || "$YVP_APP_ID"
            }\" '${call.url.replace("$YVP_LAT", lat || "$YVP_LAT")}'`;

            return (
              <Card key={call.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{call.title}</CardTitle>
                  <CardDescription>{call.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                  <CodeBlock language="bash">{curlCommand}</CodeBlock>

                  <Button
                    size="sm"
                    onClick={() => runCall(call)}
                    disabled={loadingIds.has(call.id)}
                  >
                    {loadingIds.has(call.id) ? "Running…" : "Run"}
                  </Button>

                  {responses[call.id] && (
                    <CodeBlock
                      language="json"
                      copyable={false}
                      className="max-h-96 overflow-y-auto"
                    >
                      {responses[call.id]}
                    </CodeBlock>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Examples;