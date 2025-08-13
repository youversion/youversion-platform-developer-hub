import './globals.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { BibleVersionsProvider } from '@/contexts/BibleVersionsContext'
import { BIBLE_VERSIONS_API_URL, BIBLE_VERSIONS_API_KEY } from '@/lib/serverConfig'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Navigation } from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bible Directory',
  description: 'Find and compare different Bible versions',
}

interface BibleVersionData {
  bible_version_id: number
  local_title: string
  title: string
  abbreviation: string
  translation_type: string
  reading_level: string
  release_year: string | null
  publisher_name: string
  language_name: string
  language_tag: string
  scope: string
  top_countries: string[]
  has_audio: boolean
  popularity?: number
  additional_resources: string[]
  license_type: string
  license_description: string
  popular_denominations: string[]
}

const API_URL = BIBLE_VERSIONS_API_URL
const API_KEY = BIBLE_VERSIONS_API_KEY

async function getBibleVersions(): Promise<BibleVersionData[]> {
  const response = await fetch(`${API_URL}?include_descriptions=true`, {
    headers: {
      'x-api-key': API_KEY
    },
    next: {
      revalidate: 300 // 5 minutes
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch Bible versions')
  }

  return response.json()
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bibleVersions = await getBibleVersions()
  const cookieStore = await cookies()
  const cookieTheme = cookieStore.get('ui-theme')?.value

  const transformedVersions = bibleVersions.map(version => ({
    id: version.bible_version_id.toString(),
    name: version.local_title,
    title: version.title,
    abbreviation: version.abbreviation,
    translationType: version.translation_type,
    readingLevel: version.reading_level,
    year: version.release_year ? parseInt(version.release_year.toString()) : null,
    description: `${version.publisher_name} - ${version.language_name}`,
    publisher: version.publisher_name,
    language: version.language_name,
    language_tag: version.language_tag,
    scope: version.scope,
    top_countries: version.top_countries || [],
    has_audio: version.has_audio || false,
    popularity: version.popularity,
    additional_resources: version.additional_resources || [],
    license_type: version.license_type,
    license_description: version.license_description,
    popular_denominations: version.popular_denominations || []
  }))

  // Resolve initial theme: cookie overrides, else fall back to system at runtime
  const initialClass = cookieTheme === 'dark' || cookieTheme === 'light' ? cookieTheme : undefined

  return (
    <html lang="en" suppressHydrationWarning className={initialClass}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function() {
            try {
              // Avoid transitions during initial theme application
              try { document.documentElement.classList.add('no-theme-transition'); } catch (e) {}
              var stored = localStorage.getItem('ui-theme');
              var cookieMatch = (document.cookie.match(/(?:^|; )ui-theme=([^;]+)/)||[])[1];
              if (cookieMatch) try { stored = decodeURIComponent(cookieMatch) } catch (e) {}
              var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var resolved = stored === 'dark' || (stored === 'system' && systemDark) || (!stored && systemDark) ? 'dark' : 'light';
              var root = document.documentElement;
              root.classList.remove('light','dark');
              root.classList.add(resolved);
              // Remove no-transition class on next frame
              try { requestAnimationFrame(function(){ root.classList.remove('no-theme-transition'); }); } catch (e) { root.classList.remove('no-theme-transition'); }
            } catch (e) {
              // no-op
            }
          })();
        `}</Script>
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider>
          <BibleVersionsProvider versions={transformedVersions}>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </BibleVersionsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
