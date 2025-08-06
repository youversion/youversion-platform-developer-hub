import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BibleVersionsProvider } from '@/contexts/BibleVersionsContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Navigation } from '@/components/Navigation'

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

const API_URL = 'https://bible-versions-gateway-cb3tumxd.uc.gateway.dev/'
const API_KEY = 'AIzaSyC_jKFla1HcrtEkkJwi7rk-XGV5Qx6HE8Y'

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

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider>
          <BibleVersionsProvider versions={transformedVersions}>
            <div className="flex flex-col h-screen">
              <Navigation />
              <div className="flex-1 overflow-hidden">
                {children}
              </div>
            </div>
          </BibleVersionsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
