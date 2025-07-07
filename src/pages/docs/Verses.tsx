import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Hash, Globe, Brackets } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/layout/DocsSidebar';
import CodeBlock from '@/components/ui/code-block';

const Verses = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ height: 'calc(100vh - 64px)' }}>
        <DocsSidebar />
        <div className="flex-1 canvas-primary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Verses API</h1>
                <p className="text-xl text-muted-foreground">
                  Access chapters, verses, or passages from a Bible version.
                </p>
                <div className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs mt-2">
                  For a full list of valid book identifiers, see
                  <a
                    href="/docs/usfm-reference"
                    className="underline ml-1"
                  >
                    USFM Book Identifiers
                  </a>.
                </div>
              </div>

              {/* Single Verse */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-youversion-600" />
                    Single Verse
                  </CardTitle>
                  <CardDescription>
                    Retrieve a single verse.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -H "X-App-ID: YOUR_APP_ID" 'https://api-dev.youversion.com/v1/bibles/206/books/mat/chapters/1/verses/1'`}
                  </CodeBlock>
                  <div className="text-xs text-muted-foreground mb-1">Response:</div>
                  <CodeBlock language="json">
{`{
  "usfm": "MAT.1.1",
  "reference": "Matthew 1:1",
  "content": "<div class=\"version vid206 iso6393eng\" data-vid=\"206\" data-iso6393=\"eng\">\n   <div class=\"book bkMAT\">\n      <div class=\"chapter ch1\" data-usfm=\"MAT.1.1\">\n         <div class=\"p\"><span class=\"verse v1\" data-usfm=\"MAT.1.1\"><span class=\"label\">1</span><span class=\"content\">The book of the genealogy of Jesus Christ,</span><span class=\"note f\"><span class=\"label\">#</span><span class=\" body\"><span class=\"fr\">1:1 </span><span class=\"ft\">Messiah (Hebrew) and Christ (Greek) both mean &#8220;Anointed One&#8221;</span></span></span><span class=\"content\"> the son of David, the son of Abraham.</span></span></div><div class=\"p\"><span class=\"verse v1\" data-usfm=\"MAT.1.1\"><span class=\"content\">  </span></span></div>\n      </div>\n   </div>\n</div>"
}`}
                  </CodeBlock>
                </CardContent>
              </Card>

              {/* Entire Chapter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-youversion-600" />
                    Entire Chapter
                  </CardTitle>
                  <CardDescription>
                    Retrieve all verses in a chapter.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock language="bash">
{`curl -s -H "X-App-ID: YOUR-APP-ID" 'https://api-dev.youversion.com/v1/bibles/206/books/mat/chapters/1/verses'`}
                  </CodeBlock>
                  <div className="text-xs text-muted-foreground mb-1">Response:</div>
                  <CodeBlock language="json">
{`{
  "data": [
    {
      "usfm": "MAT.1.1",
      "reference": "Matthew 1:1",
      "content": "<div class=\"version vid206 iso6393eng\" data-vid=\"206\" data-iso6393=\"eng\">\n   <div class=\"book bkMAT\">\n      <div class=\"chapter ch1\" data-usfm=\"MAT.1.1\">\n         <div class=\"p\"><span class=\"verse v1\" data-usfm=\"MAT.1.1\"><span class=\"label\">1</span><span class=\"content\">The book of the genealogy of Jesus Christ,</span><span class=\"note f\"><span class=\"label\">#</span><span class=\" body\"><span class=\"fr\">1:1 </span><span class=\"ft\">Messiah (Hebrew) and Christ (Greek) both mean &#8220;Anointed One&#8221;</span></span></span><span class=\"content\"> the son of David, the son of Abraham.</span></span></div><div class=\"p\"><span class=\"verse v1\" data-usfm=\"MAT.1.1\"><span class=\"content\">  </span></span></div>\n      </div>\n   </div>\n</div>"
    },
    // ...more verses...
  ],
  "next_page_token": "26"
}`}
                  </CodeBlock>
                </CardContent>
              </Card>
              {/* Passage (Alternate Endpoint) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-youversion-600" />
                    Passage Endpoint
                  </CardTitle>
                  <CardDescription>
                    Retrieve a passage using the alternate <code>/bible/passage</code> endpoint.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 font-semibold">
                      <Hash className="h-4 w-4 text-youversion-600" /> USFM Reference Format
                    </span>
                    <p className="mt-2">The passage endpoint supports multiple reference formats:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><code>jhn.3.16</code> - Book, chapter, verse</li>
                      <li><code>jhn.3.16-18</code> - Verse range</li>
                      <li><code>jhn.3</code> - Entire chapter</li>
                      <li><code>1jn.4.8</code> - Books with numbers</li>
                    </ul>
                    <br/>
                    <div className="text-xs text-muted-foreground mt-2">
                      For a full list of valid book identifiers, see
                      <a
                        href="/docs/usfm-reference"
                        className="underline ml-1"
                      >
                        USFM Book Identifiers
                      </a>.
                    </div>
                    <br/>
                  </div>
                  <CodeBlock language="bash">
{`curl -H "X-App-ID: YOUR_APP_ID" 'https://api-dev.youversion.com/bible/passage?version=206&usfm=JHN.4.34'`}
                  </CodeBlock>
                    <div>
                    <div className="text-xs text-muted-foreground mb-1">Response:</div>
                    <CodeBlock language="text">
          {`Jesus said to them, “My food is to do the will of him who sent me and to accomplish his work."`}
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

export default Verses;
