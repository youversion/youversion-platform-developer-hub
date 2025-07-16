import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
const Endpoints = () => {
  return <SidebarProvider>
      <div className="flex w-full" style={{
      height: 'calc(100vh - 64px)'
    }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">API Endpoints</h1>
                <p className="text-xl text-muted-foreground">PLACE SWAGGER DOCS HERE
Complete reference for all YouVersion Platform API endpoints</p>
              </div>

              {/* Base URL */}
              <Card className="mb-6">
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

              {/* Bible Endpoints with Accordions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Bible Endpoints</CardTitle>
                  <CardDescription>
                    Access Bible versions, books, chapters, and verses through these endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    
                    <AccordionItem value="bibles-collection">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a collection of Bibles based on given parameters.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Full URL:</h4>
                            <code className="text-sm">https://transformers-446696173378.us-central1.run.app/v1/bibles</code>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="bible-resource">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles/{`{version_id}`}</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a Bible resource by its id.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Path Parameters:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li><code>version_id</code> - The unique identifier for the Bible version</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="books-collection">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles/{`{version_id}`}/books</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a collection of Books for the given Bible.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Path Parameters:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li><code>version_id</code> - The unique identifier for the Bible version</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="book-resource">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a Book resource by its USFM identifier.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Path Parameters:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li><code>version_id</code> - The unique identifier for the Bible version</li>
                              <li><code>book_usfm</code> - The USFM identifier for the book (e.g., "GEN", "EXO")</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="chapters-collection">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a collection of Chapters for the given Bible and Book.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Path Parameters:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li><code>version_id</code> - The unique identifier for the Bible version</li>
                              <li><code>book_usfm</code> - The USFM identifier for the book</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="chapter-resource">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters/{`{chapter_usfm}`}</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a Chapter resource by its USFM identifier.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Path Parameters:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li><code>version_id</code> - The unique identifier for the Bible version</li>
                              <li><code>book_usfm</code> - The USFM identifier for the book</li>
                              <li><code>chapter_usfm</code> - The USFM identifier for the chapter</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="verses-collection">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters/{`{chapter_usfm}`}/verses</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a collection of Verses by the USFM identifiers.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Path Parameters:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li><code>version_id</code> - The unique identifier for the Bible version</li>
                              <li><code>book_usfm</code> - The USFM identifier for the book</li>
                              <li><code>chapter_usfm</code> - The USFM identifier for the chapter</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="verse-resource">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">GET</Badge>
                          <code className="text-sm font-mono">/v1/bibles/{`{version_id}`}/books/{`{book_usfm}`}/chapters/{`{chapter_usfm}`}/verses/{`{verse_usfm}`}</code>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Get a Verse resource for a version by its USFM identifiers.
                          </p>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Path Parameters:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li><code>version_id</code> - The unique identifier for the Bible version</li>
                              <li><code>book_usfm</code> - The USFM identifier for the book</li>
                              <li><code>chapter_usfm</code> - The USFM identifier for the chapter</li>
                              <li><code>verse_usfm</code> - The USFM identifier for the verse</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </CardContent>
              </Card>

              {/* Response Schemas */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Response Schemas</CardTitle>
                  <CardDescription>
                    Data models returned by the API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    
                    <AccordionItem value="bible-schema">
                      <AccordionTrigger>Bible</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Bible version resource containing metadata about a specific Bible translation.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="book-schema">
                      <AccordionTrigger>Book</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Bible book resource containing information about a specific book within a Bible version.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="chapter-schema">
                      <AccordionTrigger>Chapter</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Bible chapter resource containing information about a specific chapter within a book.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="verse-schema">
                      <AccordionTrigger>Verse</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Bible verse resource containing the actual text content and metadata for a specific verse.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="language-schema">
                      <AccordionTrigger>BibleLanguage</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Language metadata including language code, name, and regional information.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="error-schema">
                      <AccordionTrigger>HTTPValidationError</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Error response format returned when request validation fails.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>;
};
export default Endpoints;