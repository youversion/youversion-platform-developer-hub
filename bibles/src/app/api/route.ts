import { NextResponse } from 'next/server'

const API_URL = 'https://bible-versions-gateway-cb3tumxd.uc.gateway.dev/'
const API_KEY = 'AIzaSyC_jKFla1HcrtEkkJwi7rk-XGV5Qx6HE8Y'

export async function GET() {
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
      throw new Error(`Failed to fetch Bible versions: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Bible versions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Bible versions' },
      { status: 500 }
    )
  }
} 