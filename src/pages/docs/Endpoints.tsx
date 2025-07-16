import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Endpoints = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">API Endpoints</h1>
                <p className="text-xl text-muted-foreground">
                  Complete reference for all YouVersion Platform API endpoints
                </p>
              </div>

              {/* Bibles Endpoints */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Bible Endpoints</CardTitle>
                  <CardDescription>
                    Access Bible versions, books, chapters, and verses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Get Bibles Collection */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a collection of Bibles based on given parameters.
                    </p>
                  </div>

                  {/* Get Bible by ID */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles/{`{version_id}`}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a Bible resource by its id.
                    </p>
                  </div>

                  {/* Get Books */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles/{`{version_id}`}/books</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a collection of Books for the given Bible.
                    </p>
                  </div>

                  {/* Get Book by USFM */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a Book resource by its USFM identifier.
                    </p>
                  </div>

                  {/* Get Chapters */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a collection of Chapters for the given Bible and Book.
                    </p>
                  </div>

                  {/* Get Chapter by USFM */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters/{`{chapter_usfm}`}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a Chapter resource by its USFM identifier.
                    </p>
                  </div>

                  {/* Get Verses */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters/{`{chapter_usfm}`}/verses</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a collection of Verses by the USFM identifiers.
                    </p>
                  </div>

                  {/* Get Verse by USFM */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters/{`{chapter_usfm}`}/verses/{`{verse_usfm}`}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a Verse resource for a version by its USFM identifiers.
                    </p>
                  </div>

                </CardContent>
              </Card>

              {/* Base URL and Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Base URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-sm font-mono">https://transformers-446696173378.us-central1.run.app</code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    All API endpoints should be prefixed with this base URL.
                  </p>
                </CardContent>
              </Card>

              {/* Response Schemas */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Schemas</CardTitle>
                  <CardDescription>
                    Data models returned by the API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm">Bible</h4>
                      <p className="text-xs text-muted-foreground">Bible version resource</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm">Book</h4>
                      <p className="text-xs text-muted-foreground">Bible book resource</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm">Chapter</h4>
                      <p className="text-xs text-muted-foreground">Bible chapter resource</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm">Verse</h4>
                      <p className="text-xs text-muted-foreground">Bible verse resource</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm">BibleLanguage</h4>
                      <p className="text-xs text-muted-foreground">Language metadata</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm">HTTPValidationError</h4>
                      <p className="text-xs text-muted-foreground">Error response</p>
                    </div>
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

export default Endpoints;