import { NextResponse } from 'next/server'

interface BibleVersion {
  bible_version_id: number
  language_tag: string
  language_name: string
}

const API_URL = 'https://bible-versions-gateway-cb3tumxd.uc.gateway.dev/'
const API_KEY = 'AIzaSyC_jKFla1HcrtEkkJwi7rk-XGV5Qx6HE8Y'

async function getBibleVersions(): Promise<BibleVersion[]> {
  const response = await fetch(`${API_URL}?include_descriptions=true`, {
    headers: {
      'x-api-key': API_KEY
    },
    next: {
      revalidate: 43200 // Cache for 12 hours
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch Bible versions')
  }

  return response.json()
}

interface Language {
  tag: string
  name: string
}

export async function GET() {
  try {
    const versions = await getBibleVersions()
    
    // Extract unique languages
    const languages: Language[] = [...new Set(versions.map(v => v.language_tag))]
      .map(tag => ({
        tag,
        name: versions.find(v => v.language_tag === tag)?.language_name || tag
      }))
      .sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json(languages)
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message)
    } else {
      console.error('API Error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 