import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bibleVersionId: string }> }
) {
  try {
    const { bibleVersionId } = await params
    
    // Validate parameter
    if (!bibleVersionId) {
      return NextResponse.json(
        { error: 'Missing bibleVersionId' },
        { status: 400 }
      )
    }

    // Return audio versions based on the Bible version ID
    // These are the actual YouVersion audio version IDs that work
    let audioVersions: Array<{
      id: number
      title: string
      narrator: string
      language: string
      quality: string
      duration: string
      default: boolean
    }> = []
    
    if (bibleVersionId === '1') { // KJV
      audioVersions = [
        {
          id: 1, // This is the actual YouVersion audio version ID for KJV
          title: "King James Version Audio",
          narrator: "Various Narrators",
          language: "English",
          quality: "32k",
          duration: "4:54", // Example duration for John 3
          default: true
        }
      ]
    } else if (bibleVersionId === '111') { // ESV
      audioVersions = [
        {
          id: 111, // ESV audio version ID
          title: "English Standard Version Audio",
          narrator: "Various Narrators",
          language: "English",
          quality: "32k",
          duration: "5:12",
          default: true
        }
      ]
    } else if (bibleVersionId === '59') { // NIV
      audioVersions = [
        {
          id: 59, // NIV audio version ID
          title: "New International Version Audio",
          narrator: "Various Narrators",
          language: "English",
          quality: "32k",
          duration: "4:48",
          default: true
        }
      ]
    } else {
      // For other versions, return empty array or a default
      audioVersions = []
    }

    return NextResponse.json({
      success: true,
      data: {
        bibleVersionId: parseInt(bibleVersionId),
        audioVersions,
        count: audioVersions.length
      }
    })

  } catch (error) {
    console.error('Audio versions API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audio versions' },
      { status: 500 }
    )
  }
} 