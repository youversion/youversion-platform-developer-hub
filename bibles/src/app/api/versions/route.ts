import { NextResponse } from 'next/server'

interface BibleVersion {
  bible_version_id: number
  local_title: string
  title: string
  abbreviation: string
  translation_type: string
  reading_level: string
  release_year: string | null
  last_revision_year?: string | null
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
  source_manuscript?: string[]
  recommended_fonts?: string[]
  version_description?: string
}

const API_URL = 'https://bible-versions-gateway-cb3tumxd.uc.gateway.dev/'
const API_KEY = 'AIzaSyC_jKFla1HcrtEkkJwi7rk-XGV5Qx6HE8Y'

async function getBibleVersions(): Promise<BibleVersion[]> {
  try {
  
    const response = await fetch(`${API_URL}?include_descriptions=true`, {
      headers: {
        'x-api-key': API_KEY
      },
      next: {
        revalidate: 43200 // Cache for 12 hours
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('External API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`External API returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error in getBibleVersions:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const excludeId = searchParams.get('excludeId')
    const id = searchParams.get('id')
    
  
    
    const versions = await getBibleVersions()

    // If requesting a specific version
    if (id) {
      const parsedId = parseInt(id)
      if (isNaN(parsedId)) {
        console.error('Invalid ID format:', { id })
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
      }
      
      const filtered = versions.filter(v => v.bible_version_id === parsedId)
      if (filtered.length === 0) {
        console.error('Version not found:', { id: parsedId })
        return NextResponse.json({ error: 'Version not found' }, { status: 404 })
      }
      
      return NextResponse.json(filtered)
    }

    // If requesting versions for comparison (need full data for filtering)
    if (excludeId) {
      const parsedExcludeId = parseInt(excludeId)
      if (isNaN(parsedExcludeId)) {
        console.error('Invalid excludeId format:', { excludeId })
        return NextResponse.json({ error: 'Invalid excludeId format' }, { status: 400 })
      }
      
      const filtered = versions.filter(v => v.bible_version_id !== parsedExcludeId)

      return NextResponse.json(filtered)
    }

    // Return all versions with complete data
    return NextResponse.json(versions)
  } catch (error) {
    console.error('API route error:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      url: request.url
    })
    return NextResponse.json(
      { error: 'Failed to fetch Bible versions' },
      { status: 500 }
    )
  }
} 