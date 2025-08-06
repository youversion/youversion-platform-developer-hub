import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ versionId: string; reference: string }> }
) {
  try {
    const { versionId, reference } = await params
    
    // Validate parameters
    if (!versionId || !reference) {
      return NextResponse.json(
        { error: 'Missing versionId or reference' },
        { status: 400 }
      )
    }

    // YouVersion Audio API endpoint
    const yvApiUrl = `https://audio-bible.youversionapistaging.com/3.1/chapter.json?version_id=${versionId}&reference=${reference}`
    
    // Make the request to YouVersion API
    const response = await fetch(yvApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Bible-Directory-App/1.0'
      }
    })

    if (!response.ok) {
      console.error('YouVersion API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: `YouVersion API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Return the YouVersion API response
    return NextResponse.json(data)

  } catch (error) {
    console.error('Audio API proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audio from YouVersion API' },
      { status: 500 }
    )
  }
} 