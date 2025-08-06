import { NextResponse } from 'next/server'

const API_URL = 'https://bible-versions-gateway-cb3tumxd.uc.gateway.dev/search'
const API_KEY = 'AIzaSyC_jKFla1HcrtEkkJwi7rk-XGV5Qx6HE8Y'

interface SearchRequest {
  query: string
  limit: number
}

export interface SearchResult {
  bible_version_id: number
  relevance_score: number
  match_explanation: string
  feature_matches: {
    audio_match: boolean
    language_match: boolean
    reading_level_match: boolean
    denomination_match: boolean
    version_abbreviation_match: boolean
  }
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}

export async function POST(request: Request) {
  const requestStartTime = Date.now()
  const requestId = Math.random().toString(36).substring(7)

  try {
    const body: SearchRequest = await request.json()

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        query: body.query,
        limit: 10
      })
    })

    if (!response.ok) {
      throw new Error(`Search API returned ${response.status}`)
    }

    const data = await response.json()
    
    // Filter out versions with low relevance scores
    const filteredData = data.filter((result: SearchResult) => result.relevance_score >= 55)

    return NextResponse.json(filteredData)
  } catch (error) {
    const errorTime = Date.now()
    if (error instanceof Error) {
      console.error(`[Search:${requestId}] Search API Error:`, {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        totalDuration: errorTime - requestStartTime
      })
    } else {
      console.error(`[Search:${requestId}] Search API Error:`, {
        error,
        timestamp: new Date().toISOString(),
        totalDuration: errorTime - requestStartTime
      })
    }
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    )
  }
} 